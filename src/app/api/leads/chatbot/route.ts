import { NextResponse } from 'next/server';
import { addLead, type ChatbotLeadPayload } from '@/lib/leads-store';
import { sendLeadEmail } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatbotLeadPayload;
    if (!body?.contact) {
      return NextResponse.json({ error: 'Contact is required.' }, { status: 400 });
    }

    const lead = await addLead('chatbot', {
      service: body.service?.trim(),
      budget: body.budget?.trim(),
      timeline: body.timeline?.trim(),
      contact: body.contact.trim(),
    });

    let emailSent = true;
    try {
      await sendLeadEmail('chatbot', lead.payload as ChatbotLeadPayload);
    } catch (error) {
      console.error('Failed to send chatbot email:', error);
      emailSent = false;
    }

    return NextResponse.json({ ok: true, emailSent });
  } catch {
    return NextResponse.json({ error: 'Unable to save chatbot lead.' }, { status: 500 });
  }
}
