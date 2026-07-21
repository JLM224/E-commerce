import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Tabla_Usuarios = ({ array, eliminarUsuario }) => {
  const eliminarUsuarioPorId = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Este usuario será eliminado permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    })
    if (!result.isConfirmed) return;

    try {
      await eliminarUsuario(id)
      Swal.fire({
        title: "Eliminado",
        text: "El usuario fue eliminado correctamente",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      })
    } catch {
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar el usuario",
        icon: "error",
      });
    }
  }
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {array.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center">
              No hay usuarios
            </td>
          </tr>
        ) : (
          array.map((item) => (
            <tr key={item._id}>
              <td>{item.usuario}</td>
              <td>{item.email}</td>
              <td>{item.telefono}</td>

              <td className="w-25">
                <Link
                  className="btn btn-warning mx-2"
                  to={`/AdminCrearEditarUsuario/${item._id}`}>Editar
                </Link>
                <Button
                  variant="danger"
                  onClick={() => eliminarUsuarioPorId(item._id)}>Eliminar
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  )
}

export default Tabla_Usuarios