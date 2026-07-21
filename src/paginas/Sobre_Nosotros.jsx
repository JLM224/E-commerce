import { cambiarTituloPagina } from "../funcionesAuxiliares/CambiarTituloPagina";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useEffect } from "react";

const Sobre_Nosotros = () => {
  useEffect(() => {
    cambiarTituloPagina("Sobre Nosotros")
  }, []);

  const TarjetasInformativas = [
    {
      id: 1,
      titulo: "“¿Qué hacemos?”",
      descripcion:
        "En nuestro estudio jurídico, concebimos el ejercicio del Derecho como un compromiso permanente con la excelencia, la ética profesional y la defensa efectiva de los intereses de nuestros clientes. Nos especializamos en brindar asesoramiento integral, abordando cada caso con rigor técnico, análisis estratégico y una profunda vocación de servicio."
    },
    {
      id: 2,
      titulo: "“Nuestro Equipo de trabajo”",
      descripcion:
        "Nuestro equipo está conformado por profesionales con una sólida formación académica (UNT) y una basta experiencia en diversas áreas del Derecho, lo que nos permite ofrecer soluciones jurídicas precisas, adaptadas a las particularidades de cada situación. Entendemos que cada cliente enfrenta problemáticas únicas; por ello, priorizamos una atención personalizada, basada en la escucha activa y la construcción de estrategias a medida."
    },
    {
      id: 3,
      titulo: "“Nuestra Labor Profesional”",
      descripcion:
        "Nuestra labor se sustenta en valores fundamentales: responsabilidad, confidencialidad, transparencia y compromiso. Creemos en la importancia de generar vínculos de confianza duraderos, acompañando a nuestros clientes no solo en la resolución de sus conflictos, sino también en la toma de decisiones estratégicas en la búesqueda de una solución eficaz acorde a su caso."
    },
    {
      id: 4,
      titulo: "“¿Por qué elegirnos?”",
      descripcion:
        "Nos distinguimos por una práctica orientada a resultados, donde la prevención, la negociación y la resolución eficiente de conflictos ocupan un lugar central. A su vez, cuando las circunstancias lo requieren, ejercemos una defensa firme y comprometida en sede judicial y administrativa. Por lo tanto, elegirnos implica contar con un respaldo jurídico sólido, enfocado en la protección de sus derechos y en la obtención de soluciones eficaces y sostenibles."
    },
]
  return (
    <Container fluid className="my-3">
      <Row xs={1} md={3} className="g-4">
        {TarjetasInformativas.map((tarjeta, index) => (
          <Col
            key={tarjeta.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            data-aos-duration="700"
          >
            <Card className="h-100 text-center">
              <Card.Body className="d-flex flex-column">
                <h3 className="T2">{tarjeta.titulo}</h3>
                <p className="mt-2" style={{ textAlign: "justify" }}>
                  {tarjeta.descripcion}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Sobre_Nosotros