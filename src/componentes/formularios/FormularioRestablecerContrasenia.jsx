import clienteAxios from "../../funcionesAuxiliares/configAxios"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Container } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useState } from "react"
import swal from "sweetalert2"

const FormularioRestablecerContrasenia = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const token = searchParams.get("token")

  const [datos, setDatos] = useState({
    contrasenia: "",
    repContrasenia: ""
  })

  const [errores, setErrores] = useState({})

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })

    if (errores[e.target.name]) {
      setErrores({
        ...errores,
        [e.target.name]: ""
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const nuevosErrores = {}

    if (!datos.contrasenia.trim()) {
      nuevosErrores.contrasenia = "Campo nueva contraseña vacio"
    }

    if (!datos.repContrasenia.trim()) {
      nuevosErrores.repContrasenia = "Campo repetir contraseña vacio"
    }

    if (datos.contrasenia && datos.repContrasenia) {
      if (datos.contrasenia !== datos.repContrasenia) {
        swal.fire({
          icon: "error",
          title: "Las contraseñas no coinciden"
        })
        return
      }
    }

    if (!token) {
      swal.fire({
        icon: "error",
        title: "Token inválido",
        text: "El enlace de recuperación no es válido o expiró"
      })
      return
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    try {
      const res = await clienteAxios.post(
        "/usuarios/cambiar-contrasenia",
        {
          token,
          nuevaContrasenia: datos.contrasenia
        }
      )

      swal.fire({
        icon: "success",
        title: "Contraseña actualizada",
        text: res.data.mensaje
      })

      setDatos({
        contrasenia: "",
        repContrasenia: ""
      })

      setTimeout(() => {
        navigate("/Iniciar_Sesion")
      }, 1500)

    } catch (error) {
      swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.mensaje ||
          "No se pudo cambiar la contraseña"
      })
    }
  }

  return (
    <Container className="form-container">
      <h3>Restablecer contraseña</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="NuevaContrasenia">
          <Form.Label>Nueva contraseña</Form.Label>
          <Form.Control
            type="password"
            name="contrasenia"
            value={datos.contrasenia}
            onChange={handleChange}
            className={
              errores.contrasenia
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {errores.contrasenia && (
            <p className="text-danger">{errores.contrasenia}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="RepNuevaContrasenia">
          <Form.Label>Repetir contraseña</Form.Label>
          <Form.Control
            type="password"
            name="repContrasenia"
            value={datos.repContrasenia}
            onChange={handleChange}
            className={
              errores.repContrasenia
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          {errores.repContrasenia && (
            <p className="text-danger">{errores.repContrasenia}</p>
          )}
        </Form.Group>

        <div className="text-center">
          <Button variant="success" type="submit">
            Cambiar contraseña
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default FormularioRestablecerContrasenia