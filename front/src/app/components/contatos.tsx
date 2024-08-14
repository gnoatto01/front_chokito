"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { destroyCookie, parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { IconeDetalhes } from "./icones";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DetalhesContato from "./detalhesContato";
import AlertaDePerigo, { AlertaDeSucesso } from "./alertas";
import router from "next/router";
import { FaPlus, FaSearch, FaTrashAlt, FaEdit, FaDownload, FaPaste, FaFileExcel, FaFilePdf, FaPowerOff } from 'react-icons/fa';
import RegistroContato from "./registrarContato";
import { exportarContatoParaPDF, exportarParaExcel } from "./exports";
import Layout from "./layoutPrincipal";

interface retornoContato {
    idContato: number;
    email: string;
    nomeContato: string;
    telefone: string;
    whatsapp: string;
    idUsuario: number;
    descricaoContato: string;
}

//TODO: Fazer dar reload na tabela quando excluir ou incluir um novo registro

export default function Contatos() {

    const [contatos, setContatos] = useState<retornoContato[]>([]);
    const [dadosFiltro, setDadosFiltro] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");
    const [isSucesso, setIsSucesso] = useState(false);
    const [contatoSelecionado, setContatoSelecionado] = useState<retornoContato | null>(null);
    const [isRegistroContatoAberto, setIsRegistroContatoAberto] = useState(false);
    const [isDetalhesAberto, setIsDetalelhesAberto] = useState(false);
    const [mostrarAlertaPerigo, setMostrarAlertaPerigo] = useState(false);
    const [salvarOpcaoDelete, setSalvarOpcaoDelete] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cookies = parseCookies();
                const accessToken = cookies['naturalbit.token'];

                if (accessToken) {
                    const resposta = await axios.get<retornoContato[]>("http://localhost:8080/suportebit/contatos", {
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

    const filtrarContatos = contatos.filter(
        (contato) =>
            contato.nomeContato.toLowerCase().includes(dadosFiltro.toLowerCase()) ||
            contato.whatsapp.includes(dadosFiltro),
    );


    function abrirRegistroContatos() {
        setIsRegistroContatoAberto(true);
    }

    function fecharRegistroContatos() {
        setIsRegistroContatoAberto(false);
    }

    const abrirDetalhes = (contato: retornoContato) => (event: React.MouseEvent<HTMLDivElement>) => {
        setIsDetalelhesAberto(true);
        setContatoSelecionado(contato);
    };

    function fecharDetalhes() {
        setIsDetalelhesAberto(false);
        setContatoSelecionado(null);
    }

    const handleAlertaPerigo = (salvarId: number) => {
        setSalvarOpcaoDelete(salvarId);
        setMostrarAlertaPerigo(true);
    };

    const fecharAlertaPerigo = () => {
        setMostrarAlertaPerigo(false);
        setSalvarOpcaoDelete(null);
    };


    const handleExportarExcel = () => {
        exportarParaExcel(contatos, 'contatos');
    }

    const handleExportarPDF = () => {
        exportarContatoParaPDF(contatos, 'contatos');
    }

    const confirmacaoDeDelecao = async () => {
        if (salvarOpcaoDelete !== null) {
            try {
                await axios.delete(`http://localhost:8080/suportebit/deletar-contato/${salvarOpcaoDelete}`);
                setMensagemErro('');
                setIsSucesso(true);
                setTimeout(() => {
                    setIsSucesso(false);
                }, 2000);
            } catch (error) {
                setMensagemErro('Erro ao excluir o registro. Tente novamente');
            }
        }
        setMostrarAlertaPerigo(false);
        setSalvarOpcaoDelete(null);
    };

    return (

        <Layout>
            <div className="p-6 sm:p-10 bg-gray-100 min-h-screen">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">Contatos</h1>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <Button
                            onClick={abrirRegistroContatos}
                            className="bg-[#2C3E50] hover:bg-[#152232] p-3  shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2"
                            size="lg"
                        >
                            <FaPlus className="text-white" />
                            <span>Novo Contato</span>
                        </Button>

                        <div className="relative w-full max-w-md">
                            <FaSearch className="absolute top-3 left-3 text-gray-500" />
                            <Input
                                type="text"
                                placeholder="Procure por contatos..."
                                value={dadosFiltro}
                                onChange={(e) => setDadosFiltro(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    className="bg-green-600 hover:bg-green-500 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                                    size="lg"
                                >
                                    <FaPaste className="text-white" />
                                    <span>Ações</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleExportarExcel} className="cursor-pointer flex items-center gap-2 text-green-500">
                                    <FaFileExcel />
                                    <span>Exportar Excel</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleExportarPDF} className="cursor-pointer flex items-center gap-2 text-red-600">
                                    <FaFilePdf />
                                    <span>Exportar PDF</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                </div>
                <div className="grid gap-6">
                    {isSucesso && <AlertaDeSucesso message="Registro excluído com sucesso" />}
                    {filtrarContatos.map((contato) => (
                        <div key={contato.idContato} className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-50 transition">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarFallback>{contato.nomeContato.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold text-lg text-gray-800">{contato.nomeContato}</div>
                                        <div className="text-gray-600">
                                            {contato.email} | <a href={`https://wa.me/${contato.whatsapp}?text=Olá...`} target="_blank">{contato.whatsapp}</a>
                                        </div>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon" className="h-8 w-8">
                                            <IconeDetalhes color="#2a4564" className="h-5 w-5" />
                                            <span className="sr-only">Opções</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Opções</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={abrirDetalhes(contato)} className="cursor-pointer flex items-center gap-2">
                                            <FaEdit className="text-blue-500" />
                                            <span>Editar</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleAlertaPerigo(contato.idContato)} className="cursor-pointer flex items-center gap-2 text-red-600">
                                            <FaTrashAlt />
                                            <span>Excluir</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <RegistroContato isOpen={isRegistroContatoAberto} onClose={fecharRegistroContatos} />
                            <DetalhesContato abrir={isDetalhesAberto} onFechar={fecharDetalhes} contato={contatoSelecionado} />
                        </div>
                    ))}
                </div>
                <AlertaDePerigo isAberto={mostrarAlertaPerigo} onFechar={fecharAlertaPerigo} onConfirmacao={confirmacaoDeDelecao} />
            </div>
        </Layout>

    );
}
