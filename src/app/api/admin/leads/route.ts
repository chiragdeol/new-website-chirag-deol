import { NextResponse } from 'next/server';
import { getAllLeads } from '@/lib/leads-store';

export async function GET(request: Request) {
  const password = process.env.ADMIN_PANEL_PASSWORD;
  const incoming = request.headers.get('x-admin-password');

  if (!password || incoming !== password) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const leads = await getAllLeads();
    return NextResponse.json({ leads });
  } catch (err) {
    console.error('[api/admin/leads]', err);
    return NextResponse.json(
      { error: 'Could not read lead storage. If this persists on Vercel, check deployment logs.' },
      { status: 503 }
    );
  }
}
