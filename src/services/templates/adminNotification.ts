interface AdminNotificationData {
  jobPositionTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  linkedInUrl?: string;
  portfolioUrl?: string;
  coverLetter?: string;
  applicationDate: string;
  resumeDownloadUrl?: string;
}

export const adminNotificationTemplate = (data: AdminNotificationData): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .container { padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
          .header { background-color: #f4f4f4; padding: 10px 20px; border-bottom: 2px solid #0056b3; margin-bottom: 20px; }
          .header h2 { margin: 0; color: #0056b3; }
          .content-block { margin-bottom: 15px; }
          .label { font-weight: bold; }
          .footer { margin-top: 30px; font-size: 12px; color: #777; text-align: center; }
          a { color: #0056b3; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .cover-letter { background-color: #f9f9f9; padding: 10px; border-left: 3px solid #0056b3; margin-top: 5px; white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Job Application Received</h2>
          </div>
          
          <div class="content-block">
            <span class="label">Position Applied For:</span> ${data.jobPositionTitle}
          </div>
          
          <div class="content-block">
            <span class="label">Applicant Name:</span> ${data.applicantName}
          </div>
          
          <div class="content-block">
            <span class="label">Email:</span> <a href="mailto:${data.email}">${data.email}</a>
          </div>
          
          <div class="content-block">
            <span class="label">Phone:</span> ${data.phone || 'N/A'}
          </div>
          
          <div class="content-block">
            <span class="label">LinkedIn URL:</span> 
            ${data.linkedInUrl ? `<a href="${data.linkedInUrl}" target="_blank">${data.linkedInUrl}</a>` : 'N/A'}
          </div>
          
          <div class="content-block">
            <span class="label">Portfolio URL:</span> 
            ${data.portfolioUrl ? `<a href="${data.portfolioUrl}" target="_blank">${data.portfolioUrl}</a>` : 'N/A'}
          </div>
          
          <div class="content-block">
            <span class="label">Application Date:</span> ${data.applicationDate}
          </div>

          ${data.resumeDownloadUrl ? `
          <div class="content-block">
            <span class="label">Resume:</span> <a href="${data.resumeDownloadUrl}" target="_blank">Download / View Resume</a>
          </div>
          ` : `
          <div class="content-block">
            <span class="label">Resume:</span> Not provided or attached to email.
          </div>
          `}
          
          ${data.coverLetter ? `
          <div class="content-block">
            <span class="label">Cover Letter:</span>
            <div class="cover-letter">${data.coverLetter}</div>
          </div>
          ` : ''}
          
          <div class="footer">
            <p>This is an automated notification from the USDC Career Portal.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
