import { cambiarTituloPagina } from "../funcionesAuxiliares/CambiarTituloPagina";
import { useEffect } from "react";

const Contacto = () => {
  useEffect(() => {
      cambiarTituloPagina("Contacto")
    }, []);
  return (
    <div>Contacto</div>
  )
}

export default Contacto