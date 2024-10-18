import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { ClassAttributes, InputHTMLAttributes, JSX, useState } from "react";
import { AlertaDeSucesso } from "../../utils/alertas";
import InputMask from 'react-input-mask';
import { criarRegistro } from "@/utils/axiosService";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FaWhatsapp } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";



function RegistroContato({ abrir, onFechar }: PropriedadesDialog) {
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccesso, setIsSuccesso] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<Contato.EntidadeContato>();
    const [tipoWhatsapp, setTipoWhatsapp] = useState<'Celular' | 'Fixo'>('Celular');


    const registroContato: SubmitHandler<Contato.EntidadeContato> = async (dados) => {
        const whatsappSemMascara = dados.whatsapp.replace(/\D/g, '');
        try {

            await criarRegistro<Contato.EntidadeContato>({ data: dados }, 'registrarContato');
            setErrorMessage('');
            setIsSuccesso(true);
            setTimeout(() => {
                setIsSuccesso(false);
                reset();
                onFechar();
            }, 2000);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                setErrorMessage('Usuário já existe. Tente novamente.');
            } else {
                setErrorMessage('Erro ao registrar. Tente novamente.');
            }
        }
    }

    if (!abrir) return null;

    const mask = tipoWhatsapp === 'Celular' ? "(99) 99999-9999" : "(99) 9999-9999"; //verifica se é celular ou fixo e aplica a mascara

    return (
        <Dialog open={abrir} onOpenChange={onFechar}>
            <DialogContent className="max-w-[800px] w-full">
                {isSuccesso && <AlertaDeSucesso message="Registro alterado com sucesso." />}
                <DialogTitle>Cadastro</DialogTitle>
                <DialogDescription>Cadastre seu contato</DialogDescription>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
                    <div className="col-span-1 bg-card rounded-lg shadow-md overflow-hidden h-full">
                        <div className="bg-muted p-6 h-full">
                            <div className="flex items-center gap-4 h-full">
                                <Avatar className="h-16 w-16">
                                    <AvatarFallback>NC</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 bg-card rounded-lg shadow-md overflow-hidden h-full">
                        <form onSubmit={handleSubmit(registroContato)}>
                            <div className="p-6 grid gap-4 h-full">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold">Detalhes do contato</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                                        <div>
                                            <Label htmlFor="nomeContato">Nome</Label>
                                            <Input autoComplete="off" id="nomeContato" {...register('nomeContato', { required: true })} />

                                            <Label htmlFor="telefone" className="mt-4">Telefone</Label>
                                            <Input autoComplete="off" id="telefone" type="tel" {...register('telefone', { required: false })} />
                                        </div>

                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input autoComplete="off" id="email" type="email" {...register('email', { required: false })} />

                                            <Label htmlFor="whatsapp" className="mt-4">Whatsapp</Label>
                                            <div className="flex items-center">
                                                <Input autoComplete="off" id="whatsapp" type="text" {...register('whatsapp', { required: false })} />
                                                <a rel="noopener noreferrer" className="ml-2">
                                                    <FaWhatsapp size={24} className="text-lg" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Separator />

                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold">Sobre</h3>
                                    <div className="grid w-full gap- text-muted-foreground">
                                        <div>
                                            <Label htmlFor="site">Site</Label>
                                            <Textarea autoComplete="off" id="site" rows={1}
                                                {...register('site', { required: false })} />
                                        </div>
                                        <div>
                                            <Label htmlFor="obs">Observações</Label>
                                            <Textarea autoComplete="off" id="obs" rows={5}
                                                {...register('descricaoContato', { required: false })} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button onClick={onFechar} className="bg-[#EA4335] hover:bg-[#75221B]">Voltar</Button>
                                    <Button type="submit" className="bg-[#34A853] hover:bg-[#2E8B57]">Salvar alterações</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {errorMessage && (
                    <div className="mb-4 text-[#EA4335] text-sm">
                        {errorMessage}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default RegistroContato;
