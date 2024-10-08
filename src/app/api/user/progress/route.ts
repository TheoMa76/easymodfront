import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json({ message: 'API URL non configuree' }, { status: 500 });
  }
  try {
    const token = req.cookies.get('token')?.value;    

    if (!token) {
      return NextResponse.json({ message: 'No token found' }, { status: 401 });
    }

    const response = await fetch(`${apiUrl}/user/progress`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    }else if(response.status === 404){
      return NextResponse.json({ message: 'Aucune progression trouvee' }, { status: 200 });
    } else {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }
  } catch (error:any) {
    return NextResponse.json({ message: 'Erreur reseau', error: error.message }, { status: 500 });
  }
}
