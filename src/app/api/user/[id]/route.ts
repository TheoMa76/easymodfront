import { NextRequest, NextResponse } from "next/server";

interface Id{
    id:number;
}

export async function DELETE(request: NextRequest,{params}: {params: Id}) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json({ message: 'API URL non configuree' }, { status: 500 });
  }
    const token = (request.headers.get('cookie'))?.split('=')[1];
    const data = await request.json();

  try {
    const response = await fetch(`${apiUrl}/user/${params.id}/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(data)

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