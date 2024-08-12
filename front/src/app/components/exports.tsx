import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
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

    const logoBase64 = 'data:image/jpeg;base64,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';

    const documento = new jsPDF();
    documento.setFont("Segoi-Ui");

    // Adiciona uma imagem de cabeçalho (logo)
    documento.addImage(logoBase64, 'JPEG', 10, 10, 30, 12); // x, y, largura, altura

    // Adiciona um título
    documento.setFontSize(16);
    documento.setTextColor(0, 0, 0);
    documento.text('NaturalBit Tecnologia', 45, 12); // Ajuste de posição

    // Adiciona um subtítulo ou descrição
    documento.setFontSize(10);
    documento.setTextColor(0,0,0);
    documento.text('CNPJ:', 45, 17);
    

    documento.setTextColor(100);
    documento.text('29299243000154',55,17); 

    documento.setFontSize(14);
    documento.setTextColor(0,0,0); 
    documento.text('Relatório de contatos',14,37)

    

    // Adiciona a tabela com os dados de contato
    documento.autoTable({
        startY: 40, // Posição inicial da tabela
        head: [['ID', 'Nome contato', 'E-mail', 'Telefone', 'Whatsapp', 'Descrição']],
        body: data.map(item => [
            item.idContato,
            item.nomeContato,
            item.email,
            item.telefone,
            item.whatsapp,
            item.descricaoContato
        ]),
        headStyles: {
            fillColor: [255, 255, 255], // Cabeçalho sem fundo
            textColor: [0, 0, 0], // Cor do texto preta
            lineWidth: 0, // Remove as bordas do cabeçalho
        },
        styles: {
            lineColor: [100], // Cor das linhas horizontais
            lineWidth: 0.5, // Largura das linhas horizontais
            halign: 'center', // Alinhamento horizontal centralizado
            valign: 'middle', // Alinhamento vertical centralizado
            cellPadding: 2, // Espaçamento interno das células
        },
        tableLineColor: [100], // Cor das linhas horizontais
        tableLineWidth: 0.5, // Largura das linhas horizontais
        theme: 'plain', // Remove as bordas da tabela, mantendo apenas as linhas horizontais
        margin: { top: 10 },
        // Adicione outras opções conforme necessário
    });


    // Salva o PDF com o nome especificado
    documento.save(`${nomeArquivo}.pdf`);
}
