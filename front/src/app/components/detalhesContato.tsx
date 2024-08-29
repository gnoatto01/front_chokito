"use client";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import { ArrowLeftIcon, ClockIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { AlertaDeSucesso } from "../../utils/alertas";
import { editarRegistro } from "@/utils/axiosService";

interface DadosContato {
    idContato: number;
    nomeContato: string;
    email: string;
    telefone: string;
    whatsapp: string;
    descricaoContato: string;
}

function DetalhesContato({ abrir, onFechar, dados }: PropriedadesDialogEdicao<DadosContato>) {

    const { register, handleSubmit, reset } = useForm<DadosContato>();
    const [errorMessage, setErrorMessage] = useState('');
    const [contatoSelecionado, setContatoSelecionado] = useState<DadosContato>();
    const [isSucesso, setIsSuccesso] = useState(false);
    const whatsappUrl = `https://wa.me/${dados?.whatsapp}?text=Olá ${dados?.nomeContato}...`;

    useEffect(() => {
        if (dados) {
            reset(dados); //se tem dados do contato seta os campos com o reset
        } else {
            reset(); //se nao tem, reseta todas as variaveis 
        }
    }, [dados, reset]);

    const editarContato: SubmitHandler<DadosContato> = async (dados) => {

        try {
            await editarRegistro<DadosContato>({ data: dados }, 'editarContato', dados.idContato);
            setErrorMessage('');
            setIsSuccesso(true);
            setTimeout(() => {
                setIsSuccesso(false);
                onFechar();
            }, 2000);
        } catch (error) {
            setErrorMessage('Erro ao editar dados do contato. Tente novamente.');

        }
    }

    if (!dados) return null;

    return (
        <Dialog open={abrir} onOpenChange={onFechar}>
            <DialogContent className="max-w-[800px] w-full">
                {isSucesso && <AlertaDeSucesso message="Registro alterado com sucesso." />}
                <DialogTitle>Detalhes</DialogTitle>
                <DialogDescription>Gerencie seu contato</DialogDescription>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
                    <div className="col-span-1 bg-card rounded-lg shadow-md overflow-hidden h-full">
                        <div className="bg-muted p-6 h-full">
                            <div className="flex items-center gap-4 h-full">
                                <Avatar className="h-16 w-16">
                                    <AvatarFallback>{dados.nomeContato.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="overflow-hidden">
                                    <h2 className="text-lg font-semibold">{dados.nomeContato}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 bg-card rounded-lg shadow-md overflow-hidden h-full">
                        <form onSubmit={handleSubmit(editarContato)}>
                            <div className="p-6 grid gap-4 h-full">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold">Detalhes do contato</h3>

                                    <div className="grid grid-cols-2 gap-4 text-muted-foreground">
                                        <div>
                                            <Label htmlFor="name">Nome</Label>
                                            <Input id="name"
                                                {...register('nomeContato', { required: true })} />
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email"
                                                {...register('email', { required: false })} />
                                        </div>
                                        <div>
                                            <div className="flex items-center">
                                                <Label htmlFor="phone" className="flex-1">Telefone</Label>
                                            </div>
                                            <Input id="phone" type="tel"
                                                {...register('telefone', { required: false })} />
                                            <div className="flex items-center mt-4">
                                                <Label htmlFor="whatsapp" className="flex-1">Whatsapp</Label>
                                                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                                    <FaWhatsapp size={24} className="text-lg ml-2 mb-2" />
                                                </a>
                                            </div>
                                            <Input id="whatsapp" type="text"
                                                {...register('whatsapp', { required: true })} />
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold">Sobre</h3>
                                    <div className="grid w-full gap- text-muted-foreground">
                                        <div>
                                            <Label htmlFor="obs">Observações</Label>
                                            <Textarea id="obs" rows={5}
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
            </DialogContent>
        </Dialog>
    );
}
export default DetalhesContato;
