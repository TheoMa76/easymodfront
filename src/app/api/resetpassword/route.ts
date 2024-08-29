import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        return NextResponse.json({ message: 'API URL non configuree' }, { status: 500 });
    }

    try {
        // Parse the JSON body from the request
        const { email } = await req.json();

        // Ensure email is in the correct format
        if (!email || typeof email !== 'string') {
            return NextResponse.json({ message: 'Email invalide' }, { status: 400 });
        }

        // Create the body for the request to the external API
        const requestBody = JSON.stringify({ email });

        // Make the request to the external API
        const response = await fetch(`${apiUrl}/user/reset`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: requestBody,
        });


        if (response.ok) {
            const data = await response.json();
            return NextResponse.json(data, { status: 200 });
        } else {
            const errorData = await response.json();
            return NextResponse.json(errorData, { status: response.status });
        }
    } catch (error: any) {
        // Log the error for debugging
        console.error('Erreur reseau:', error.message);
        return NextResponse.json({ message: 'Erreur reseau', error: error.message }, { status: 500 });
    }
}
