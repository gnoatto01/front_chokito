import axios, { AxiosResponse } from 'axios';
import { parseCookies } from 'nookies';


interface ParametrosBuscaPaginada<T> {
    content: T[];
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

interface ParametrosCrudRegistros {
    data?: Record<string, any>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

//#################BUSCA TODOS#################
export const buscarTodos = async<T>(linkRequisicao: string): Promise<T> => {
    const cookies = parseCookies();
    const accessToken = cookies['naturalbit.token'];

    if (!accessToken) {
        throw new Error('Você não está autenticado');
    }

    try {
        const resposta: AxiosResponse<T> = await axios.get(`${baseUrl}/${linkRequisicao}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return resposta.data;

    } catch (error) {
        console.error("Erro na busca de dados", error);
        throw error;
    }
}

//#################BUSCA PAGINADO#################
export const buscarPaginado = async <T>(pagina: number, tamanho: number, linkRequisicao: string): Promise<ParametrosBuscaPaginada<T>> => {
    const cookies = parseCookies();
    const accessToken = cookies['naturalbit.token'];

    if (!accessToken) {
        throw new Error('Você não está autenticado');
    }

    try {
        const resposta: AxiosResponse<ParametrosBuscaPaginada<T>> = await axios.get(`${baseUrl}/${linkRequisicao}`, {
            params: { pagina, tamanho },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return resposta.data;
    } catch (error) {
        console.error("Erro na busca de dados paginada", error);
        throw error;
    }
}


export const criarRegistro = async <T>({ data }: ParametrosCrudRegistros, linkRequisicao: string) => {
    const cookies = parseCookies();
    const accessToken = cookies['naturalbit.token'];

    if (!accessToken) {
        throw new Error('Você não está autenticado');
    }

    try {
        await axios.post<T>(`${baseUrl}/${linkRequisicao}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
        );
    } catch (error) {
        console.error("Erro na criação do registro", error);
        throw error;
    }
};

export const editarRegistro = async <T>({ data }: ParametrosCrudRegistros, linkRequisicao: string, idRegistro: number) => {
    const cookies = parseCookies();
    const accessToken = cookies['naturalbit.token'];

    if (!accessToken) {
        throw new Error('Você não está autenticado');
    }

    try {
        await axios.put<T>(
            `${baseUrl}/${linkRequisicao}/${idRegistro}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

    } catch (error) {
        console.error("Erro na edição do registro", error);
        throw error;
    }
};

export const excluirRegistro = async <T>(linkRequisicao: string, idRegistro: number | string) => {
    const cookies = parseCookies();
    const accessToken = cookies['naturalbit.token'];

    if (!accessToken) {
        throw new Error('Você não está autenticado');
    }

    try {
        await axios.delete<T>(`${baseUrl}/${linkRequisicao}/${idRegistro}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
    } catch (error) {
        console.error("Erro na exclusão do registro", error);
        throw error;
    }
}


