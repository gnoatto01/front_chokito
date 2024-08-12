'use client'
import React, { createContext, ReactNode, useContext, useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import nookies, { destroyCookie, setCookie } from 'nookies'


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


    async function signIn({ usuario, senhaUsuario }: dadosFormulario) {
        try {
            const response = await axios.post('http://localhost:8080/suportebit/login', { usuario, senhaUsuario });

            console.log(response.data);
            setIsAuthenticated(true);

            if (isAuthenticated) {
                setCookie(undefined, 'naturalbit.token', response.data.tokenDeAcesso, {
                    maxAge: 60*60*1,
                    path: '/',
                });
            } else {
                destroyCookie(null, 'naturalbit.token');    
                Router.push('/login');
            }


            Router.push('/app/dashboard');

        } catch (error) {
            setIsAuthenticated(false);
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
