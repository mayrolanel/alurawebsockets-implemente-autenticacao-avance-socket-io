import criaHashESalSenha from "../utils/criaHashESalSenha.js";
import { usuariosColecao } from "./dbConnect.js";

function encontrarUsuario(nome) {
    const resultado = usuariosColecao.findOne({ nome });
    return resultado;
}
function cadastrarUsuario({ nome, senha }){
    const { hashSenha, salSenha } = criaHashESalSenha(senha);
    const resultado = usuariosColecao.insertOne({ nome, hashSenha, salSenha });
    return resultado;
}

export {
    cadastrarUsuario,
    encontrarUsuario
}