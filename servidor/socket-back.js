
import registrarEventosDocumento from "./eventos/registrarEventosDocumentos.js";
import registrarEventoInicio from "./eventos/registrarEventosInicio.js";
import io from "./servidor.js";

io.on("connection", (socket) => {
  
  registrarEventoInicio(socket, io)
  registrarEventosDocumento(socket, io)
  
});
