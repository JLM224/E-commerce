import clienteAxios from "../funcionesAuxiliares/ConfigAxios";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const DetallesDelProducto = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [producto, setProducto] = useState({})

  const obtenerProductoPorId = async () => {
    try {
      const res = await clienteAxios.get(`/productos/${id}`)
      setProducto(res.data.producto)
    } catch (error) {
      console.log(error);
    }
  }

  const agregarProductoAlCarrito = async (ev) => {
    ev.preventDefault()

    const usuarioLogueado = sessionStorage.getItem("token") || null;

    if (!usuarioLogueado) {
      Swal.fire({
        icon: "info",
        title: "Debes iniciar sesión",
        text: "Inicia sesión para agregar el producto al carrito."
      })

      setTimeout(() => {
        navigate("/Iniciar_Sesion");
      }, 800)

      return;
    }

    try {
      const res = await clienteAxios.put(
        `/carritos/agregarProducto/${producto._id}`
      )

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Producto agregado al carrito"
        })
      }

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response?.data?.msg || "Ocurrió un error"
      })
    }
  }

  const comprarProducto = (ev) => {
    ev.preventDefault();

    const usuarioLogueado = sessionStorage.getItem("token") || null;

    if (!usuarioLogueado) {
      Swal.fire({
        icon: "info",
        title: "Debes iniciar sesión",
        text: "Inicia sesión para realizar la compra."
      })

      setTimeout(() => {
        navigate("/Iniciar_Sesion");
      }, 800)

      return;
    }

    Swal.fire({
      icon: "success",
      title: "Función de compra en desarrollo"
    })
  }

  useEffect(() => {
    obtenerProductoPorId()
  }, [])

  return (
    <Container className="my-5">
      <Row>
        <Col sm={12} md={6} className="producto-imagen text-center">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid rounded"/>
        </Col>

        <Col sm={12} md={6}>
          <h2>{producto.nombre}</h2>

          <h3 className="text-success mb-3">
            ${producto.precio}
          </h3>

          <p>{producto.descripcion}</p>

          <Button
            variant="warning"
            className="me-2"
            onClick={agregarProductoAlCarrito}>
            Añadir al carrito
          </Button>

          <Button
            variant="success"
            onClick={comprarProducto}>
            Comprar
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default DetallesDelProducto