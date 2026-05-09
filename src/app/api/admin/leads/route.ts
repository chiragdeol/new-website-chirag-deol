import { NextResponse } from 'next/server';
import { getAllLeads } from '@/lib/leads-store';

export async function GET(request: Request) {
  const password = process.env.ADMIN_PANEL_PASSWORD;
  const incoming = request.headers.get('x-admin-password');

  if (!password || incoming !== password) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const leads = await getAllLeads();
  return NextResponse.json({ leads });
}
