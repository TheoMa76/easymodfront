'use client'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import MinecraftInput from '@/components/atoms/Inputs/MinecraftInput'
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton'
 
export default function LoginPage() {
  const router = useRouter()
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')
 
    const response = await fetch('https://localhost:8000/api/login_check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
 
    if (response.ok) {
      console.log(response);
      
      router.push('/')
    } else {
      console.log(JSON.stringify({username, password}));
      
      console.log(response);
      
    }
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <MinecraftInput label="Email" type="username" name="username" placeholder="E-mail" isRequired = {true} />
      <MinecraftInput label="Mot de passe" type="password" name="password" placeholder="Mot de passe" isRequired = {true} />
      <MinecraftButton label="Se connecter" type="submit"></MinecraftButton>
    </form>
  )
}