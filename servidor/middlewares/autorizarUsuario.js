import jwt from "jsonwebtoken";

function autorizarUsuarios(socket, next) {
    const tokenJwt = socket.handshake.auth.token;

    try {
        jwt.verify(tokenJwt, process.env.SECRET_JWT);
        next()
    } catch(erro) {
        next(erro);
    }
    
}

export default autorizarUsuarios;