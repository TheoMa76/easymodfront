import { NextResponse } from 'next/server';
import Cookies from 'js-cookie';

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json({ message: 'API URL non configurée' }, { status: 500 });
  }
  try {
    const token = Cookies.get('token');

    const response = await fetch(`${apiUrl}/tuto/`, {
      method: 'GET'
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data.sort((a:any, b:any) => a.position - b.position), { status: 200 });
    } else {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Erreur réseau', error: error.message }, { status: 500 });
  }
}
