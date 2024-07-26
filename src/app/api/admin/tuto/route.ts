import { NextResponse } from 'next/server';
import Cookies from 'js-cookie';
import https from 'https';

export async function GET(request: Request) {
    const token = Cookies.get('token');
  try {
    const response = await fetch('http://localhost:8000/admin/tuto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({ tutos:data }, { status: 200 });
    } else {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
  } catch (error) {
    console.error('Erreur réseau:', error);
    return NextResponse.json({ message: 'Erreur réseau'}, { status: 500 });
  }
}
