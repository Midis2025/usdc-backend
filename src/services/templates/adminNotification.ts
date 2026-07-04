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
  const applicationStatus = 'Under Review';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Applying — USDC</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <style>
    body, table, td, a {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    table {
      border-collapse: collapse !important;
    }
    body {
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      background-color: #04070f;
    }
    body, table, td, p, a, span {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    .logo-font {
      font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
    a {
      color: #3daeff;
      text-decoration: none;
    }
    a:hover {
      color: #5ec5ff !important;
    }
    .social-icon-box:hover {
      border-color: rgba(255, 255, 255, 0.6) !important;
      background-color: rgba(255, 255, 255, 0.05) !important;
    }

    @media screen and (max-width: 768px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
    }
    @media screen and (max-width: 620px) {
      .outer-wrapper-td { padding: 20px 0 40px 0 !important; }
      .email-container { width: 100% !important; max-width: 100% !important; }
      .logo-td { padding-bottom: 20px !important; }
      .logo-img { width: 120px !important; }
      .hero-img { width: 100% !important; max-width: 100% !important; height: auto !important; }
      .content-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .content-padding p, .content-padding li { font-size: 14px !important; line-height: 22px !important; }
      .content-padding h2 { font-size: 18px !important; line-height: 26px !important; }
      .content-padding h3 { font-size: 15px !important; }
      .social-icons-table { width: 100% !important; max-width: 240px !important; }
      .footer-td { padding-left: 20px !important; padding-right: 20px !important; }
    }
    @media screen and (max-width: 380px) {
      .outer-wrapper-td { padding: 12px 0 30px 0 !important; }
      .content-padding { padding-left: 14px !important; padding-right: 14px !important; }
      .content-padding p, .content-padding li { font-size: 13px !important; line-height: 20px !important; }
      .footer-td { padding-left: 14px !important; padding-right: 14px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; width: 100%; background-color: #04070f;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #04070f; width: 100%;">
    <tr>
      <td align="center" valign="top" class="outer-wrapper-td" style="padding: 40px 0 60px 0;">
        <table border="0" cellpadding="0" cellspacing="0" class="email-container" width="600" style="width: 600px; max-width: 600px; margin: 0 auto; background-color: #04070f;">

          <!-- HEADER LOGO -->
          <tr>
            <td align="left" valign="top" class="logo-td content-padding" style="padding: 30px 40px 24px 40px;">
              <a href="https://usdc-live.vercel.app/" target="_blank" style="display: inline-block; outline: none; border: none; text-decoration: none;">
                <img src="https://res.cloudinary.com/dntahkr0a/image/upload/v1783161597/USDC_31_rwlyr3.webp" alt="USDC Logo" width="150" class="logo-img" style="display: block; width: 150px; height: auto; border: 0; outline: none;" />
              </a>
            </td>
          </tr>

          <!-- HERO IMAGE -->
          <tr>
            <td align="center" valign="top" style="padding-bottom: 0; font-size: 0; line-height: 0;">
              <img src="https://res.cloudinary.com/dntahkr0a/image/upload/v1783161958/Group_326_1_tamtbz.png" alt="Hero Image" width="600" class="hero-img" style="display: block; width: 100%; max-width: 600px; height: auto; border: 0; outline: none;" />
            </td>
          </tr>

          <!-- EMAIL BODY CONTENT -->
          <tr>
            <td align="left" valign="top" class="content-padding" style="padding: 30px 40px 10px 40px;">

              <!-- Admin Intro -->
              <p style="margin: 0 0 6px 0; font-size: 13px; line-height: 20px; color: rgba(255,255,255,0.45); font-weight: 400; text-transform: uppercase; letter-spacing: 1px;">New Application Received</p>
              <h2 class="logo-font" style="margin: 0 0 24px 0; font-size: 20px; line-height: 28px; color: #ffffff; font-weight: 700;">
                Job Application Submission
              </h2>
              <p style="margin: 0 0 28px 0; font-size: 14px; line-height: 22px; color: rgba(255, 255, 255, 0.55); font-weight: 400;">
                A new job application has been submitted. The details are listed below.
              </p>

              <!-- Application Details Card -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 24px 24px 8px 24px;">

                    <!-- Section: Position & Applicant -->
                    <p style="margin: 0 0 16px 0; font-size: 11px; line-height: 16px; color: #3daeff; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Position &amp; Applicant</p>

                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 14px;">
                      <tr>
                        <td valign="top" width="38%" style="font-size: 13px; line-height: 20px; color: rgba(255,255,255,0.5); font-weight: 500; padding-right: 12px; padding-bottom: 10px;">Job Position</td>
                        <td valign="top" style="font-size: 13px; line-height: 20px; color: #ffffff; font-weight: 600; padding-bottom: 10px;">${data.jobPositionTitle}</td>
                      </tr>
                      <tr>
                        <td valign="top" width="38%" style="font-size: 13px; line-height: 20px; color: rgba(255,255,255,0.5); font-weight: 500; padding-right: 12px; padding-bottom: 10px; border-top: 1px solid rgba(255,255,255,0.06);">Full Name</td>
                        <td valign="top" style="font-size: 13px; line-height: 20px; color: #ffffff; font-weight: 600; padding-bottom: 10px; border-top: 1px solid rgba(255,255,255,0.06);">${data.applicantName}</td>
                      </tr>
                    </table>

                    <!-- Section: Contact Details -->
                    <p style="margin: 16px 0 16px 0; font-size: 11px; line-height: 16px; color: #3daeff; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Contact Details</p>

                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 14px;">
                      <tr>
                        <td valign="top" width="38%" style="font-size: 13px; line-height: 20px; color: rgba(255,255,255,0.5); font-weight: 500; padding-right: 12px; padding-bottom: 10px;">Email</td>
                        <td valign="top" style="font-size: 13px; line-height: 20px; font-weight: 500; padding-bottom: 10px;">
                          <a href="mailto:${data.email}" style="color: #3daeff; text-decoration: none;">${data.email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td valign="top" width="38%" style="font-size: 13px; line-height: 20px; color: rgba(255,255,255,0.5); font-weight: 500; padding-right: 12px; padding-bottom: 10px; border-top: 1px solid rgba(255,255,255,0.06);">Phone Number</td>
                        <td valign="top" style="font-size: 13px; line-height: 20px; color: #ffffff; font-weight: 500; padding-bottom: 10px; border-top: 1px solid rgba(255,255,255,0.06);">${data.phone || 'N/A'}</td>
                      </tr>
                    </table>

                    <!-- Section: Links -->
                    <p style="margin: 16px 0 16px 0; font-size: 11px; line-height: 16px; color: #3daeff; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Links</p>

                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 14px;">
                      <tr>
                        <td valign="top" width="38%" style="font-size: 13px; line-height: 20px; color: rgba(255,255,255,0.5); font-weight: 500; padding-right: 12px; padding-bottom: 10px;">LinkedIn URL</td>
                        <td valign="top" style="font-size: 13px; line-height: 20px; font-weight: 500; padding-bottom: 10px; word-break: break-all;">
                          ${data.linkedInUrl
                            ? `<a href="${data.linkedInUrl}" target="_blank" style="color: #3daeff; text-decoration: none;">${data.linkedInUrl}</a>`
                            : `<span style="color: rgba(255,255,255,0.4);">Not provided</span>`}
                        </td>
                      </tr>
                      <tr>
                        <td valign="top" width="38%" style="font-size: 13px; line-height: 20px; color: rgba(255,255,255,0.5); font-weight: 500; padding-right: 12px; padding-bottom: 10px; border-top: 1px solid rgba(255,255,255,0.06);">Portfolio URL</td>
                        <td valign="top" style="font-size: 13px; line-height: 20px; font-weight: 500; padding-bottom: 10px; border-top: 1px solid rgba(255,255,255,0.06); word-break: break-all;">
                          ${data.portfolioUrl
                            ? `<a href="${data.portfolioUrl}" target="_blank" style="color: #3daeff; text-decoration: none;">${data.portfolioUrl}</a>`
                            : `<span style="color: rgba(255,255,255,0.4);">Not provided</span>`}
                        </td>
                      </tr>
                      <tr>
                        <td valign="top" width="38%" style="font-size: 13px; line-height: 20px; color: rgba(255,255,255,0.5); font-weight: 500; padding-right: 12px; padding-bottom: 10px; border-top: 1px solid rgba(255,255,255,0.06);">Resume</td>
                        <td valign="top" style="font-size: 13px; line-height: 20px; font-weight: 500; padding-bottom: 10px; border-top: 1px solid rgba(255,255,255,0.06); word-break: break-all;">
                          ${data.resumeDownloadUrl
                            ? `<a href="${data.resumeDownloadUrl}" target="_blank" style="color: #3daeff; text-decoration: none;">View / Download Resume &rarr;</a>`
                            : `<span style="color: rgba(255,255,255,0.4);">Not provided</span>`}
                        </td>
                      </tr>
                    </table>

                    <!-- Section: Cover Letter -->
                    <p style="margin: 16px 0 12px 0; font-size: 11px; line-height: 16px; color: #3daeff; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Cover Letter</p>
                    <p style="margin: 0 0 20px 0; font-size: 13px; line-height: 21px; color: rgba(255,255,255,0.65); font-weight: 400; font-style: italic; border-left: 3px solid rgba(61,174,255,0.4); padding-left: 12px;">
                      ${data.coverLetter || '<span style="color: rgba(255,255,255,0.3); font-style: normal;">No cover letter provided.</span>'}
                    </p>

                    <!-- Section: Application Status -->
                    <p style="margin: 16px 0 12px 0; font-size: 11px; line-height: 16px; color: #3daeff; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Application Status</p>
                    <p style="margin: 0 0 16px 0;">
                      <span style="display: inline-block; background-color: rgba(61,174,255,0.12); border: 1px solid rgba(61,174,255,0.35); border-radius: 20px; padding: 4px 14px; font-size: 12px; font-weight: 600; color: #3daeff; letter-spacing: 0.5px;">${applicationStatus}</span>
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Sign-off -->
              <p style="margin: 0; font-size: 13px; line-height: 20px; color: rgba(255, 255, 255, 0.4); font-weight: 400;">
                This is an automated notification from the USDC Careers system. Please do not reply to this email.
              </p>

            </td>
          </tr>

          <!-- DIVIDER LINE -->
          <tr>
            <td align="center" valign="top" class="content-padding" style="padding: 0 40px 30px 40px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="border-top: 1px solid rgba(255, 255, 255, 0.08); line-height: 1px; font-size: 1px;">&nbsp;</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SOCIAL MEDIA ICONS -->
          <tr>
            <td align="left" valign="top" class="content-padding" style="padding: 0 40px 35px 40px;">
              <table border="0" cellpadding="0" cellspacing="0" class="social-icons-table" width="220" style="width: 220px;">
                <tr>
                  <!-- LinkedIn -->
                  <td align="left" valign="middle" style="padding-right: 12px;">
                    <a href="https://www.linkedin.com/company/us-data-centers-inc/" target="_blank" style="display: block; outline: none; border: none; text-decoration: none;">
                      <table border="0" cellpadding="0" cellspacing="0" class="social-icon-box" style="border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 6px; width: 36px; height: 36px;">
                        <tr>
                          <td align="center" valign="middle" style="width: 34px; height: 34px; padding: 0;">
                            <img src="https://img.icons8.com/ios-glyphs/20/ffffff/linkedin.png" alt="LinkedIn" width="20" height="20" style="display: block; width: 20px; height: 20px; border: 0; outline: none;" />
                          </td>
                        </tr>
                      </table>
                    </a>
                  </td>
                  <!-- Twitter/X -->
                  <td align="left" valign="middle" style="padding-right: 12px;">
                    <a href="https://x.com/" target="_blank" style="display: block; outline: none; border: none; text-decoration: none;">
                      <table border="0" cellpadding="0" cellspacing="0" class="social-icon-box" style="border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 6px; width: 36px; height: 36px;">
                        <tr>
                          <td align="center" valign="middle" style="width: 34px; height: 34px; padding: 0;">
                            <img src="https://img.icons8.com/ios-glyphs/20/ffffff/x.png" alt="Twitter / X" width="20" height="20" style="display: block; width: 20px; height: 20px; border: 0; outline: none;" />
                          </td>
                        </tr>
                      </table>
                    </a>
                  </td>
                  <!-- Facebook -->
                  <td align="left" valign="middle" style="padding-right: 12px;">
                    <a href="https://www.facebook.com/" target="_blank" style="display: block; outline: none; border: none; text-decoration: none;">
                      <table border="0" cellpadding="0" cellspacing="0" class="social-icon-box" style="border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 6px; width: 36px; height: 36px;">
                        <tr>
                          <td align="center" valign="middle" style="width: 34px; height: 34px; padding: 0;">
                            <img src="https://img.icons8.com/ios-glyphs/20/ffffff/facebook-new.png" alt="Facebook" width="20" height="20" style="display: block; width: 20px; height: 20px; border: 0; outline: none;" />
                          </td>
                        </tr>
                      </table>
                    </a>
                  </td>
                  <!-- Instagram -->
                  <td align="left" valign="middle">
                    <a href="https://www.instagram.com/" target="_blank" style="display: block; outline: none; border: none; text-decoration: none;">
                      <table border="0" cellpadding="0" cellspacing="0" class="social-icon-box" style="border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 6px; width: 36px; height: 36px;">
                        <tr>
                          <td align="center" valign="middle" style="width: 34px; height: 34px; padding: 0;">
                            <img src="https://img.icons8.com/ios-glyphs/20/ffffff/instagram-new.png" alt="Instagram" width="20" height="20" style="display: block; width: 20px; height: 20px; border: 0; outline: none;" />
                          </td>
                        </tr>
                      </table>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CONTACT INFORMATION -->
          <tr>
            <td align="left" valign="top" class="content-padding" style="padding: 0 40px 45px 40px;">
              <h4 class="logo-font" style="margin: 0 0 16px 0; font-size: 15px; line-height: 20px; color: #3daeff; font-weight: 700; letter-spacing: 0.5px;">
                Contact Information
              </h4>
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="left" valign="top" style="padding-bottom: 8px; font-size: 14px; line-height: 20px; color: rgba(255, 255, 255, 0.7);">
                    <strong style="color: #ffffff; font-weight: 600;">Email:</strong>&nbsp;&nbsp;<a href="mailto:hello@usdc.com" style="color: rgba(255, 255, 255, 0.7); text-decoration: none;">hello@usdc.com</a>
                  </td>
                </tr>
                <tr>
                  <td align="left" valign="top" style="padding-bottom: 8px; font-size: 14px; line-height: 20px; color: rgba(255, 255, 255, 0.7);">
                    <strong style="color: #ffffff; font-weight: 600;">Phone:</strong>&nbsp;&nbsp;(555) 123-4567
                  </td>
                </tr>
                <tr>
                  <td align="left" valign="top" style="font-size: 14px; line-height: 20px; color: rgba(255, 255, 255, 0.7);">
                    <strong style="color: #ffffff; font-weight: 600;">Address:</strong>&nbsp;&nbsp;218 NW 24th St 2nd FL, Miami, FL 33127
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center" valign="top" class="footer-td" style="padding: 30px 40px 30px 40px; border-top: 1px solid rgba(255, 255, 255, 0.05);">
              <p style="margin: 0 0 12px 0; font-size: 11px; line-height: 16px; color: rgba(255, 255, 255, 0.35); font-weight: 400; text-align: center;">
                &copy; 2026 USDC. All rights reserved.
              </p>
              <p style="margin: 0; font-size: 11px; line-height: 18px; color: rgba(255, 255, 255, 0.35); font-weight: 400; text-align: center; max-width: 100%;">
                Powering the future of data with state-of-the-art infrastructure and solutions designed for the demands of the digital economy.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
