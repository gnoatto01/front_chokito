"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { destroyCookie, parseCookies } from "nookies";
import { useCallback, useEffect, useState } from "react";
import { IconeDetalhes } from "../../utils/icones";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DetalhesContato from "./detalhesContato";
import AlertaDePerigo, { AlertaDeSucesso } from "../../utils/alertas";
import { FaPlus, FaSearch, FaTrashAlt, FaEdit, FaDownload, FaPaste, FaFileExcel, FaFilePdf, FaDatabase, FaTrash } from 'react-icons/fa';
import RegistroContato from "./registrarContato";
import { exportarContatoParaPDF, exportarParaExcel } from "../../utils/exports";
import Layout from "./layoutPrincipal";
import { useForm } from "react-hook-form";
import Paginacao from "../../utils/paginacao";
import { buscarPaginado, excluirRegistro } from "@/utils/axiosService";




//TODO:Adicionar busca por nome na busca paginada

export default function Contatos() {

    const [contatos, setContatos] = useState<Contato.EntidadeContato[]>([]);
    const [dadosFiltro, setDadosFiltro] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");
    const [isSucesso, setIsSucesso] = useState(false);
    const [contatoSelecionado, setContatoSelecionado] = useState<Contato.EntidadeContato | null>(null);
    const [isRegistroContatoAberto, setIsRegistroContatoAberto] = useState(false);
    const [isDetalhesAberto, setIsDetalelhesAberto] = useState(false);
    const [mostrarAlertaPerigo, setMostrarAlertaPerigo] = useState(false);
    const [salvarIdOpcaoDelete, setSalvarIdOpcaoDelete] = useState<number | null>(null);


    //-------------------------------------------s--------------
    //Filtrar registros
    const filtrarContatos = contatos.filter(
        (contato) =>
            contato.nomeContato.toLowerCase().includes(dadosFiltro.toLowerCase()) ||
            contato.whatsapp.includes(dadosFiltro),
    );

    //---------------------------------------------------------

    //Paginacao 
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [contatosPorPagina] = useState(5);
    const [totalDePaginas, setTotalDePaginas] = useState(0);


    const handleMudancaPagina = (pagina: number) => {
        setPaginaAtual(pagina);
    };

    //---------------------------------------------------------

    const fetchData = useCallback(async () => {
        try {

            const resposta = await buscarPaginado<Contato.EntidadeContato>(paginaAtual - 1, 5, "contatos/buscaPaginada");

            if (resposta && Array.isArray(resposta.content)) {
                setContatos(resposta.content);
                setTotalDePaginas(resposta.totalPages);

            } else {
                console.error('Resposta da API inválida', resposta);
                setContatos([]);
            }

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setContatos([]);
        }
    }, [paginaAtual]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    //Registro de contatos
    function abrirRegistroContatos() {
        setIsRegistroContatoAberto(true);
    }

    function fecharRegistroContatos() {
        setIsRegistroContatoAberto(false);
        fetchData();
    }

    //---------------------------------------------------------

    //Detalhes dos contatos
    const abrirDetalhes = (contato: Contato.EntidadeContato) => (event: React.MouseEvent<HTMLDivElement>) => {
        if (contato && contato.idContato) {
            setIsDetalelhesAberto(true);
            setContatoSelecionado(contato);
        } else {
            console.error('Contato inválido', contato);
        }

    };

    function fecharDetalhes() {
        setIsDetalelhesAberto(false);
        setContatoSelecionado(null);
        fetchData();
    }
    //---------------------------------------------------------

    //Alerta de exclusao
    const handleAlertaPerigo = (salvarId: number) => {
        setSalvarIdOpcaoDelete(salvarId);
        setMostrarAlertaPerigo(true);
    };

    const fecharAlertaPerigo = () => {
        setMostrarAlertaPerigo(false);
        setSalvarIdOpcaoDelete(null);
    };

    const confirmacaoDeDelecao = async () => {
        if (salvarIdOpcaoDelete !== null) {
            try {
                await excluirRegistro('deletarContato', `${salvarIdOpcaoDelete}`)
                setMensagemErro('');
                setIsSucesso(true);
                setTimeout(() => {
                    setIsSucesso(false);
                }, 2000);
                fetchData();
            } catch (error) {
                setMensagemErro('Erro ao excluir o registro. Tente novamente');
            }
        }
        setMostrarAlertaPerigo(false);
        setSalvarIdOpcaoDelete(null);
    };
    //---------------------------------------------------------

    //Exportar Excel
    const handleExportarExcel = () => {
        exportarParaExcel(contatos, 'contatos');
    }
    //---------------------------------------------------------

    //Exportar PDF
    const handleExportarPDF = () => {
        exportarContatoParaPDF(contatos, 'relatorio_contatos');
    }
    //---------------------------------------------------------

    return (

        <Layout>
            <div className="p-6 sm:p-10 bg-gray-100 min-h-screen">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold text-black mb-6">Contatos</h1>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <Button
                            onClick={abrirRegistroContatos}
                            className="bg-[#2C3E50] hover:bg-[#152232] p-3  shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2"
                            size="lg"
                        >
                            <FaPlus className="text-white" />
                            <span>Cadastrar</span>
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
                                    <span>Exportar</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Exportar</DropdownMenuLabel>
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
                            <div className="flex items-center justify-between cursor-pointer">
                                <div onClick={abrirDetalhes(contato)} className="flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12">
                                            <AvatarFallback>{contato.nomeContato.slice(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-semibold text-lg text-gray-800">{contato.nomeContato}</div>
                                            <div className="text-gray-600">
                                                {contato.email}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" size="icon" onClick={() => handleAlertaPerigo(contato.idContato)} className="h-8 w-8">
                                    <FaTrashAlt color="#2a4564" className="h-4 w-4" />
                                </Button>
                            </div>
                            <DetalhesContato abrir={isDetalhesAberto} onFechar={fecharDetalhes} dados={contatoSelecionado} />
                        </div>

                    ))}
                </div>
                {/* Paginação */}
                <div className="flex justify-center mt-4">
                    <Paginacao
                        paginaAtual={paginaAtual}
                        totalDePaginas={totalDePaginas}
                        onMudancaPagina={handleMudancaPagina}
                    />
                </div>
                <RegistroContato abrir={isRegistroContatoAberto} onFechar={fecharRegistroContatos} />
                <AlertaDePerigo titulo="Confirmar exclusão?" descricao="Todos os dados do registro serão excluídos do sistema" isAberto={mostrarAlertaPerigo} onFechar={fecharAlertaPerigo} onConfirmacao={confirmacaoDeDelecao} />
            </div>
        </Layout>

    );
}
