import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

interface Id{
  id:number;
}

export async function GET(request: NextRequest,{params}: {params: Id}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json({ message: 'API URL non configurée' }, { status: 500 });
  }
  try {
    const response = await fetch(`${apiUrl}/tuto/preview/find/${params.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({ tuto:data }, { status: 200 });
    } else {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
  } catch (error) {
    console.error('Erreur réseau:', error);
    return NextResponse.json({ message: 'Erreur réseau'}, { status: 500 });
  }
}
