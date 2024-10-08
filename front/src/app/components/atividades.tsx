
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import Layout from "./layoutPrincipal"
import { IconeDetalhes } from "../../utils/icones"
import { FaDev, FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa"
import { useCallback, useEffect, useState } from "react"
import RegistroAtividade from "./registrarAtividades"
import { buscarTodos, excluirRegistro } from "@/utils/axiosService"
import DateTableCell from "@/utils/colunaDataFormatada"
import DetalhesAtividade from "./detalhesAtividades"
import AlertaDePerigo from "@/utils/alertas"

function Atividades() {

    const [isRegistroAtividadesAberto, setIsRegistroAtividadesAberto] = useState(false);
    const [isDetalhesAtividadesABerto, setIsDetalhesAtividadesAberto] = useState(false);
    const [atividadeSelecionada, setAtividadeSelecionada] = useState<Atividade.EntidadeAtividade | null>(null);
    const [atividades, setAtividades] = useState<Atividade.EntidadeAtividade[]>([]);
    const [mostrarAlertaPerigo, setMostrarAlertaPerigo] = useState(false);
    const [salvarIdOpcaoDelete, setSalvarIdOpcaoDelete] = useState<number | null>(null);
    const [mensagemErro, setMensagemErro] = useState("");
    const [isSucesso, setIsSucesso] = useState(false);

    const buscarDados = useCallback(async () => {
        try {

            const resposta = await buscarTodos<Atividade.EntidadeAtividade[]>('atividades',);

            if (resposta) {
                setAtividades(resposta);

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


    function abrirRegistroAtividades() {
        setIsRegistroAtividadesAberto(true);
    }

    function fecharRegistroAtividades() {
        setIsRegistroAtividadesAberto(false);
        buscarDados();
    }

    const abrirDetalhes = (atividade: Atividade.EntidadeAtividade) => (event: React.MouseEvent<HTMLDivElement>) => {

        if (atividade && atividade.idAtividade) {
            setIsDetalhesAtividadesAberto(true);
            setAtividadeSelecionada(atividade);
        } else {
            console.error('Atividade inválida', atividade);
        }

    };

    function fecharDetalhes() {
        setIsDetalhesAtividadesAberto(false);
        setAtividadeSelecionada(null);
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
                    <h1 className="text-4xl font-bold text-black mb-6">Atividades</h1>
                    <Button
                        onClick={abrirRegistroAtividades}
                        className="bg-[#2C3E50] hover:bg-[#152232] p-3  shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2 mb-4"
                        size="lg"
                    >
                        <FaPlus className="text-white" />
                        <span>Cadastrar</span>
                    </Button>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome da atividade</TableHead>
                                <TableHead>Responsável</TableHead>
                                <TableHead>Data de início</TableHead>
                                <TableHead>Tempo gasto</TableHead>
                                <TableHead>Solicitante</TableHead>
                                <TableHead>Problema relatado</TableHead>
                                <TableHead>Solução aplicada</TableHead>
                                <TableHead>Pendência</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Detalhes</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {atividades.map((atividade) => (
                                <TableRow key={atividade.idAtividade}>
                                    <TableCell>{atividade.nomeAtividade}</TableCell>
                                    <TableCell>{atividade.usuarioResponsavel.nomeCompleto}</TableCell>
                                    <DateTableCell data={atividade.dataInicioAtividade}></DateTableCell>
                                    <TableCell>
                                        {atividade.tempoGasto} h
                                    </TableCell>
                                    <TableCell>{atividade.usuarioSolicitante.nomeCompleto}</TableCell>
                                    <TableCell>{atividade.problemaRelatado}</TableCell>
                                    <TableCell>{atividade.solucaoProblema}</TableCell>
                                    <TableCell>{atividade.pendencia}</TableCell>
                                    <TableCell>{atividade.statusAtividade}</TableCell>
                                    <TableCell>
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
                                                <DropdownMenuItem onClick={abrirDetalhes(atividade)} className="cursor-pointer flex items-center gap-2">
                                                    <FaEdit className="text-blue-500" />
                                                    <span>Editar</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleAlertaPerigo(atividade.idAtividade)} className="cursor-pointer flex items-center gap-2 text-red-600">
                                                    <FaTrashAlt />
                                                    <span>Excluir</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <DetalhesAtividade abrir={isDetalhesAtividadesABerto} onFechar={fecharDetalhes} dados={atividadeSelecionada} />
                </div>
                <RegistroAtividade abrir={isRegistroAtividadesAberto} onFechar={fecharRegistroAtividades} />
                <AlertaDePerigo titulo="Confirmar exclusão?" descricao="Todos os dados do registro serão excluídos do sistema" isAberto={mostrarAlertaPerigo} onFechar={fecharAlertaPerigo} onConfirmacao={confirmacaoDeDelecao} />
            </div>
        </Layout>

    )
}

export default Atividades;

