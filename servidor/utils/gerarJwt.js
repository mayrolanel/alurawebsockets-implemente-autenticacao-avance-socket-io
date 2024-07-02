import jwt from "jsonwebtoken";

function gerarJwt(payload){

    const tokenJwt = jwt.sign(payload, process.env.SECRET_JWT, {
        expiresIn: "1h"
    })

    return tokenJwt;

}

export default gerarJwt;