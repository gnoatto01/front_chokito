import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { buscarTodos, criarRegistro } from "@/utils/axiosService"
import { SubmitHandler, useForm } from "react-hook-form"
import { useCallback, useEffect, useState } from "react"
import { AlertaDeSucesso } from "@/utils/alertas"



interface DadosUsuario {
    idUsuario: number;
    usuario: string;
    nomeCompleto: string;
    emailUsuario: string;
}

interface DadosAtividade {
    nomeAtividade: string;
    usuarioResponsavel: DadosUsuario;
    usuarioSolicitante: DadosUsuario;
    dataInicioAtividade: Date;
    problemaRelatado: string;
    solucaoProblema: string;
    statusAtividade: string;
    pendencia: string;
}

function RegistroAtividade({ abrir, onFechar }: PropriedadesDialog) {
    const [errorMessage, setErrorMessage] = useState('');
    const [isSucesso, setIsSucesso] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<DadosAtividade>();
    const [usuarios, setUsuarios] = useState<DadosUsuario[]>([]);
    const [clientes, setClientes] = useState<DadosUsuario[]>([]);

    const [usuarioResponsavel, setUsuarioResponsavel] = useState<DadosUsuario | null>(null);
    const [usuarioSolicitante, setUsuarioSolicitante] = useState<DadosUsuario | null>(null);
    const [statusAtividade, setStatusAtividade] = useState<string | null>(null);


    const registrarAtividade: SubmitHandler<DadosAtividade> = async (dados) => {

        try {
            await criarRegistro<DadosAtividade>({ data: dados }, 'registrarAtividade');
            setErrorMessage('');
            setIsSucesso(true);
            setTimeout(() => {
                setIsSucesso(false);
                onFechar();
            }, 2000);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const buscarUsuarios = useCallback(async () => {
        try {
            const respostaUsuarios = await buscarTodos<DadosUsuario[]>('usuarios');
            const respostaClientes = await buscarTodos<DadosUsuario[]>('clientes');

            if (respostaUsuarios && respostaClientes) {
                setUsuarios(respostaUsuarios)
                setClientes(respostaClientes);
            } else {
                console.error("Erro na busca na API");
                setUsuarios([]);
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setUsuarios([]);
        }
    }, [])

    useEffect(() => {
        buscarUsuarios();
    }, [buscarUsuarios]);


    return (
        <Dialog open={abrir} onOpenChange={onFechar}>
            <DialogContent className="w-full max-w-2xl">
                <DialogTitle>Registro de atividades</DialogTitle>
                <DialogDescription>Realize o cadastro de uma nova atividade</DialogDescription>
                {isSucesso && <AlertaDeSucesso message="Registro salvo com sucesso" />}
                <div className="p-6 bg-background rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6 text-primary">Cadastro de nova atividade</h1>
                    <form className="space-y-4" onSubmit={handleSubmit(registrarAtividade)}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="nomeAtividade">Nome da atividade</Label>
                                <Input autoComplete="off" placeholder="Digite o nome da tarefa"
                                    {...register('nomeAtividade', { required: true })} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="usuarioResponsavel">Responsável</Label>
                                <Select
                                    onValueChange={(valorSelecionado) => {
                                        // Encontra o usuário selecionado com base no valor selecionado
                                        const usuarioSelecionado = usuarios.find(usuario => usuario.nomeCompleto === valorSelecionado);

                                        // Se encontrou, define o usuário no estado
                                        if (usuarioSelecionado) {
                                            setUsuarioResponsavel(usuarioSelecionado);
                                            setValue('usuarioResponsavel', usuarioSelecionado);
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione o responsável" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {usuarios.map((usuario) => (
                                            <SelectItem key={usuario.idUsuario} value={usuario.nomeCompleto}>
                                                {usuario.nomeCompleto}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="dataInicioAtividade">Data de Início</Label>
                                <Input id="dataInicioAtividade" type="datetime-local"
                                    {...register('dataInicioAtividade', { required: false })} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="usuarioSolicitante">Solicitante</Label>
                                <Select
                                    onValueChange={(valorSelecionado) => {
                                        // Encontra o usuário selecionado com base no valor selecionado
                                        const usuarioSelecionado = clientes.find(cliente => cliente.nomeCompleto === valorSelecionado);

                                        // Se encontrou, define o usuário no estado
                                        if (usuarioSelecionado) {
                                            setUsuarioSolicitante(usuarioSelecionado);
                                            setValue('usuarioSolicitante', usuarioSelecionado);
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione o solicitante" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clientes.map((cliente) => (
                                            <SelectItem key={cliente.idUsuario} value={cliente.nomeCompleto}>
                                                {cliente.nomeCompleto}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="problemaRelatado">Problema Relatado</Label>
                                <Textarea id="problemaRelatado" placeholder="Descreva o problema relatado" className="min-h-[100px]"
                                    {...register('problemaRelatado', { required: true })}
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="solucaoProblema">Solução Aplicada</Label>
                                <Textarea id="solucaoProblema" placeholder="Descreva a solução aplicada" className="min-h-[100px]"
                                    {...register('solucaoProblema', { required: true })}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="pendencia">Pendência</Label>
                                <Textarea id="pendencia" placeholder="Descreva a pendência, se houver" className="min-h-[100px] min-w-[570px]"
                                    {...register('pendencia', { required: false })}
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="statusAtividade">Status</Label>
                            <Select
                                onValueChange={(dado) => {
                                    setStatusAtividade(dado);
                                    setValue('statusAtividade', dado);
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Em andamento">Em andamento</SelectItem>
                                    <SelectItem value="Finalizado">Finalizado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <DialogFooter className="flex justify-between items-center p-4">
                            <div className="flex-grow">
                                <Button
                                    type="button"
                                    className="bg-[#EA4335] hover:bg-[#75221B] text-white"
                                    onClick={onFechar}
                                >
                                    Cancelar
                                </Button>
                            </div>
                            <Button
                                type="submit"
                                className="bg-[#34A853] hover:bg-[#2E8B57] text-white"
                            >
                                Salvar
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RegistroAtividade; 