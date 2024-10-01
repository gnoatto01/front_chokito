'use client'
import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import nookies, { destroyCookie, setCookie } from 'nookies';

interface dadosFormulario {
    usuario: string;
    senhaUsuario: string;
}

interface AuthContextData {
    isAuthenticated: boolean;
    signIn: (dados: dadosFormulario) => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = nookies.get(null, 'naturalbit.token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    // Função de login
    async function signIn({ usuario, senhaUsuario }: dadosFormulario) {
        try {
            //const response = await axios.post('https://api.naturalbit.com.br:705/suportebit/login', { usuario, senhaUsuario });

            const response = await axios.post('http://localhost:8080/suportebit/login', { usuario, senhaUsuario });


            setIsAuthenticated(true);

            // Definir o cookie com o token
            setCookie(undefined, 'naturalbit.token', response.data.tokenDeAcesso, {
                maxAge: 60 * 60 * 1, // 1 hora
                path: '/',
            });

            // Redirecionar para a página de dashboard
            Router.push('/app/paginaDashboard');

        } catch (error) {
            setIsAuthenticated(false);
            destroyCookie(null, 'naturalbit.token'); // Remover cookie inválido
            Router.push('/login'); // Redirecionar para login
            throw new Error('Falha na autenticação.');
        }
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
