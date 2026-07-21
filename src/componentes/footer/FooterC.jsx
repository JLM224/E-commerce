import LinksContacto from "../mediosDeComunicacion/LinksContacto";
import { Col, Container, Row } from "react-bootstrap"
import Mapa from "../mediosDeComunicacion/Mapa";
import './Footer.css'

const FooterC = () => {
function obtenerAnioActual() {
  const fecha = new Date();
  return fecha.getFullYear();
}
  return (
    <>
    <Container fluid className="footer">
        <Row className="text-center g-2 footer-1">
          <Col xs="12" md="4" >
          <img src="/logo.jpeg" alt="Logo" className="logo"/>
          </Col>
          <Col xs="12" md="4" className="d-flex flex-column align-items-center justify-content-center">
          <LinksContacto/>
          </Col>
          <Col xs="12" md="4" className="d-flex flex-column align-items-center justify-content-center">
          <Mapa/>
          </Col>
        </Row>
        <Row>
        <Col xs="12" className="d-flex justify-content-center copyright"
         >
          <p className="copyright-text">
            &copy; {obtenerAnioActual()} 
            Comercio hermanos Canseco & Medina
          </p>
        </Col>
        </Row>
    </Container>
    </>
  )
}

export default FooterC