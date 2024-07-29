import { NextResponse } from 'next/server';
import Cookies from 'js-cookie';
import https from 'https';

export async function POST(request: Request) {
  const token = (request.headers.get('cookie'))?.split('=')[1];
  console.log(request.body);

  try {
    const response = await fetch('http://localhost:8000/admin/create/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(request.body),
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({ user:data }, { status: 200 });
    } else {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
  } catch (error) {
    console.error('Erreur réseau:', error);
    return NextResponse.json({ message: 'Erreur réseau'}, { status: 500 });
  }
}
