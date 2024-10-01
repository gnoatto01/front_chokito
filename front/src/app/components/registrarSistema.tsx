import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertaDeSucesso } from "@/utils/alertas";
import { criarRegistro } from "@/utils/axiosService";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function RegistroSistema({ abrir, onFechar }: PropriedadesDialog) {
    const [isSuccesso, setIsSuccesso] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<SistemaNameSpace.EntidadeSistema>();
    const [sistemaAtivo, setSistemaAtivo] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    const registrarSistema: SubmitHandler<SistemaNameSpace.EntidadeSistema> = async (dados) => {

        try {
            await criarRegistro<SistemaNameSpace.EntidadeSistema>({ data: dados }, 'registrarSistema');
            setErrorMessage('');
            setIsSuccesso(true);
            setTimeout(() => {
                setIsSuccesso(false);
                onFechar();
            }, 2000);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return (
        <Dialog open={abrir} onOpenChange={onFechar}>
            <DialogContent className="max-w-[800px] w-full">
                <DialogTitle>Cadastro de novo sistema</DialogTitle>
                <DialogDescription>Realize seu cadastro</DialogDescription>
                {isSuccesso && <AlertaDeSucesso message="Registro salvo com sucesso" />}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                    <div className="bg-card rounded-lg shadow-md overflow-hidden h-full">
                        <div className="p-6 grid gap-4 h-full">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">Novo sistema</h3>
                                <form className="grid gap-4 text-muted-foreground" onSubmit={handleSubmit(registrarSistema)}>
                                    <div className="relative">
                                        <Label htmlFor="nomeSistema">Nome do sistema*</Label>
                                        <Input
                                            id="nomeSistema"
                                            placeholder="Insira o nome do sistema"
                                            autoComplete="off"
                                            {...register('nomeSistema', { required: true })}
                                        />
                                        {errors.nomeSistema && <span className="text-[#EA4335]">O nome do sistema é obrigatório</span>}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="sistemaAtivo">Ativo</Label>
                                        <Select
                                            onValueChange={(dado) => {
                                                setSistemaAtivo(dado);
                                                setValue('sistemaAtivo', dado);
                                            }}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Sistema ativo.." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Ativo">Ativo</SelectItem>
                                                <SelectItem value="Inativo">Inativo</SelectItem>
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
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
export default RegistroSistema; 