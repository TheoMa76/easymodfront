// src/app/api/login/route.ts

import { NextResponse } from 'next/server';
import https from 'https';

export async function POST(request: Request) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json({ message: 'API URL non configurée' }, { status: 500 });
  }
  try {
    const { email, password } = await request.json();

    const response = await fetch(`${apiUrl}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({ token: data.token }, { status: 200 });
    } else {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
  } catch (error) {
    console.error('Erreur réseau:', error);
    return NextResponse.json({ message: 'Erreur réseau'}, { status: 500 });
  }
}
