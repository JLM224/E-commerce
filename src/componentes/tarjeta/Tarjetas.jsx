import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import "./Tarjetas.css";

const baseURL = import.meta.env.VITE_URL_BACKEND;

const Tarjetas = ({ imagen, descripcion, id, nombre, precio }) => {
  return (
    <Card>
      <Card.Img variant="top"
        src={ imagen?.includes("public") ? `${baseURL}/public/${imagen}` : imagen }/>

      <Card.Body>
        <Card.Title className="text-truncate">{nombre}</Card.Title>

        <Card.Text>${precio}</Card.Text>

        <Card.Text className="text-truncate">{descripcion}</Card.Text>

        <Container className="text-center">
          <Link to={`/DetallesDelProducto/${id}`} className="btn btn-primary">
            Ver Más
          </Link>
        </Container>
      </Card.Body>
    </Card>
  )
}

export default Tarjetas