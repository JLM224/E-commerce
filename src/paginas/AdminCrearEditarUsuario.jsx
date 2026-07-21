import { Container, Form, Button, Spinner } from "react-bootstrap";
import clienteAxios from "../funcionesAuxiliares/configAxios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminEditarUsuario = () => {
  const navigate = useNavigate()
  const {id} = useParams()

  const [usuario, setUsuario] = useState({
    usuario: "",
    email: "",
    telefono: "",
  })

  const [loading, setLoading] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [errores, setErrores] = useState({})

  useEffect(() => {
    const obtenerUsuario = async () => {
      if (!id) {
        navigate("/Admin_Usuarios");
        return;
      }

      try {
        const res = await clienteAxios.get(`/usuarios/${id}`);

        setUsuario({
          usuario: res.data.usuario.usuario,
          email: res.data.usuario.email,
          telefono: res.data.usuario.telefono,
        })
      } catch (error) {console.error(error)
         Swal.fire({
           icon: "error",
           title: "Error",
           text: error?.response?.data?.mensaje || "No se pudo cargar el usuario"})
           
          navigate("/Admin_Usuarios")
      } finally {
        setLoading(false)
      }
    }
    obtenerUsuario()
  }, [id, navigate])

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errores[name]) {
      setErrores((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validar = () => {
    const err = {};

    if (!usuario.usuario.trim()) err.usuario = "Usuario requerido";
    if (!usuario.email.trim()) err.email = "Email requerido";
    if (!usuario.telefono.trim()) err.telefono = "Teléfono requerido";

    setErrores(err)

    return Object.keys(err).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validar()) return;

    try {
      setGuardando(true);

      await clienteAxios.put(`/usuarios/${id}`, {
        usuario: usuario.usuario.trim(),
        email: usuario.email.trim(),
        telefono: usuario.telefono.trim(),
      });

      await Swal.fire({
        icon: "success",
        title: "Usuario actualizado exitosamente",
        text: "En breve serás redirigido a la página de usuarios.",
      });

      navigate("/Admin_Usuarios");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.mensaje ||
          "Ocurrió un error al actualizar el usuario",
      });
    } finally {
      setGuardando(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="my-5" style={{ maxWidth: "500px" }}>
      <h3 className="text-center mb-4">Editar Usuario</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            name="usuario"
            value={usuario.usuario}
            onChange={handleChange}
            isInvalid={!!errores.usuario}
          />
          <Form.Control.Feedback type="invalid">
            {errores.usuario}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            isInvalid={!!errores.email}
          />
          <Form.Control.Feedback type="invalid">
            {errores.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            name="telefono"
            value={usuario.telefono}
            onChange={handleChange}
            isInvalid={!!errores.telefono}
          />
          <Form.Control.Feedback type="invalid">
            {errores.telefono}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          type="submit"
          variant="success"
          className="w-100"
          disabled={guardando}
        >
          {guardando ? (
            <>
              <Spinner
                animation="border"
                size="sm"
                className="me-2"
              />
              Guardando...
            </>
          ) : (
            "Guardar cambios"
          )}
        </Button>
      </Form>
    </Container>
  )
}

export default AdminEditarUsuario