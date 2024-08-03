import { NextResponse } from 'next/server';
import Cookies from 'js-cookie';

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json({ message: 'API URL non configuree' }, { status: 500 });
  }
  
  try {
    const token = Cookies.get('token');

    const response = await fetch(`${apiUrl}/tuto/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '','Cache-Control': 'no-cache, no-store, must-revalidate', // Evite le cache
    'Pragma': 'no-cache', // Pour les navigateurs plus anciens
    'Expires': '0'
      },
    });

    if (response.ok) {
      let data = await response.json();
      data = data.map((tuto: any) => ({
        ...tuto,
        imageUrl: tuto.imageUrl ? `${apiUrl}${tuto.imageUrl}` : null,
      }));

      return NextResponse.json(data.sort((a: any, b: any) => a.position - b.position), { status: 200 });
    } else {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Erreur reseau', error: error.message }, { status: 500 });
  }
}
