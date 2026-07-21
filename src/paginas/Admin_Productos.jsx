import Tabla_Productos from '../componentes/tablas/Tabla_Productos'
import clienteAxios from '../funcionesAuxiliares/configAxios'
import { Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

const AdminProductsPage = () => {
  const [productos, setProductos] = useState([])
  const usuarioLogueado = sessionStorage.getItem("token") || null

  const obtenerTodosLosProductos = async () => {
    const productos = await clienteAxios.get("/productos")
    setProductos(productos.data.productos)
  }

  useEffect(() => {
    obtenerTodosLosProductos()
  }, [])
  return (
    <>
      {
        usuarioLogueado &&
        <>
          <Container fluid className='text-end my-5'>
            <Link to="/AdminCrearEditarProducto" className="btn btn-primary">
              + Añadir Nuevo Producto
            </Link>
          </Container>
          <Container fluid className='my-5'>
            <Tabla_Productos array={productos} obtenerTodosLosProductos={obtenerTodosLosProductos} 
            usuarioLogueado={usuarioLogueado} />
          </Container>
        </>
      }
    </>
  )
}

export default AdminProductsPage