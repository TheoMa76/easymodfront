import { NextResponse } from 'next/server';
import Cookies from 'js-cookie';
import https from 'https';

export async function GET(request: Request) {
  const token = (request.headers.get('cookie'))?.split('=')[1];
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json({ message: 'API URL non configuree' }, { status: 500 });
  }

  try {
    const response = await fetch(`${apiUrl}/admin/user`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({ users:data }, { status: 200 });
    } else {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
  } catch (error) {
    console.error('Erreur reseau:', error);
    return NextResponse.json({ message: 'Erreur reseau'}, { status: 500 });
  }
}
