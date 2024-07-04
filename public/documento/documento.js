import {
  emitirExcluirDocumento,
  emitirTextoEditor,
  selecionarDocumento,
} from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");

const textoEditor = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");
const botaoExcluir = document.getElementById("excluir-documento");
const usuariosConectados = document.getElementById("usuarios-conectados");

tituloDocumento.textContent = nomeDocumento || "Documento sem título";

function tratarAutorizacaoSucesso(payloadToken){

  const { nome } = payloadToken
  selecionarDocumento({nomeDocumento, nome});
}

textoEditor.addEventListener("keyup", () => {
  emitirTextoEditor({
    texto: textoEditor.value,
    nomeDocumento,
  });
});

function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

botaoExcluir.addEventListener("click", () => {
  emitirExcluirDocumento(nomeDocumento);
});

function alertarERedirecionar(nome) {
  if (nome === nomeDocumento) {
    alert(`Documento ${nome} excluído!`);
    window.location.href = "/";
  }
}

function atualizarInterfaceUsuarios(usuarios) {
  usuariosConectados.innerHTML = "";

  usuarios.forEach((usuario) => {
    usuariosConectados.innerHTML += `
    <li class="list-group-item">${usuario}</li>
    `
  })
}
export { atualizaTextoEditor, alertarERedirecionar, tratarAutorizacaoSucesso, atualizarInterfaceUsuarios };
