import { cambiarTituloPagina } from "../funcionesAuxiliares/CambiarTituloPagina";
import clienteAxios from "../funcionesAuxiliares/configAxios";
import Tarjetas from "../componentes/tarjeta/Tarjetas";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

const Pagina_Principal = () => {
  useEffect(() => {
    cambiarTituloPagina("Pagina Principal")
  }, [])

  const [productos, setProductos] = useState([])
  // const [contador, setContador] = useState(0)

  const obtenerProductosHabilitados = async () => {
    try {
      const res = await clienteAxios.get("/productos/habilitados")
      setProductos(res.data.productos)
    } catch (error) {
      console.log(error)
    }
  }


  // const sumarContador = () => {
  //   setContador(contador + 1)
  // }

  useEffect(() => {
    obtenerProductosHabilitados()
  }, [])
  return (
    <Container fluid className="my-5">
      <Row className="g-4">
        {productos.map((producto) => (
        <Col key={producto._id} xs={12} sm={6} md={4} lg={3}>
          <Tarjetas
            id={producto._id}
            nombre={producto.nombre}
            precio={producto.precio}
            descripcion={producto.descripcion}
            imagen={producto.imagen}/>
        </Col>))}
      </Row>
    </Container>
  )
}

export default Pagina_Principal