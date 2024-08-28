
import { useState } from 'react';

import { faker } from '@faker-js/faker';

export function gerarDados() {
    const registros = [];

    for (let i = 0; i < 1000; i++) {
        registros.push({
            nomeContato: faker.lorem.words(),
            telefone: faker.lorem.words(),
            email: faker.lorem.words(),
            whatsapp: faker.lorem.words(),
            descricaoContato: faker.lorem.words(), 
        });
    }
    return registros;

}

export function baixarArquivoTxtDados(dados: any) {
    const json = JSON.stringify(dados, null, 2);
    const blob = new Blob([json], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registros.txt';
    a.click();
    window.URL.revokeObjectURL(url);
}


const GerarDados = () => {
    const [status, setStatus] = useState('');

    const gerarDadosFic = () => {
        try {
            const dados = gerarDados();
            baixarArquivoTxtDados(dados);
            setStatus('Arquivo gerado com sucesso!');
        } catch (error) {
            setStatus('Erro ao gerar dados.');
        }
    };

    return (
        <div>
            <button onClick={gerarDadosFic}>Gerar Dados e Baixar .txt</button>
            <p>{status}</p>
        </div>
    );
};

export default GerarDados;



