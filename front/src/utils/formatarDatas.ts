import { format, ISOStringFormat, parse } from "date-fns"
import { da, ptBR } from 'date-fns/locale'
import { useState } from "react";

export const formatarData = (data: any) => {
    const dataBancoDeDados = parse(data, "dd-MM-yyyy'T'HH:mm", new Date());

    const dataFormatada = format(dataBancoDeDados, "dd/MM/yy HH:mm");

    return dataFormatada;
};

export const formatarDataDeAgora = (dataDeAgora: string, horaDeAgora: string) => {

    const dataISO = `${dataDeAgora}T${horaDeAgora}`; // Combina a data e a hora

    return dataISO;


};

