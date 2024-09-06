
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import Layout from "./layoutPrincipal"
import { IconeDetalhes } from "../../utils/icones"
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa"
import { useState } from "react"
import RegistroAtividade from "./registrarAtividades"

function Atividades() {

    const [isRegistroAtividadesAberto, setIsRegistroAtividadesAberto] = useState(false);

    function abrirRegistroAtividades() {
        setIsRegistroAtividadesAberto(true);
    }

    function fecharRegistroAtividades() {
        setIsRegistroAtividadesAberto(false);
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
                                <TableHead>Nome da Tarefa</TableHead>
                                <TableHead>Responsável</TableHead>
                                <TableHead>Data de Início</TableHead>
                                <TableHead>Solicitante</TableHead>
                                <TableHead>Problema Relatado</TableHead>
                                <TableHead>Solução Aplicada</TableHead>
                                <TableHead>Pendência</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Atualizar sistema</TableCell>
                                <TableCell>John Doe</TableCell>
                                <TableCell>2023-05-01</TableCell>
                                <TableCell>Jane Smith</TableCell>
                                <TableCell>Sistema está desatualizado</TableCell>
                                <TableCell>Atualizei o sistema para a versão mais recente</TableCell>
                                <TableCell>Nenhuma</TableCell>
                                <TableCell>Aberto</TableCell>
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
                                            <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                                                <FaEdit className="text-blue-500" />
                                                <span>Editar</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-red-600">
                                                <FaTrashAlt />
                                                <span>Excluir</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Resolver problema no banco de dados</TableCell>
                                <TableCell>Bob Johnson</TableCell>
                                <TableCell>2023-04-15</TableCell>
                                <TableCell>John Doe</TableCell>
                                <TableCell>Banco de dados está lento</TableCell>
                                <TableCell>Otimizei as consultas e aumentei a memória do servidor</TableCell>
                                <TableCell>Nenhuma</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="icon">
                                                <IconeDetalhes className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Editar</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <RegistroAtividade abrir={isRegistroAtividadesAberto} onFechar={fecharRegistroAtividades} />
            </div>
        </Layout>

    )
}

export default Atividades;

