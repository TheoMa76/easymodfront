import { NextResponse } from 'next/server';
import Cookies from 'js-cookie';

export async function GET() {
  try {
    const token = Cookies.get('token');

    const response = await fetch('http://localhost:8000/tuto/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data.sort((a, b) => a.position - b.position), { status: 200 });
    } else {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Erreur réseau', error: error.message }, { status: 500 });
  }
}
