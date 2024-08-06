'use client'

import { useState } from "react"
import { useAuth } from "../contexts/authContext";
import { useForm } from "react-hook-form";

interface dadosFormulario {
    usuario: string;
    senhaUsuario: string;
}

export function LoginForm() {
    const { register, handleSubmit } = useForm<dadosFormulario>();
    const { signIn } = useAuth();
    const [mensagemErro, setMensagemErro] = useState('');

    async function handleSignIn(dados: dadosFormulario) {
        try {
            await signIn(dados);
            setMensagemErro('');
        } catch (error) {
            setMensagemErro('Usuário ou senha inválidos')
        }
    }
    return (
        <div className="flex items-center justify-center h-screen bg-[#2a4564]">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center text-[#2a4564]">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
                    <div>
                        <label htmlFor="username" className="block mb-1 text-sm font-medium text-[#2a4564]">
                            Usuário
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Insira seu usuário"
                            className="w-full px-3 py-2 border border-[#2a4564] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a4564] focus:border-transparent"
                            {...register('usuario', { required: true })}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-[#2a4564]">
                            Senha
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Insira sua senha"
                            className="w-full px-3 py-2 border border-[#2a4564] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2a4564] focus:border-transparent"
                            {...register('senhaUsuario', { required: true })}
                        />
                    </div>
                    {mensagemErro && (
                        <div className="mb-4 text-[#EA4335] text-sm">
                            {mensagemErro}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-medium text-white bg-[#2a4564] rounded-md hover:bg-[#1e3549] focus:outline-none focus:ring-2 focus:ring-[#2a4564] focus:ring-offset-2"
                    >
                        Logar
                    </button>
                </form>
            </div>
        </div>
    )
}