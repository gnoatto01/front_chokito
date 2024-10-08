import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { buscarTodos, editarRegistro } from "@/utils/axiosService"
import { SubmitHandler, useForm } from "react-hook-form"
import { useCallback, useEffect, useState } from "react"
import { AlertaDeSucesso } from "@/utils/alertas"
import {formatarData } from "@/utils/formatarDatas"


function DetalhesAtividade({ abrir, onFechar, dados }: PropriedadesDialogEdicao<Atividade.EntidadeAtividade>) {
    const [errorMessage, setErrorMessage] = useState('');
    const [isSucesso, setIsSucesso] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<Atividade.EntidadeAtividadeEdicao>();

    const [statusAtividade, setStatusAtividade] = useState<string | null>(null);


    useEffect(() => {
        if (dados) {
            reset(dados);
        } else {
            reset();
        }
    }, [dados, reset]);

    const editarAtividade: SubmitHandler<Atividade.EntidadeAtividadeEdicao> = async (dados) => {

        try {
            await editarRegistro<Atividade.EntidadeAtividadeEdicao>({ data: dados }, 'editarAtividade', dados.idAtividade);
            setErrorMessage('');
            setIsSucesso(true);
            setTimeout(() => {
                setIsSucesso(false);
                onFechar();
            }, 2000);
        } catch (error) {
            setErrorMessage('Erro ao editar dados da atividade. Tente novamente.');

        }
    }

    if (!dados) {
        return null;
    }
    return (
        <Dialog open={abrir} onOpenChange={onFechar}>
            <DialogContent className="w-full max-w-2xl">
                <DialogTitle>Detalhes da atividade</DialogTitle>
                <DialogDescription>Realize a edição da atividade</DialogDescription>
                {isSucesso && <AlertaDeSucesso message="Registro salvo com sucesso" />}
                <div className="p-6 bg-background rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6 text-primary">Detalhes da atividade</h1>
                    <form className="space-y-4" onSubmit={handleSubmit(editarAtividade)}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="nomeAtividade">Nome da atividade</Label>
                                <Input autoComplete="off" placeholder="Digite o nome da tarefa"
                                    {...register('nomeAtividade', { required: true })} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="usuarioResponsavel">Responsável</Label>
                                <Input
                                    type="text"
                                    value={dados.usuarioResponsavel?.nomeCompleto || ''}
                                    readOnly
                                    className="w-full bg-gray-100 text-gray-500 cursor-not-allowed"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="dataInicioAtividade">Data de Início</Label>
                                <Input
                                    type="text"
                                    value={formatarData(dados.dataInicioAtividade) || ''}
                                    readOnly
                                    className="w-full bg-gray-100 text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="tempoGasto">Tempo gasto</Label>
                                <Input id="tempoGasto" type="text"
                                    defaultValue={dados.tempoGasto == null ? '' : dados.tempoGasto}
                                    {...register('tempoGasto', { required: false })} />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="usuarioSolicitante">Solicitante</Label>
                                <Input
                                    type="text"
                                    value={dados.usuarioSolicitante?.nomeCompleto || ''}
                                    readOnly
                                    className="w-full bg-gray-100 text-gray-500 cursor-not-allowed"
                                />
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
                                defaultValue={dados.statusAtividade}
                                onValueChange={(dado) => {
                                    setStatusAtividade(dado); // Atualiza o estado com o novo valor
                                    setValue('statusAtividade', dado); // Atualiza o valor no formulário ou banco de dados
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

export default DetalhesAtividade; 