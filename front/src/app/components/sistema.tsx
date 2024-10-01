
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import Layout from "./layoutPrincipal"
import { IconeDetalhes } from "../../utils/icones"
import { FaCheck, FaDev, FaEdit, FaPlus } from "react-icons/fa"
import { useCallback, useEffect, useState } from "react"
import { buscarTodos, excluirRegistro } from "@/utils/axiosService"
import AlertaDePerigo from "@/utils/alertas"
import RegistroSistema from "./registrarSistema"


function Sistema() {

    const [isRegistroSistemaAberto, setIsRegistroSistemaAberto] = useState(false);
    const [isDetalhesAtividadesABerto, setIsDetalhesAtividadesAberto] = useState(false);
    const [sistemaSelecionado, setSistemaSelecionado] = useState<SistemaNameSpace.EntidadeSistema | null>(null);
    const [sistemas, setSistemas] = useState<SistemaNameSpace.EntidadeSistema[]>([]);
    const [mostrarAlertaPerigo, setMostrarAlertaPerigo] = useState(false);
    const [salvarIdOpcaoDelete, setSalvarIdOpcaoDelete] = useState<number | null>(null);
    const [mensagemErro, setMensagemErro] = useState("");
    const [isSucesso, setIsSucesso] = useState(false);

    const buscarDados = useCallback(async () => {
        try {

            const resposta = await buscarTodos<SistemaNameSpace.EntidadeSistema[]>('listarSistemas',);

            if (resposta) {
                setSistemas(resposta);

            } else {
                console.error('Resposta da API inválida', resposta);
            }

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }, []);

    useEffect(() => {
        buscarDados();
    }, [buscarDados]);


    function abrirRegistroSistema() {
        setIsRegistroSistemaAberto(true);
    }

    function fecharRegistroSistema() {
        setIsRegistroSistemaAberto(false);
        buscarDados();
    }

    const abrirDetalhes = (sistema: SistemaNameSpace.EntidadeSistema) => (event: React.MouseEvent<HTMLDivElement>) => {

        if (sistema && sistema.idSistema) {
            setIsDetalhesAtividadesAberto(true);
            setSistemaSelecionado(sistema);
        } else {
            console.error('Atividade inválida', sistema);
        }

    };

    function fecharDetalhes() {
        setIsDetalhesAtividadesAberto(false);
        setSistemaSelecionado(null);
        buscarDados();
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
                await excluirRegistro('deletarAtividade', `${salvarIdOpcaoDelete}`)
                setMensagemErro('');
                setIsSucesso(true);
                setTimeout(() => {
                    setIsSucesso(false);
                }, 2000);
                buscarDados();
            } catch (error) {
                setMensagemErro('Erro ao excluir o registro. Tente novamente');
            }
        }
        setMostrarAlertaPerigo(false);
        setSalvarIdOpcaoDelete(null);
    };
    //---------------------------------------------------------

    return (
        <Layout>
            <div className="p-6 sm:p-10 bg-gray-100 min-h-screen">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold text-black mb-6">Sistemas</h1>
                    <Button
                        onClick={abrirRegistroSistema}
                        className="bg-[#2C3E50] hover:bg-[#152232] p-3  shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2 mb-4"
                        size="lg"
                    >
                        <FaPlus className="text-white" />
                        <span>Cadastrar</span>
                    </Button>
                    <Table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
                        <TableHeader>
                            <TableRow className="bg-gray-200 text-gray-600">
                                <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</TableHead>
                                <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Sistema</TableHead>
                                <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</TableHead>
                                <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Detalhes</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sistemas.map((sistema) => (
                                <TableRow key={sistema.idSistema} className="hover:bg-gray-100 transition-colors duration-200">
                                    <TableCell className="px-6 py-4 whitespace-nowrap">{sistema.idSistema}</TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap">{sistema.nomeSistema}</TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap">{sistema.sistemaAtivo ? "Ativo" : "Inativo"}</TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap text-right">
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
                                                <DropdownMenuItem onClick={() => abrirDetalhes(sistema)} className="cursor-pointer flex items-center gap-2">
                                                    <FaEdit className="text-blue-500" />
                                                    <span>Editar</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleAlertaPerigo(sistema.idSistema)} className="cursor-pointer flex items-center gap-2 text-red-600">
                                                    <FaCheck />
                                                    <span>Inativar</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>
                <RegistroSistema abrir={isRegistroSistemaAberto} onFechar={fecharRegistroSistema}/>
                <AlertaDePerigo isAberto={mostrarAlertaPerigo} onFechar={fecharAlertaPerigo} onConfirmacao={confirmacaoDeDelecao} />
            </div>
        </Layout>

    )
}

export default Sistema;

