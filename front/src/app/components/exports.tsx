import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable';


declare module 'jspdf-autotable';

export const exportarParaExcel = (data: any[], nomeArquivo: string) => {

    // Cria uma nova planilha a partir dos dados
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Cria um novo workbook e adiciona a planilha
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");

    // Converte o workbook para um arquivo Excel
    XLSX.writeFile(workbook, `${nomeArquivo}.xlsx`);

}

export const exportarContatoParaPDF = (data: any[], nomeArquivo: string) => {
    const documento = new jsPDF();

    documento.autoTable({
        head: [['ID', 'Nome contato', 'E-mail', 'Telefone', 'Whatsapp', 'Descrição']],
        body: data.map(item => [item.idContato, item.nomeContato, item.email, item.telefone, item.whatsapp, item.descricaoContato]),
    });

    documento.save(`${nomeArquivo}.pdf`);
}