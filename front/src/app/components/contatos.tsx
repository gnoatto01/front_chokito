"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import axios from "axios";
import { parseCookies } from "nookies";
import { JSX, SVGProps, useEffect, useState } from "react"
import { IconeDetalhes } from "./icones";
import { Input } from "@/components/ui/input";
import { RegistrarContatoModal } from "./registrarContatoModal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


interface retornoContato {
    idContato: number;
    email: string;
    nomeContato: string;
    telefone: string;
    whatsapp: string;
    idUsuario: number;
}

export default function Contatos() {

    const [contatos, setContatos] = useState<retornoContato[]>([]);
    const [dadosFiltro, setDadosFiltro] = useState("")
    const [isModalRegistroContatoAberto, setIsModalRegistroContatoAberto] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {

                const cookies = parseCookies();
                const accessToken = cookies['naturalbit.token'];

                if (accessToken) {
                    const resposta = await axios.get<retornoContato[]>("http://localhost:8080/naturalbit/api/contatos", {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },

                    });
                    setContatos(resposta.data);

                } else {
                    console.error('No token found in cookies');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);

    const filtarContatos = contatos.filter(
        (contato) =>
            contato.nomeContato.toLowerCase().includes(dadosFiltro.toLowerCase()) ||
            contato.whatsapp.includes(dadosFiltro),
    )

    function abrirModalDeRegistro() {
        setIsModalRegistroContatoAberto(true);
    }

    function fecharModalDeRegistro() {
        setIsModalRegistroContatoAberto(false);
    }

    return (
        <div className="p-6 sm:p-10">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-6">Contatos</h1>
                <div className="flex items-center justify-between">
                    <Button onClick={abrirModalDeRegistro} className="bg-[#2a4564] hover:bg-[#152232]" size="sm">Novo contato</Button>
                    <Input
                        type="text"
                        placeholder="Procure por contatos..."
                        value={dadosFiltro}
                        onChange={(e) => setDadosFiltro(e.target.value)}
                        className="max-w-xs"
                    />
                </div>
            </div>
            <div className="grid gap-6">
                {filtarContatos.map((contato) => (
                    <div key={contato.idContato} className="bg-background rounded-lg shadow-md">
                        <div className="flex items-center justify-between px-6 py-4">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="/placeholder-user.jpg" alt={contato.nomeContato} />
                                    <AvatarFallback>{contato.nomeContato.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-0.5">
                                    <div className="font-medium">{contato.nomeContato}</div>
                                    <div className="text-muted-foreground">
                                        {contato.email} | {contato.whatsapp}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon" className="h-7 w-7">
                                            <IconeDetalhes color="#2a4564" className="h-4 w-4" />
                                            <span className="sr-only">Editar</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Detalhes</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer">Editar</DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">Excluir</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer">Fechar</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <RegistrarContatoModal isAberto={isModalRegistroContatoAberto} onFechar={fecharModalDeRegistro} />
        </div>
    )
}
