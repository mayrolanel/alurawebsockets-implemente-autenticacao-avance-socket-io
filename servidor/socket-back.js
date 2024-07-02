
import "dotenv/config";

import registrarEventosCadastro from "./eventos/cadastro.js";
import registrarEventosDocumento from "./eventos/documentos.js";
import registrarEventoInicio from "./eventos/inicio.js";
import registrarEventosLogin from "./eventos/login.js";
import io from "./servidor.js";

io.on("connection", (socket) => {
  registrarEventosCadastro(socket, io);
  registrarEventosLogin(socket, io);
  registrarEventoInicio(socket, io);
  registrarEventosDocumento(socket, io);
});
