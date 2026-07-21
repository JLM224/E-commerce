import { cambiarTituloPagina } from "../funcionesAuxiliares/CambiarTituloPagina";
import Formulario from "../componentes/formularios/Formulario";
import { Container } from "react-bootstrap";
import { useEffect } from "react";

const Iniciar_Sesion = () => {
  useEffect(() => {
        cambiarTituloPagina("Iniciar Sesion")
      }, [])
  return (
    <>
    <Container fluid>
      <Formulario Pagina="Iniciar_Sesion"/>
    </Container>
    </>
  )
}

export default Iniciar_Sesion