import { Dialog, DialogContent, DialogFooter, DialogClose, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { AlertaDeSucesso } from "./alertas";
import ReactInputMask from "react-input-mask";


interface DadosContato {
    nomeContato: string;
    email: string;
    telefone: string;
    whatsapp: string;
    descricaoContato: string;
}

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
}

//TODO: colocar regex para whatsapp 

function RegistroContato({ isOpen, onClose }: DialogProps) {
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccesso, setIsSuccesso] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<DadosContato>();

    const registroContato: SubmitHandler<DadosContato> = async (dados) => {

        try {
            await axios.post('http://localhost:8080/suportebit/registrar-contato', {
                nomeContato: dados.nomeContato,
                email: dados.email,
                telefone: dados.telefone,
                whatsapp: dados.whatsapp,
                descricaoContato: dados.descricaoContato
            });

            setErrorMessage('');
            setIsSuccesso(true);
            setTimeout(() => {
                setIsSuccesso(false);
                onClose();
            }, 2000);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                setErrorMessage('Usuário já existe. Tente novamente.');
            } else {
                setErrorMessage('Erro ao registrar. Tente novamente.');
            }
        }
    }

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[800px] w-full">
                <DialogTitle>Cadastro de novos contatos</DialogTitle>
                <DialogDescription>Realize seu cadastro</DialogDescription>
                {isSuccesso && <AlertaDeSucesso message="Registro salvo com sucesso" />}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                    <div className="bg-card rounded-lg shadow-md overflow-hidden h-full">
                        <div className="p-6 grid gap-4 h-full">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">Novo contato</h3>
                                <form className="grid gap-4 text-muted-foreground" onSubmit={handleSubmit(registroContato)}>
                                    <div className="relative">
                                        <Label htmlFor="nomeContato">Nome contato*</Label>
                                        <Input
                                            id="nomeContato"
                                            placeholder="Insira o nome do contato"
                                            autoComplete="off"
                                            {...register('nomeContato', { required: true })}
                                        />
                                        {errors.nomeContato && <span className="text-[#EA4335]">O nome do contato é obrigatório</span>}
                                    </div>
                                    <div className="relative">
                                        <Label htmlFor="email">E-mail*</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Insira o e-mail do contato"
                                            autoComplete="off"
                                            {...register('email', { required: true })}
                                        />
                                        {errors.email && <span className="text-[#EA4335]">O e-mail do contato é obrigatório.</span>}
                                    </div>
                                    <div className="relative">
                                        <Label htmlFor="telefone">Telefone</Label>
                                        <Input
                                            id="telefone"
                                            placeholder="Insira o telefone do usuário"
                                            autoComplete="off"
                                            {...register('telefone', { required: false })}
                                        />
                                    </div>
                                    <div className="relative">
                                        <Label htmlFor="whatsapp">Whatsapp*</Label>

                                        <Input
                                            id="whatsapp"
                                            placeholder="Insira o Whatsapp do contato"
                                            autoComplete="off"
                                            {...register('whatsapp', {
                                                required: true
                                            })}
                                        />
                                        {errors.whatsapp && <span className="text-[#EA4335]">O Whatsapp do contato é obrigatório.</span>}
                                    </div>
                                    <div className="relative">
                                        <Label htmlFor="descricaoContato">Descrição</Label>
                                        <Input
                                            id="descricaoContato"
                                            placeholder="Insira uma descrição sobre o contato"
                                            autoComplete="off"
                                            {...register('descricaoContato', { required: false })}
                                        />
                                    </div>
                                    <DialogFooter className="flex justify-between items-center p-4">
                                        <div className="flex-grow">
                                            <Button
                                                type="button"
                                                className="bg-[#EA4335] hover:bg-[#75221B] text-white"
                                                onClick={onClose}
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

export default RegistroContato;
