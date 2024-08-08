import { useState } from "react";
import { AlertaDeSucesso } from "./alertas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";

interface ModalRegistroContato {
    isAberto: boolean;
    onFechar: () => void;
}

interface DadosFormulario {
    nomeContato: string;
    email: string;
    telefone: string;
    whatsapp: string;
    descricacaoContato: string;
}

export function RegistrarContatoModal({ isAberto, onFechar }: ModalRegistroContato) {
    const { register, handleSubmit } = useForm<DadosFormulario>();
    const [isSucesso, setIsSucesso] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')


    if (!isAberto) {
        return null;
    }

    async function enviarRegistro(dados: DadosFormulario) {
        try {
            await axios.post("http://localhost:8080/naturalbit/api/registrar-contato", {
                nomeContato: dados.nomeContato,
                email: dados.email,
                telefone: dados.telefone,
                whatsapp: dados.whatsapp,
                descricaoContato: dados.descricacaoContato
            });

            setMensagemErro('');
            setIsSucesso(true);
            setTimeout(() => {
                setIsSucesso(false);
                onFechar();
            }, 2000);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                setMensagemErro('Usuário já existe. Tente novamente.');
            } else {
                setMensagemErro('Erro ao registrar. Tente novamente');
            }
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
                <h2 className="text-2xl font-bold mb-4">Registrar contato</h2>
                <form className="w-full mb-4" onSubmit={handleSubmit(enviarRegistro)}>
                    {isSucesso && <AlertaDeSucesso message="Registro salvo com sucesso" />}
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Nome contato*"
                            className="w-full"
                            autoComplete="off"
                            {...register('nomeContato', { required: true })}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="email"
                            placeholder="E-mail*"
                            className="w-full"
                            autoComplete="off"
                            {...register('email', { required: true })}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Telefone*"
                            className="w-full"
                            autoComplete="off"
                            {...register('telefone', { required: true })}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Whatsapp*"
                            className="w-full"
                            autoComplete="off"
                            {...register('whatsapp', { required: true })}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Descrição contato"
                            className="w-full"
                            autoComplete="off"
                            {...register('descricacaoContato', { required: true })}
                        />
                    </div>
                    {mensagemErro && (
                        <div className="mb-4 text-[#EA4335] text-sm">{mensagemErro}</div>
                    )}
                    <div>
                        <Button
                            type="submit"
                            className="w-full bg-[#34A853] text-white rounded-full hover:bg-[#2E8B57]"
                        >
                            Salvar
                        </Button>
                    </div>
                </form>
                <Button
                    className="w-full bg-[#EA4335] text-white rounded-full mt-2 hover:bg-[#75221B]"
                    onClick={onFechar}
                >
                    Cancelar
                </Button>
            </div>
        </div>
    );
}