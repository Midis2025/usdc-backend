import { sendJobApplicationEmails } from './services/jobApplicationEmail';
import { syncSubscriberToMailchimp } from './services/mailchimp';
import type { Core } from '@strapi/strapi';


export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * Registers a database-level lifecycle hook for job applications
   * to trigger email notifications on creation.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ['api::job-application.job-application'],

      async afterCreate(event) {
        const { result } = event;
        const documentId = result?.documentId;

        if (!documentId) {
          return;
        }

        try {
          const fullEntity = await strapi.documents('api::job-application.job-application').findOne({
            documentId,
            populate: ['Resume'],
          });

          if (fullEntity) {
            // Fire-and-forget: don't block the DB transaction
            sendJobApplicationEmails(fullEntity as any, strapi).catch((err) => {
              strapi.log.error('[Lifecycle] Email dispatch failed:', err);
            });
          }
        } catch (err) {
          strapi.log.error('[Lifecycle] Error fetching application for email:', err);
        }
      },
    });

    // ── Newsletter Subscriber → Mailchimp Sync ──────────────────────────────
    // Completely separate from the job-application lifecycle above.
    // Existing Resend code is NOT involved here in any way.
    //
    // Trigger: a new subscriber record is created in Strapi (afterCreate).
    // Action:  sync the subscriber's email to the configured Mailchimp Audience.
    //          Mailchimp then fires its Welcome Journey automatically.
    //
    // Error policy: Mailchimp failures are logged but never surface to the
    // frontend — the subscriber is already saved in Strapi, which is the
    // primary success condition.
    strapi.db.lifecycles.subscribe({
      models: ['api::subcriber.subcriber'],

      async afterCreate(event) {
        const { result } = event;
        const email: string | undefined = result?.email;
        const fullName: string | undefined = result?.fullName;

        if (!email) {
          strapi.log.warn('[Mailchimp Lifecycle] afterCreate fired but no email found on subscriber record. Skipping Mailchimp sync.');
          return;
        }

        // Fire-and-forget: sync to Mailchimp without blocking the HTTP response.
        // The subscriber is already saved in Strapi — Mailchimp is best-effort.
        syncSubscriberToMailchimp(email, fullName).then((res) => {
          if (res.success) {
            strapi.log.info(`[Mailchimp Lifecycle] Subscriber synced successfully: ${email}`);
          } else {
            strapi.log.warn(`[Mailchimp Lifecycle] Sync failed for ${email}: ${res.message}`);
          }
        }).catch((err) => {
          strapi.log.error('[Mailchimp Lifecycle] Unexpected error during Mailchimp sync:', err);
        });
      },
    });
  },
};

