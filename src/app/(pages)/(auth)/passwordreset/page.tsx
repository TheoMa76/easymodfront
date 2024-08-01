"use client";
import Form from '@/components/molecules/Forms/Form';
import React from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Card from '@/components/molecules/Card/Card';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';

type Props = {}

const ResetPasswordEmailFormPage = (props: Props) => {
    const router = useRouter();

    async function handleSubmit(values: { [key: string]: string }) {
        const { email } = values;
        if (Cookies && Cookies.get('token')) {
            toast.error('Vous êtes déjà connecté.');
            router.push('/dashboard/profil'); // Remplacement de redirect par router.push
            return;
        }
        try {
            const response = await fetch('/api/resetpassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                const data = await response.json();
                toast.success('Un e-mail vous a été envoyé.');
            } else {
                const errorData = await response.json();
                toast.error('Une erreur est survenue :', errorData.message);
            }
        } catch (error: any) {
            toast.error('Network error:', error.message);
        }
    }

    const formfields = [
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            placeholder: 'Email',
            required: true,
        },
    ];

    return (
        <div className='flex flex-col justify-center items-center m-auto w-full'>
            <Card title="Mot de passe oublié" className='lg:w-1/2 w-full mt-8 p-4'>
                <Form formFields={formfields} onSubmit={handleSubmit}></Form>
                <MinecraftButton label="Retour" onClick={() => router.push('/login')} className='mb-4'></MinecraftButton>
            </Card>
        </div>
    );
}

export default ResetPasswordEmailFormPage;
