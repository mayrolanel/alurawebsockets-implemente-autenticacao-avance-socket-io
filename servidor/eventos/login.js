import { encontrarUsuario } from "../db/usuariosDb.js";
import autenticarUsuario from "../utils/autenticarUsuario.js";
import gerarJwt from "../utils/gerarJwt.js";

function registrarEventosLogin(socket, io) {
    socket.on("autenticar_usuario", async ({ nome, senha }) => {
        const usuario = await encontrarUsuario(nome);

        if (usuario) {
            const autenticado = autenticarUsuario(usuario, senha)

            if (autenticado) {
                const tokenJwt = gerarJwt({ nome });

                console.log('jwt: ', tokenJwt)

                socket.emit("autenticacao_sucesso", tokenJwt)
            } else {
                socket.emit("autenticacao_erro")
            }
        } else{
            socket.emit("usuario_nao_encontrado")
        }


    })
}

export default registrarEventosLogin;