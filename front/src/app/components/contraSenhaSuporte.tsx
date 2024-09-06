import { FaSearch, FaKey } from 'react-icons/fa';
import Layout from './layoutPrincipal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCallback, useState } from 'react';
import { Label } from '@/components/ui/label';
import { buscarTodos } from '@/utils/axiosService';


function BuscarContraSenha() {
    const [contraSenha, setContraSenha] = useState<string>("");
    const [isSucesso, setIsSucesso] = useState(false);

    const buscarSenha = useCallback(async () => {
        try {

            const resposta = await buscarTodos<string>("contraSenha/gerarContraSenha");
            if (resposta) {
                setContraSenha(resposta);
                setIsSucesso(true);

            }
            else {
                setContraSenha("");
                setIsSucesso(false);
            }

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setContraSenha("");
        }
    }, []);

    return (
        <Layout>
            <div className="p-6 sm:p-10 bg-gray-100 min-h-screen">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold text-black mb-6">Contra-senha do dia</h1>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="relative w-full max-w-md">
                            <FaKey className="absolute top-3 left-3 text-gray-500" />
                            <Input
                                type="text"
                                placeholder="Contra-senha do dia..."
                                value={contraSenha || ''}
                                className="pl-10 py-3 text-lg w-full"
                                readOnly
                            />
                        </div>
                        <Button
                            id='btn-buscar'
                            onClick={buscarSenha}
                            className="bg-green-600 hover:bg-green-500 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                            size="lg"
                        >
                            <FaKey className="text-white" />
                            <span>Gerar</span>
                        </Button>
                    </div>
                    {isSucesso && <Label className='text-green-500'> Com essa senha, você poderá acessar qualquer base no retaguarda até a virada do dia.</Label>}
                </div>
            </div>
        </Layout>
    );
}

export default BuscarContraSenha;
