import { NextResponse } from 'next/server';
import { addLead, type ContactLeadPayload } from '@/lib/leads-store';
import { sendLeadEmail } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactLeadPayload;
    if (!body?.name || !body?.email || !body?.message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const lead = await addLead('contact', {
      name: body.name.trim(),
      company: body.company?.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim(),
      budget: body.budget?.trim(),
      message: body.message.trim(),
      services: Array.isArray(body.services) ? body.services : [],
    });

    let emailSent = true;
    try {
      await sendLeadEmail('contact', lead.payload as ContactLeadPayload);
    } catch (error) {
      console.error('Failed to send contact email:', error);
      emailSent = false;
    }

    return NextResponse.json({ ok: true, emailSent });
  } catch {
    return NextResponse.json({ error: 'Unable to save lead.' }, { status: 500 });
  }
}
