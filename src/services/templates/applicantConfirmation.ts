interface ApplicantConfirmationData {
  applicantName: string;
  jobPositionTitle: string;
}

export const applicantConfirmationTemplate = (data: ApplicantConfirmationData): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .container { padding: 30px; border: 1px solid #eaeaea; border-radius: 8px; background-color: #ffffff; }
          .logo { text-align: center; margin-bottom: 20px; }
          .content { margin-bottom: 20px; }
          .footer { margin-top: 30px; font-size: 14px; color: #555; border-top: 1px solid #eaeaea; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <p>Dear ${data.applicantName},</p>
            
            <p>Thank you for applying for the <strong>${data.jobPositionTitle}</strong> position at USDC.</p>
            
            <p>We have successfully received your application.</p>
            
            <p>Our HR department is currently reviewing your application and will get in touch with you soon if your qualifications match our requirements.</p>
            
            <p>We appreciate your interest in joining our team.</p>
          </div>
          
          <div class="footer">
            <p>Best Regards,</p>
            <p><strong>USDC HR Team</strong></p>
          </div>
        </div>
      </body>
    </html>
  `;
};
