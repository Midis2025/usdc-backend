import { sendJobApplicationEmails } from './services/jobApplicationEmail';
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
  },
};
