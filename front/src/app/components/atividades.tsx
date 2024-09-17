
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import Layout from "./layoutPrincipal"
import { IconeDetalhes } from "../../utils/icones"
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa"
import { useCallback, useEffect, useState } from "react"
import RegistroAtividade from "./registrarAtividades"
import { buscarTodos } from "@/utils/axiosService"
import DateTableCell from "@/utils/colunaDataFormatada"

interface PropriedadesUsuario {
    idUsuario: number;
    usuario: string;
    nomeCompleto: string;
    emailUsuario: string;
}

interface PropriedadesAtividades {
    idAtividade: number;
    nomeAtividade: string;
    usuarioResponsavel: PropriedadesUsuario;
    usuaruioSolicitante: PropriedadesUsuario;
    dataInicioAtividade: string;
    problemaRelatado: string;
    solucaoAplicada: string;
    pendencia: string;
    statusAtividade: string;
}

//TODO: arrumar a celula da tabela de usuario solicitante e responsavel
//TODO: formatar as datas para dd/MM/aa HH:mm

function Atividades() {

    const [isRegistroAtividadesAberto, setIsRegistroAtividadesAberto] = useState(false);
    const [atividades, setAtividades] = useState<PropriedadesAtividades[]>([]);

    const buscarDados = useCallback(async () => {
        try {

            const resposta = await buscarTodos<PropriedadesAtividades[]>('atividades',);

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
                                    <TableCell>{}</TableCell>
                                    <TableCell>{atividade.dataInicioAtividade}</TableCell>
                                    <TableCell>{}</TableCell>
                                    <TableCell>{atividade.problemaRelatado}</TableCell>
                                    <TableCell>{atividade.solucaoAplicada}</TableCell>
                                    <TableCell>{atividade.pendencia}</TableCell>
                                    <TableCell>{atividade.statusAtividade}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <RegistroAtividade abrir={isRegistroAtividadesAberto} onFechar={fecharRegistroAtividades} />
            </div>
        </Layout>

    )
}

export default Atividades;

