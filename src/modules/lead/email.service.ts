import nodemailer from "nodemailer";

interface LeadEmailData {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget?: string;
  details?: string;
}

class EmailService {
  private transporter: ReturnType<typeof nodemailer.createTransport>;

  constructor() {
    this.transporter = nodemailer.createTransport({ 
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

 
  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    await this.transporter.sendMail({
      from:
        process.env.SMTP_FROM ||
        `"Twipra Technologies" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      replyTo: to,
    });
  }
  async sendLeadNotification(data: LeadEmailData): Promise<void> {
    const adminEmail =
      process.env.ADMIN_EMAIL || "twipratechnologies@gmail.com";
    const subject = `🔔 New Lead: ${data.service} - ${data.fullName}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background: #f6f9fc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
        
        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f6f9fc; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background: #ffffff; border-radius: 24px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 20px rgba(0, 0, 0, 0.06); overflow: hidden;">
                
                <!-- Header with Gradient -->
                <tr>
                  <td style="padding: 40px 40px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center">
                          <img src="https://res.cloudinary.com/qlqp0o85/image/upload/v1785420517/new-logo_tuwze1.png" alt="Twipra Technologies" style="max-width: 140px; height: auto; display: block; margin: 0 auto 16px;" />
                          <div style="width: 60px; height: 3px; background: rgba(255, 255, 255, 0.4); margin: 12px auto 0; border-radius: 4px;"></div>
                          <p style="color: rgba(255, 255, 255, 0.9); font-size: 15px; font-weight: 400; margin: 16px 0 0; letter-spacing: 0.3px;">NEW LEAD NOTIFICATION</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 40px 30px;">
                    <!-- Greeting -->
                    <h2 style="color: #1a202c; font-size: 22px; font-weight: 600; margin: 0 0 8px; letter-spacing: -0.3px;">New Inquiry Received</h2>
                    <p style="color: #718096; font-size: 15px; line-height: 1.6; margin: 0 0 28px;">A potential client has submitted their details and is interested in your services.</p>

                    <!-- Lead Details Card -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f7fafc; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden;">
                      <tr>
                        <td style="padding: 24px 24px 20px;">
                          <!-- Name -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
                            <tr>
                              <td style="width: 30px; vertical-align: middle; padding-right: 12px;">
                                <span style="font-size: 18px;">👤</span>
                              </td>
                              <td>
                                <p style="color: #4a5568; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 2px;">Full Name</p>
                                <p style="color: #2d3748; font-size: 17px; font-weight: 500; margin: 0;">${data.fullName}</p>
                              </td>
                            </tr>
                          </table>

                          <!-- Email -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
                            <tr>
                              <td style="width: 30px; vertical-align: middle; padding-right: 12px;">
                                <span style="font-size: 18px;">📧</span>
                              </td>
                              <td>
                                <p style="color: #4a5568; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 2px;">Email Address</p>
                                <a href="mailto:${data.email}" style="color: #667eea; font-size: 16px; font-weight: 500; text-decoration: none; border-bottom: 1px solid #e2e8f0;">${data.email}</a>
                              </td>
                            </tr>
                          </table>

                          ${
                            data.phone
                              ? `
                          <!-- Phone -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
                            <tr>
                              <td style="width: 30px; vertical-align: middle; padding-right: 12px;">
                                <span style="font-size: 18px;">📱</span>
                              </td>
                              <td>
                                <p style="color: #4a5568; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 2px;">Phone Number</p>
                                <p style="color: #2d3748; font-size: 16px; font-weight: 500; margin: 0;">${data.phone}</p>
                              </td>
                            </tr>
                          </table>
                          `
                              : ""
                          }

                          ${
                            data.company
                              ? `
                          <!-- Company -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
                            <tr>
                              <td style="width: 30px; vertical-align: middle; padding-right: 12px;">
                                <span style="font-size: 18px;">🏢</span>
                              </td>
                              <td>
                                <p style="color: #4a5568; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 2px;">Company</p>
                                <p style="color: #2d3748; font-size: 16px; font-weight: 500; margin: 0;">${data.company}</p>
                              </td>
                            </tr>
                          </table>
                          `
                              : ""
                          }

                          <!-- Service -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
                            <tr>
                              <td style="width: 30px; vertical-align: middle; padding-right: 12px;">
                                <span style="font-size: 18px;">💼</span>
                              </td>
                              <td>
                                <p style="color: #4a5568; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 2px;">Service Interested</p>
                                <p style="color: #2d3748; font-size: 16px; font-weight: 500; margin: 0;">${data.service}</p>
                              </td>
                            </tr>
                          </table>

                          ${
                            data.budget
                              ? `
                          <!-- Budget -->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
                            <tr>
                              <td style="width: 30px; vertical-align: middle; padding-right: 12px;">
                                <span style="font-size: 18px;">💰</span>
                              </td>
                              <td>
                                <p style="color: #4a5568; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 2px;">Budget Range</p>
                                <p style="color: #2d3748; font-size: 16px; font-weight: 500; margin: 0;">${data.budget}</p>
                              </td>
                            </tr>
                          </table>
                          `
                              : ""
                          }
                        </td>
                      </tr>
                    </table>

                    ${
                      data.details
                        ? `
                    <!-- Additional Details -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 20px; background: #f7fafc; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden;">
                      <tr>
                        <td style="padding: 20px 24px;">
                          <p style="color: #4a5568; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px;">Additional Details</p>
                          <p style="color: #2d3748; font-size: 15px; line-height: 1.7; margin: 0;">${data.details}</p>
                        </td>
                      </tr>
                    </table>
                    `
                        : ""
                    }

                    <!-- Action Buttons -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 28px;">
                      <tr>
                        <td align="center">
                          <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; padding: 14px 40px; border-radius: 50px; box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">Reply to Lead</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 24px 40px; background: #f7fafc; border-top: 1px solid #e2e8f0;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center">
                          <p style="color: #4a5568; font-size: 13px; font-weight: 500; margin: 0 0 4px;">Twipra Technologies</p>
                          <p style="color: #718096; font-size: 13px; margin: 0 0 8px;">
                            📧 <a href="mailto:twipratechnologies@gmail.com" style="color: #667eea; text-decoration: none;">twipratechnologies@gmail.com</a> 
                            &nbsp;|&nbsp; 📱 +880 1851072019
                          </p>
                          <p style="color: #718096; font-size: 13px; margin: 0;">
                            🌐 <a href="http://twipratech.com" style="color: #667eea; text-decoration: none;">twipratech.com</a>
                          </p>
                          <div style="width: 40px; height: 2px; background: #e2e8f0; margin: 16px auto 0; border-radius: 2px;"></div>
                          <p style="color: #a0aec0; font-size: 11px; margin: 12px 0 0;">© ${new Date().getFullYear()} Twipra Technologies. All rights reserved.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>

      </body>
      </html>
    `;

    await this.sendEmail(adminEmail, subject, html);
  }

  async sendAutoReply(email: string, name: string): Promise<void> {
    const subject = "✨ Thank you for contacting Twipra Technologies!";

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background: #f6f9fc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
        
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f6f9fc; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background: #ffffff; border-radius: 24px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 20px rgba(0, 0, 0, 0.06); overflow: hidden;">
                
                <!-- Header -->
                <tr>
                  <td style="padding: 50px 40px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center">
                          <img src="https://res.cloudinary.com/qlqp0o85/image/upload/v1785420517/new-logo_tuwze1.png" alt="Twipra Technologies" style="max-width: 140px; height: auto; display: block; margin: 0 auto 16px;" />
                          <div style="width: 80px; height: 3px; background: rgba(255, 255, 255, 0.4); margin: 0 auto 20px; border-radius: 4px;"></div>
                          <h2 style="color: #ffffff; font-size: 26px; font-weight: 600; margin: 0; letter-spacing: -0.5px;">Thank You, ${name}! 🎉</h2>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 40px 30px;">
                    <!-- Confirmation Message -->
                    <div style="background: #f7fafc; border-radius: 16px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 28px;">
                      <p style="color: #2d3748; font-size: 16px; line-height: 1.7; margin: 0;">
                        We've received your inquiry and our team is excited to review your project requirements. 
                        We'll get back to you within <strong style="color: #667eea;">24 hours</strong> with a personalized response.
                      </p>
                    </div>

                    <!-- What Happens Next -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-bottom: 20px;">
                          <h3 style="color: #1a202c; font-size: 18px; font-weight: 600; margin: 0 0 16px; letter-spacing: -0.3px;">What Happens Next?</h3>
                          
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
                            <tr>
                              <td style="width: 32px; vertical-align: middle; padding-right: 12px;">
                                <span style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; width: 28px; height: 28px; text-align: center; line-height: 28px; border-radius: 50%; font-size: 14px; font-weight: 700;">1</span>
                              </td>
                              <td style="color: #4a5568; font-size: 15px;">We'll review your inquiry details</td>
                            </tr>
                          </table>
                          
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
                            <tr>
                              <td style="width: 32px; vertical-align: middle; padding-right: 12px;">
                                <span style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; width: 28px; height: 28px; text-align: center; line-height: 28px; border-radius: 50%; font-size: 14px; font-weight: 700;">2</span>
                              </td>
                              <td style="color: #4a5568; font-size: 15px;">Our team will reach out to discuss your needs</td>
                            </tr>
                          </table>
                          
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="width: 32px; vertical-align: middle; padding-right: 12px;">
                                <span style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; width: 28px; height: 28px; text-align: center; line-height: 28px; border-radius: 50%; font-size: 14px; font-weight: 700;">3</span>
                              </td>
                              <td style="color: #4a5568; font-size: 15px;">We'll provide a tailored solution for you</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Contact Information -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f7fafc; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden;">
                      <tr>
                        <td style="padding: 20px 24px;">
                          <p style="color: #4a5568; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px;">Need Immediate Assistance?</p>
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="padding-bottom: 8px;">
                                <span style="font-size: 15px;">📧</span>
                                <a href="mailto:twipratechnologies@gmail.com" style="color: #667eea; font-size: 15px; text-decoration: none; margin-left: 8px;">twipratechnologies@gmail.com</a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style="font-size: 15px;">📱</span>
                                <span style="color: #2d3748; font-size: 15px; margin-left: 8px;">+880 1851072019</span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 24px 40px; background: #f7fafc; border-top: 1px solid #e2e8f0;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center">
                          <p style="color: #4a5568; font-size: 14px; font-weight: 600; margin: 0 0 2px;">Twipra Technologies</p>
                          <p style="color: #718096; font-size: 13px; margin: 0 0 4px;">
                            <a href="http://twipratech.com" style="color: #667eea; text-decoration: none;">twipratech.com</a>
                          </p>
                          <div style="width: 40px; height: 2px; background: #e2e8f0; margin: 12px auto 0; border-radius: 2px;"></div>
                          <p style="color: #a0aec0; font-size: 11px; margin: 12px 0 0;">© ${new Date().getFullYear()} Twipra Technologies. All rights reserved.</p>
                          <p style="color: #a0aec0; font-size: 11px; margin: 4px 0 0;">This is an automated response. Please do not reply to this email.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>

      </body>
      </html>
    `;

    await this.sendEmail(email, subject, html);
  }
}

export default new EmailService();
