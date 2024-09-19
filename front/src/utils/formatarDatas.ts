import { format, parse } from "date-fns"
import { ptBR } from 'date-fns/locale'

export const formatarData = (data: any) => {
    const dataBancoDeDados = parse(data, "dd-MM-yyyy'T'HH:mm", new Date());

    const dataFormatada = format(dataBancoDeDados, "dd/MM/yy HH:mm");

    return dataFormatada;
};