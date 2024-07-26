import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'No token found' }, { status: 401 });
    }

    const response = await fetch('http://localhost:8000/user/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    } else {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Erreur réseau', error: error.message }, { status: 500 });
  }
}
