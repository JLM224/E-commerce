import { cambiarTituloPagina } from "../funcionesAuxiliares/CambiarTituloPagina";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Error404 = () => {
  useEffect(() => {
    cambiarTituloPagina("Error 404")
  }, []);
  return (
    <Container
    className="text-center my-5 pagina404"
    data-aos="fade-up"
    data-aos-duration="800">
      <h1 className="display-3">Error 404</h1>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, pero la página que buscas no existe.</p>
      <Button
      className="btn-personalizado" 
      as={Link} 
      to="/"
      data-aos="zoom-in"
      data-aos-delay="400">
         Volver al inicio 
      </Button>
    </Container>
  )
}

export default Error404