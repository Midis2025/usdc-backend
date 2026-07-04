/**
 * Mailchimp Marketing SDK Integration — src/services/mailchimp.ts
 *
 * Provides a single reusable function: syncSubscriberToMailchimp()
 *
 * Design principles:
 *  - Completely isolated from the existing Resend email service.
 *  - Never throws uncaught errors — all failures are logged and swallowed
 *    so the calling code (Strapi lifecycle hook) always continues safely.
 *  - Uses Mailchimp's "upsert" endpoint (setListMember) to avoid duplicates.
 *  - Status is set to 'subscribed', which triggers any configured Mailchimp
 *    Welcome Journey / Automation automatically.
 */

import mailchimp from '@mailchimp/mailchimp_marketing';
import crypto from 'crypto';

// ── Configuration ──────────────────────────────────────────────────────────────
// All values are read from environment variables. The service will warn and
// no-op gracefully if any required variable is missing.
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

// ── SDK Initialisation ─────────────────────────────────────────────────────────
// Initialise once at module load time. If env vars are missing, the function
// will detect this at call time and return early with a warning.
if (MAILCHIMP_API_KEY && MAILCHIMP_SERVER_PREFIX) {
  mailchimp.setConfig({
    apiKey: MAILCHIMP_API_KEY,
    server: MAILCHIMP_SERVER_PREFIX,
  });
}

// ── Helper: MD5 hash of lowercase email ───────────────────────────────────────
// Mailchimp identifies list members by the MD5 hash of their lowercase email.
// This is required for the upsert (setListMember) endpoint.
const emailToMd5 = (email: string): string =>
  crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex');

// ── Exported Result Type ───────────────────────────────────────────────────────
export interface MailchimpSyncResult {
  success: boolean;
  message: string;
}

/**
 * Syncs a single subscriber to the configured Mailchimp Audience.
 *
 * Behaviour:
 *  - Creates the contact if they do not yet exist in the Audience.
 *  - Updates the contact (merge fields) if they already exist — no duplicates.
 *  - Sets status to 'subscribed', which triggers Mailchimp Welcome Journeys.
 *  - Logs all outcomes using console so they appear in Strapi server logs.
 *  - Never throws — returns a typed result object instead.
 *
 * @param email    The subscriber's email address (required).
 * @param fullName Optional full name, split into FNAME / LNAME merge fields.
 * @returns        MailchimpSyncResult with success flag and human-readable message.
 */
export const syncSubscriberToMailchimp = async (
  email: string,
  fullName?: string
): Promise<MailchimpSyncResult> => {
  // ── Guard: configuration check ─────────────────────────────────────────────
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_SERVER_PREFIX || !MAILCHIMP_AUDIENCE_ID) {
    const missing = [
      !MAILCHIMP_API_KEY && 'MAILCHIMP_API_KEY',
      !MAILCHIMP_SERVER_PREFIX && 'MAILCHIMP_SERVER_PREFIX',
      !MAILCHIMP_AUDIENCE_ID && 'MAILCHIMP_AUDIENCE_ID',
    ]
      .filter(Boolean)
      .join(', ');

    console.warn(
      `[Mailchimp] Skipping sync — missing environment variable(s): ${missing}`
    );
    return { success: false, message: `Missing config: ${missing}` };
  }

  // ── Guard: basic email validation ──────────────────────────────────────────
  if (!email || !email.includes('@')) {
    console.warn('[Mailchimp] Skipping sync — invalid email address provided.');
    return { success: false, message: 'Invalid email address.' };
  }

  // ── Build merge fields from optional fullName ──────────────────────────────
  // Mailchimp expects first name (FNAME) and last name (LNAME) separately.
  const mergeFields: Record<string, string> = {};
  if (fullName) {
    const parts = fullName.trim().split(/\s+/);
    mergeFields['FNAME'] = parts[0] || '';
    mergeFields['LNAME'] = parts.slice(1).join(' ') || '';
  }

  // ── Upsert via setListMember ───────────────────────────────────────────────
  // setListMember performs a PUT request using the MD5-hashed email as the
  // member identifier. This creates OR updates the contact without duplicates.
  try {
    const subscriberHash = emailToMd5(email);

    await mailchimp.lists.setListMember(MAILCHIMP_AUDIENCE_ID, subscriberHash, {
      email_address: email,
      status_if_new: 'subscribed', // Status for brand-new subscribers
      status: 'subscribed',        // Ensures re-subscribing reactivates them
      merge_fields: mergeFields,
    });

    console.log(`[Mailchimp] Successfully synced subscriber: ${email}`);
    return { success: true, message: `Subscriber synced: ${email}` };

  } catch (error: any) {
    // ── Error handling ─────────────────────────────────────────────────────
    // Parse Mailchimp API error responses for meaningful log messages.
    // The SDK wraps HTTP errors as objects with a .response property.
    let errorDetail = 'Unknown error';

    if (error?.response?.text) {
      try {
        const parsed = JSON.parse(error.response.text);
        errorDetail = parsed?.detail || parsed?.title || error.response.text;
      } catch {
        errorDetail = error.response.text;
      }
    } else if (error?.message) {
      errorDetail = error.message;
    }

    console.error(
      `[Mailchimp] Failed to sync subscriber (${email}): ${errorDetail}`
    );

    // Return failure — do NOT rethrow. The caller will handle gracefully.
    return { success: false, message: errorDetail };
  }
};
