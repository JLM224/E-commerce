import { Container } from "react-bootstrap";

const Mapa = () => {
const mapaUrl =
    "https://www.google.com/maps?q=@-26.9520397,-65.3526001&output=embed";
  return (
    <>
    <Container fluid>
        <div>
          <iframe
            title="Julio A. Roca 488 - Tucuman"
            style={{ border: 0, width: "100%", height: "200px" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={mapaUrl}
          ></iframe>
        </div>
      </Container>
    </>
  )
}

export default Mapa