import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

interface Id{
  id:number;
}

export async function GET(request: NextRequest,{params}: {params: Id}) {
    const token = (request.headers.get('cookie'))?.split('=')[1];
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json({ message: 'API URL non configuree' }, { status: 500 });
  }
  try {
    const response = await fetch(`${apiUrl}/admin/user/${params.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return NextResponse.json({ user:data }, { status: 200 });
    } else {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
  } catch (error) {
    console.error('Erreur reseau:', error);
    return NextResponse.json({ message: 'Erreur reseau'}, { status: 500 });
  }
}

  export async function DELETE(request: NextRequest,{params}: {params: Id}) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json({ message: 'API URL non configuree' }, { status: 500 });
  }
    const token = (request.headers.get('cookie'))?.split('=')[1];
  try {
    const response = await fetch(`${apiUrl}/admin/user/${params.id}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    });
    if (response.ok) {
      return NextResponse.json({ message: 'Utilisateur supprime' }, { status: 200 });
    }
    else {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
  }catch (error) {
      console.error('Erreur reseau:', error);
      return NextResponse.json({ message: 'Erreur reseau'}, { status: 500 });
    }
  }

