import { cambiarTituloPagina } from "../funcionesAuxiliares/CambiarTituloPagina";
import Formulario from "../componentes/formularios/Formulario";
import { Container } from "react-bootstrap";
import { useEffect } from "react";

const Registrarse = () => {
  useEffect(() => {
        cambiarTituloPagina("Registrarse")
      }, []);
  return (
    <>
    <Container fluid>
      <Formulario Pagina="Registrarse" />
    </Container>
    </>
  )
}

export default Registrarse