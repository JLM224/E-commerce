import clienteAxios from "../../funcionesAuxiliares/ConfigAxios";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import swal from "sweetalert2";

const FormularioRecuperarContrasenia = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [errores, setErrores] = useState({});

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const handleChangeEmail = (ev) => {
    setEmail(ev.target.value);

    if (errores.email) {
      setErrores({
        ...errores,
        email: "",
      })
    }
  }

  const handleRecuperarContrasenia = async (ev) => {
    try {
      ev.preventDefault();

      const erroresFormulario = {};

      if (!email) {
        erroresFormulario.email = "Campo email vacío";
      } else if (!validarEmail(email)) {
        erroresFormulario.email = "Ingrese un email válido";
      }
      if (Object.keys(erroresFormulario).length > 0) {
        setErrores(erroresFormulario);
        return;
      }
      const respuesta = await clienteAxios.post(
        "/usuarios/recuperar-contrasenia",
        {
          email,
        }
      )

      swal.fire({
        icon: "success",
        title: respuesta.data.mensaje,
        text: "Revisá tu correo electrónico.",
      })
      setEmail("")
      setErrores({})

      setTimeout(() => {
        navigate("/")
      }, 1500)
    } catch (error) {
      swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.mensaje ||
          "No fue posible procesar la solicitud.",
      })
    }
  }
  return (
    <Container className="form-container">
      <h2>Recuperar contraseña</h2>

      <Form>
        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingrese su email"
            name="email"
            value={email}
            onChange={handleChangeEmail}
            className={
              errores.email
                ? "form-control is-invalid"
                : "form-control"
            }/>
          {errores.email && (
            <p className="text-danger">{errores.email}</p>
          )}
        </Form.Group>

        <div className="text-center">
          <Button
            variant="success"
            onClick={handleRecuperarContrasenia}>
            Enviar enlace de recuperación
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default FormularioRecuperarContrasenia