import { format } from "date-fns"
import { ptBR } from 'date-fns/locale'

export const formatarData = (data: string | number | Date) => {
    return format(new Date(data), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR });
};