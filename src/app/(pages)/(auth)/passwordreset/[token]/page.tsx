"use client";
import Form from '@/components/molecules/Forms/Form';
import React from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import Card from '@/components/molecules/Card/Card';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';

type Props = {}

const ResetPasswordPage = (props: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    
    async function handleSubmit(values: { [key: string]: string }) {
        const { password, confirmPassword } = values;
        if (Cookies && Cookies.get('token')) {
            toast.error('Vous êtes dejà connecte.');
            router.push('/dashboard/profil'); // Remplacement de redirect par router.push
            return;
        }
        try {
            const response = await fetch(`/api/resetpassword/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, confirmPassword }),
            });
            if (response.ok) {
                const data = await response.json();
                toast.success('Votre mot de passe a bien ete modifie.', data);
            } else {
                const errorData = await response.json();
                toast.error('Une erreur est survenue :', errorData);
            }
        } catch (error: any) {
            toast.error('Network error:', error);
        }
    }

    const formFields = [
        {
            name: 'password',
            label: 'Mot de passe',
            type: 'password',
            placeholder: 'Mot de passe',
            required: true,
        },
        {
            name: 'confirmPassword',
            label: 'Confirmer le mot de passe',
            type: 'password',
            placeholder: 'Confirmer le mot de passe',
            required: true,
        },
    ];

    return (
        <div className='flex flex-col justify-center items-center m-auto w-full'>
            <Card title="Reinitialisation du mot de passe." className='lg:w-1/2 w-full mt-8 p-4'>
                <Form formFields={formFields} onSubmit={handleSubmit}></Form>
                <MinecraftButton label="Retour" onClick={() => router.push('/')} className='mb-4'></MinecraftButton>
            </Card>
        </div>
    );
}

export default ResetPasswordPage;
