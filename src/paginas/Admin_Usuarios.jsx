import Tabla_Usuarios from "../componentes/tablas/Tabla_Usuarios";
import clienteAxios from "../funcionesAuxiliares/configAxios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
// import { Link } from "react-router-dom";

const Admin_Usuarios = () => {  
  const [usuarios, setUsuarios] = useState([])
  const usuarioLogueado = sessionStorage.getItem("token")

  useEffect(() => {
  const obtenerTodosLosUsuarios = async () => {
    try {
      const { data } = await clienteAxios.get("/usuarios")
      const soloUsuarios = data.usuarios.filter(
        usuario => usuario.rol === "usuario"
      )
      setUsuarios(soloUsuarios)
    } catch (error) {
      console.log("Error al obtener usuarios", error)
    }
  }
  obtenerTodosLosUsuarios()
}, [])

const eliminarUsuario = async (id) => {
  try {
    await clienteAxios.delete(`/usuarios/${id}`)
    setUsuarios(prev => prev.filter(user => user._id !== id))
  } catch (error) {
    console.log("Error al eliminar usuario", error)
    throw error
  }
}
  return (
    <>
      {usuarioLogueado && (
        <>
          <Container className="text-end my-5">
            {/* <Link className="btn btn-primary" to="/AdminCrearEditarUsuario">
              + Añadir Nuevo Usuario
            </Link> */}
          </Container>
          <Container fluid className="my-5">
            <div>
              <Tabla_Usuarios 
              array={usuarios}
              eliminarUsuario={eliminarUsuario} />
            </div>
          </Container>
        </>
      )}
    </>
  )
}

export default Admin_Usuarios