import 
FormularioRecuperarContrasenia from "../componentes/formularios/FormularioRecuperarContrasenia";
import { cambiarTituloPagina } from "../funcionesAuxiliares/CambiarTituloPagina";
import { useEffect } from "react";

const Recuperar_Contrasenia = () => {
  useEffect(() => {
      cambiarTituloPagina("Recuperar Contraseña")
    }, []);
  return (
    <FormularioRecuperarContrasenia/>
  )
}

export default Recuperar_Contrasenia