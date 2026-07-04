import { resend, defaultFromEmail, adminEmail } from './resend';
import { adminNotificationTemplate } from './templates/adminNotification';
import { applicantConfirmationTemplate } from './templates/applicantConfirmation';

/**
 * Interface for a populated job application entity from Strapi.
 */
interface JobApplicationEntity {
  id: number;
  documentId: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  linkedInURL?: string;
  portfolioURL?: string;
  coverLetter?: string;
  createdAt: string;
  job_position?: string;
  Resume?: {
    url: string;
  };
}

/**
 * In-memory Set to track documentIds that have already been processed.
 * Prevents duplicate emails when Strapi fires afterCreate multiple times
 * (e.g., draft creation + publish in draftAndPublish mode).
 */
const processedApplications = new Set<string>();

/**
 * Sends the admin notification and applicant confirmation emails
 * for a new job application. Includes deduplication to ensure
 * emails are only sent once per application.
 *
 * @param application - The fully populated job application entity.
 * @param strapi - The Strapi instance (used for config and logging).
 */
export const sendJobApplicationEmails = async (application: JobApplicationEntity, strapi: any) => {
  // ── Guard: Resend not configured ──
  if (!resend) {
    strapi.log.warn('[Email] Resend is not configured. Skipping emails.');
    return;
  }

  // ── Guard: Deduplication ──
  const dedupeKey = application.documentId;
  if (processedApplications.has(dedupeKey)) {
    strapi.log.info(`[Email] Emails already sent for application ${dedupeKey}. Skipping duplicate.`);
    return;
  }
  processedApplications.add(dedupeKey);

  // Clean up old entries after 5 minutes to prevent memory leaks
  setTimeout(() => {
    processedApplications.delete(dedupeKey);
  }, 5 * 60 * 1000);

  try {
    // ── Resolve job position title ──
    const jobPositionTitle = application.job_position || 'General Application';

    // ── Format date ──
    const applicationDate = new Date(application.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // ── Resolve resume URL ──
    let resumeDownloadUrl = '';
    if (application.Resume?.url) {
      resumeDownloadUrl = application.Resume.url.startsWith('http')
        ? application.Resume.url
        : `${strapi.config.get('server.url', '')}${application.Resume.url}`;
    }

    // ── Detect sandbox mode ──
    const isSandbox = defaultFromEmail === 'onboarding@resend.dev';

    // ── EMAIL 1: Admin Notification ──
    const adminHtml = adminNotificationTemplate({
      jobPositionTitle,
      applicantName: application.fullName,
      email: application.email,
      phone: application.phoneNumber || '',
      linkedInUrl: application.linkedInURL,
      portfolioUrl: application.portfolioURL,
      coverLetter: application.coverLetter,
      applicationDate,
      resumeDownloadUrl,
    });

    const adminResult = await resend.emails.send({
      from: defaultFromEmail,
      to: adminEmail,
      subject: `New Job Application - ${jobPositionTitle}`,
      html: adminHtml,
    });

    if (adminResult.error) {
      strapi.log.error(`[Email] Admin notification failed:`, adminResult.error);
    } else {
      strapi.log.info(`[Email] Admin notification sent successfully.`);
    }

    // ── EMAIL 2: Applicant Confirmation ──
    // In sandbox mode, redirect to admin email since Resend only allows
    // sending to the account owner's email without a verified domain.
    const applicantHtml = applicantConfirmationTemplate({
      applicantName: application.fullName,
      jobPositionTitle,
    });

    const applicantRecipient = isSandbox ? adminEmail : application.email;
    const applicantSubject = isSandbox
      ? `[TEST - Intended for: ${application.email}] Application Received – USDC Careers`
      : 'Application Received – USDC Careers';

    const applicantResult = await resend.emails.send({
      from: defaultFromEmail,
      to: applicantRecipient,
      subject: applicantSubject,
      html: applicantHtml,
    });

    if (applicantResult.error) {
      strapi.log.error(`[Email] Applicant confirmation failed:`, applicantResult.error);
    } else {
      strapi.log.info(`[Email] Applicant confirmation sent successfully.`);
    }
  } catch (error) {
    // Catch unexpected errors (network issues, SDK crashes, etc.)
    strapi.log.error('[Email] Unexpected error sending job application emails:', error);
  }
};
