import jwt from "jsonwebtoken";

function autorizarUsuarios(socket, next) {
    const tokenJwt = socket.handshake.auth.token;

    try {
        const payloadToken = jwt.verify(tokenJwt, process.env.SECRET_JWT);
        socket.emit("autorizacao_sucesso", payloadToken)
        next()
    } catch(erro) {
        next(erro);
    }
    
}

export default autorizarUsuarios;