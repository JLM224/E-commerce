import clienteAxios from "../../funcionesAuxiliares/configAxios";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./Tablas.css";

const Tabla_Productos = ({array, obtenerTodosLosProductos ,usuarioLogueado}) => {
  const eliminarProductoPorId = (idProducto) => {
    console.log(idProducto)
    if (usuarioLogueado) {
      Swal.fire({
        title: "Estas seguro de que quieres eliminar a este producto?",
        text: "Si lo borras no lo podras recuperar!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "SI, estoy seguro!",
        cancelButtonText: "No!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await clienteAxios.delete(`/productos/${idProducto}`)
          console.log(res)
          if (res.status === 200) {
            Swal.fire({
              title: "Producto eliminado con exito!",
              icon: "success"
            })
            obtenerTodosLosProductos()
          }
        }
      })
    }
  }
  const habilitarDesabilitarProductoPorId = (idProducto, estado) => {
    if (usuarioLogueado) {
      Swal.fire({
        title: `¿Estás seguro de ${estado === true ? "deshabilitar" : "habilitar"
          } el producto? `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!"
      }).then(async (result) => {
        if (result.isConfirmed) {

          const res = await clienteAxios.put(`/productos/cambiarEstado/${idProducto}`)
          if (res.status === 200) {
            Swal.fire({
              title: `${res.data.msg}`,
              icon: "success"
            })
            obtenerTodosLosProductos()
          }
        }
      })
    }
  }
  return (
    <>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Descripción</th>
          <th>Categoría</th>
          <th>Stock</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {array.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center">
              No hay productos para mostrar
            </td>
          </tr>
        ) : (
          array.map((element) => (
            <tr key={element._id}>
              <td>{element.nombre}</td>
              <td>{element.precio}$</td>
              <td>{element.descripcion}</td>
              <td>{element.categoria}</td>
              <td>{element.stock}</td>
              <td>
                <img src={element.imagen} alt={element.nombre} className="imagen-producto rounded" />
              </td>
              <td className="w-25">
                <Button variant={element.habilitado === true ? "info" : "success"}
                  onClick={() => 
                  habilitarDesabilitarProductoPorId(element._id, element.habilitado)}>
                  {element.habilitado === true ? "Deshabilitar" : "Habilitar"}
                </Button>
                <Link
                  className="btn btn-warning mx-2"
                  to={usuarioLogueado ? `/AdminCrearEditarProducto/${element._id}` : "#"}
                  >Editar
                </Link>
                <Button
                  variant="danger"
                  onClick={() => eliminarProductoPorId(element._id)}>Eliminar
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
    </>
  )
}

export default Tabla_Productos