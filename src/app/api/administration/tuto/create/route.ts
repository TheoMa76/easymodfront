import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json({ message: 'API URL non configuree' }, { status: 500 });
  }

  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    const tutoData = await request.json(); 
    tutoData.imageFile = null;
    
    const response = await fetch(`${apiUrl}/admin/parpitier`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(tutoData), // Envoyer les données JSON au serveur externe
    });
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({ tutos: data }, { status: 200 });
    } else {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
  } catch (error) {
    console.error('Erreur réseau:', error);
    return NextResponse.json({ message: 'Erreur réseau' }, { status: 500 });
  }
}
