
import registrarEventosCadastro from "./eventos/cadastro.js";
import registrarEventosDocumento from "./eventos/documentos.js";
import registrarEventoInicio from "./eventos/inicio.js";
import io from "./servidor.js";

io.on("connection", (socket) => {
  
  registrarEventoInicio(socket, io)
  registrarEventosDocumento(socket, io)
  registrarEventosCadastro(socket, io)
});
