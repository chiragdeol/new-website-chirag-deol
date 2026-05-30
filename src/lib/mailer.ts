import nodemailer from 'nodemailer';
import type { ContactLeadPayload, ChatbotLeadPayload, LeadKind } from './leads-store';

const FALLBACK_MAIL_TO = 'cdeol48@gmail.com';

function buildHtml(kind: LeadKind, payload: ContactLeadPayload | ChatbotLeadPayload) {
  const brandOrange = '#FF8200';
  const brandDark = '#111822';
  
  if (kind === 'contact') {
    const p = payload as ContactLeadPayload;
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Lead - Chirag Deol</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f7f6f3;
            color: #333333;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(17, 24, 34, 0.06);
          }
          .header {
            background-color: ${brandDark};
            padding: 30px;
            text-align: center;
            border-bottom: 3px solid ${brandOrange};
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
            letter-spacing: 2px;
          }
          .logo-dot {
            color: ${brandOrange};
          }
          .content {
            padding: 35px 30px;
          }
          .title {
            font-size: 20px;
            font-weight: 600;
            color: ${brandDark};
            margin-top: 0;
            margin-bottom: 20px;
          }
          .field-group {
            margin-bottom: 18px;
            border-bottom: 1px solid #eeeeee;
            padding-bottom: 12px;
          }
          .field-group:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
          }
          .label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #8a8f8d;
            font-weight: bold;
            margin-bottom: 4px;
          }
          .value {
            font-size: 15px;
            color: ${brandDark};
            line-height: 1.5;
          }
          .message-box {
            background-color: #fcfbf9;
            border-left: 3px solid ${brandOrange};
            padding: 15px;
            border-radius: 4px;
            font-style: italic;
            margin-top: 5px;
          }
          .footer {
            background-color: #f1ede6;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #8a8f8d;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">CHIRAG DEOL<span class="logo-dot">.</span></div>
          </div>
          <div class="content">
            <h2 class="title">New Contact Form Lead</h2>
            
            <div class="field-group">
              <div class="label">Name</div>
              <div class="value">${p.name}</div>
            </div>
            
            <div class="field-group">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${p.email}" style="color: ${brandOrange}; text-decoration: none;">${p.email}</a></div>
            </div>
            
            <div class="field-group">
              <div class="label">Company</div>
              <div class="value">${p.company || 'Not Specified'}</div>
            </div>
            
            <div class="field-group">
              <div class="label">Phone Number</div>
              <div class="value">${p.phone || 'Not Specified'}</div>
            </div>
            
            <div class="field-group">
              <div class="label">Budget Tier</div>
              <div class="value" style="font-weight: 500;">${p.budget || 'Not Specified'}</div>
            </div>
            
            <div class="field-group">
              <div class="label">Requested Services</div>
              <div class="value">${p.services.join(', ') || 'Not Specified'}</div>
            </div>
            
            <div class="field-group" style="border-bottom: none;">
              <div class="label">Message</div>
              <div class="value message-box">${p.message.replace(/\n/g, '<br/>')}</div>
            </div>
          </div>
          <div class="footer">
            Sent automatically from chiragdeol.in Lead Capture System
          </div>
        </div>
      </body>
      </html>
    `;
  }

  const p = payload as ChatbotLeadPayload;
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Chatbot Lead - Chirag Deol</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          background-color: #f7f6f3;
          color: #333333;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(17, 24, 34, 0.06);
        }
        .header {
          background-color: ${brandDark};
          padding: 30px;
          text-align: center;
          border-bottom: 3px solid ${brandOrange};
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #ffffff;
          letter-spacing: 2px;
        }
        .logo-dot {
          color: ${brandOrange};
        }
        .content {
          padding: 35px 30px;
        }
        .title {
          font-size: 20px;
          font-weight: 600;
          color: ${brandDark};
          margin-top: 0;
          margin-bottom: 20px;
        }
        .field-group {
          margin-bottom: 18px;
          border-bottom: 1px solid #eeeeee;
          padding-bottom: 12px;
        }
        .field-group:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #8a8f8d;
          font-weight: bold;
          margin-bottom: 4px;
        }
        .value {
          font-size: 15px;
          color: ${brandDark};
          line-height: 1.5;
        }
        .footer {
          background-color: #f1ede6;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #8a8f8d;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">CHIRAG DEOL<span class="logo-dot">.</span></div>
        </div>
        <div class="content">
          <h2 class="title">New Interactive Chatbot Lead</h2>
          
          <div class="field-group">
            <div class="label">Interested Service</div>
            <div class="value" style="font-weight: 500;">${p.service || 'Not Specified'}</div>
          </div>
          
          <div class="field-group">
            <div class="label">Budget Estimate</div>
            <div class="value" style="font-weight: 500;">${p.budget || 'Not Specified'}</div>
          </div>
          
          <div class="field-group">
            <div class="label">Expected Project Timeline</div>
            <div class="value">${p.timeline || 'Not Specified'}</div>
          </div>
          
          <div class="field-group" style="border-bottom: none;">
            <div class="label">Contact Detail (Email/Phone)</div>
            <div class="value" style="font-size: 16px; font-weight: bold; color: ${brandOrange};">${p.contact}</div>
          </div>
        </div>
        <div class="footer">
          Sent automatically from chiragdeol.in Chatbot System
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendLeadEmail(
  kind: LeadKind,
  payload: ContactLeadPayload | ChatbotLeadPayload
) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const receiver = process.env.NOTIFICATION_EMAIL || FALLBACK_MAIL_TO;
  if (!user || !pass) return;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  const subject = kind === 'contact' ? 'New Contact Form Lead - Chirag Deol' : 'New Chatbot Lead - Chirag Deol';

  await transporter.sendMail({
    from: `"ChiragDeol Website" <${user}>`,
    to: receiver,
    replyTo: kind === 'contact' ? (payload as ContactLeadPayload).email : undefined,
    subject,
    html: buildHtml(kind, payload),
  });
}
