import FormularioRestablecerContrasenia 
from "../componentes/formularios/FormularioRestablecerContrasenia";
import { cambiarTituloPagina } from "../funcionesAuxiliares/CambiarTituloPagina";
import { useEffect } from "react";

const Restablecer_Contrasenia = () => {
  useEffect(() => {
        cambiarTituloPagina("Restablecer Contraseña")
      }, []);
  return (
    <FormularioRestablecerContrasenia/>
  )
}

export default Restablecer_Contrasenia