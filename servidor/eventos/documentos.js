import { atualizaDocumento, encontrarDocumento, excluirDocumento } from "../db/documentosDb.js";
import { adicionarConexao, encontrarConexao, obterUsuariosDocumento, removerConexao } from "../utils/conexoesDocumento.js";

function registrarEventosDocumento(socket, io) {
    socket.on("selecionar_documento", async ({ nomeDocumento, nome }, devolverTexto) => {


        const documento = await encontrarDocumento(nomeDocumento);

        if (documento) {
            const conexaoEncontrada = encontrarConexao(nomeDocumento, nome);

            if (!conexaoEncontrada) {
                socket.join(nomeDocumento);
                adicionarConexao({ nomeDocumento, nomeUsuario: nome })

                socket.data = {
                    usuarioEntrou: true,
                };

                const usuarios = obterUsuariosDocumento(nomeDocumento)
                io.to(nomeDocumento).emit("usuarios_no_documento", usuarios)
                devolverTexto(documento.texto);
            } else {
                socket.emit("usuario_no_documento")
            }

        }

        socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
            const atualizacao = await atualizaDocumento(nomeDocumento, texto);

            if (atualizacao.modifiedCount) {
                socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
            }
        });

        socket.on("excluir_documento", async (nome) => {
            const resultado = await excluirDocumento(nome);

            if (resultado.deletedCount) {
                io.emit("excluir_documento_sucesso", nome);
            }
        });

        socket.on("disconnect", () => {

            if (socket.data.usuarioEntrou) {
                removerConexao(nomeDocumento, nome)

                const usuarios = obterUsuariosDocumento(nomeDocumento)
                io.to(nomeDocumento).emit("usuarios_no_documento", usuarios)
            }

        })
    });

}

export default registrarEventosDocumento;