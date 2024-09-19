declare namespace Contato {
    
    type EntidadeContato = {
        idContato: number;
        email: string;
        usuario: Usuario.EntidadeUsuario;
        nomeContato: string;
        telefone: string;
        whatsapp: string;
        descricaoContato: string;
    }
}
