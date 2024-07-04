const conexoesDocumentos = [];

function encontrarConexao(documento, usuario) {
    return conexoesDocumentos.find((conexao) => {
        return (
            conexao.nomeDocumento === documento && conexao.nomeUsuario === usuario
        );
    });
}

function adicionarConexao(conexao) {
    conexoesDocumentos.push(conexao);
}

function obterUsuariosDocumento(nomeDocumento){
    return conexoesDocumentos
        .filter((conexao) => conexao.nomeDocumento === nomeDocumento )
        .map((conexao) => conexao.nomeUsuario)
}

function removerConexao(documento, usuario) {
    const indice = conexoesDocumentos.findIndex((conexao) => {
        return (
            conexao.nomeDocumento === documento && conexao.nomeUsuario === usuario
        );
    });

    if( indice !== -1 ) {
        conexoesDocumentos.splice(indice, 1)
    }
}

export {
    adicionarConexao,
    obterUsuariosDocumento,
    removerConexao,
    encontrarConexao
}