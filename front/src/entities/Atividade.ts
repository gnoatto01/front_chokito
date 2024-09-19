declare namespace Atividade {

    type EntidadeAtividade = {
        idAtividade: number;
        nomeAtividade: string;
        usuarioResponsavel: Usuario.EntidadeUsuario; 
        usuarioSolicitante: Usuario.EntidadeUsuario; 
        dataInicioAtividade: string;
        problemaRelatado: string;
        solucaoProblema: string;
        statusAtividade: string;
        pendencia: string;
    }

    type EntidadeAtividadeEdicao = {
        idAtividade: number;
        nomeAtividade: string;
        problemaRelatado: string;
        solucaoProblema: string;
        statusAtividade: string;
        pendencia: string;
    }
}