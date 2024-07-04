
import "dotenv/config";

import registrarEventosCadastro from "./eventos/cadastro.js";
import registrarEventosDocumento from "./eventos/documentos.js";
import registrarEventoInicio from "./eventos/inicio.js";
import registrarEventosLogin from "./eventos/login.js";
import io from "./servidor.js";
import autorizarUsuarios from "./middlewares/autorizarUsuario.js";

const nspUsuarios = io.of("/usuarios")

nspUsuarios.use(autorizarUsuarios)

nspUsuarios.on("connection", (socket) => {
  registrarEventoInicio(socket, nspUsuarios);
  registrarEventosDocumento(socket, nspUsuarios);
})

io.of("/").on("connection", (socket) => {
  registrarEventosCadastro(socket, io);
  registrarEventosLogin(socket, io);
  
});
