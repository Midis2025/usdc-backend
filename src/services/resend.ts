import { Resend } from 'resend';

/**
 * Resend Email Service
 * 
 * Provides a reusable Resend SDK instance and configuration for sending
 * transactional emails. Reads configuration from environment variables.
 */

const resendApiKey = process.env.RESEND_API_KEY;

let resendInstance: Resend | null = null;

if (resendApiKey) {
  resendInstance = new Resend(resendApiKey);
} else {
  console.warn('[Resend] RESEND_API_KEY is not set. Email sending is disabled.');
}

/** Reusable Resend SDK instance. Null if API key is not configured. */
export const resend = resendInstance;

/**
 * The sender email address for outgoing emails.
 * 
 * Must be from a verified domain in Resend.
 * For testing without a verified domain, use 'onboarding@resend.dev'.
 */
export const defaultFromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

/**
 * Admin notification recipient email address.
 */
export const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'centerusdata@gmail.com';
