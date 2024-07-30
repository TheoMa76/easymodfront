import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

interface Token{
  token:string;
}

export async function POST(request: NextRequest,{params}: {params: Token}) {
    const { password,confirmPassword } = await request.json();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json({ message: 'API URL non configurée' }, { status: 500 });
  }

  try {
    const response = await fetch(`${apiUrl}/user/reset/${params.token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({password,confirmPassword}),
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
