import nodemailer from 'nodemailer';
import type { ContactLeadPayload, ChatbotLeadPayload, LeadKind } from './leads-store';

const FALLBACK_MAIL_TO = 'hello@chiragdeol.in';

function buildHtml(kind: LeadKind, payload: ContactLeadPayload | ChatbotLeadPayload) {
  if (kind === 'contact') {
    const p = payload as ContactLeadPayload;
    return `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${p.name}</p>
      <p><strong>Company:</strong> ${p.company || '-'}</p>
      <p><strong>Email:</strong> ${p.email}</p>
      <p><strong>Phone:</strong> ${p.phone || '-'}</p>
      <p><strong>Budget:</strong> ${p.budget || '-'}</p>
      <p><strong>Services:</strong> ${p.services.join(', ') || '-'}</p>
      <p><strong>Message:</strong><br/>${p.message}</p>
    `;
  }

  const p = payload as ChatbotLeadPayload;
  return `
    <h2>New Chatbot Lead</h2>
    <p><strong>Service:</strong> ${p.service || '-'}</p>
    <p><strong>Budget:</strong> ${p.budget || '-'}</p>
    <p><strong>Timeline:</strong> ${p.timeline || '-'}</p>
    <p><strong>Contact:</strong> ${p.contact}</p>
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

  const subject = kind === 'contact' ? 'New Contact Form Lead' : 'New Chatbot Lead';

  await transporter.sendMail({
    from: `"ChiragDeol Website" <${user}>`,
    to: receiver,
    replyTo: kind === 'contact' ? (payload as ContactLeadPayload).email : undefined,
    subject,
    html: buildHtml(kind, payload),
  });
}
