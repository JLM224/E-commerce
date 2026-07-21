import { Container } from "react-bootstrap";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const LinksContacto = () => {
  const links = [
    {
      icon: <FaMapMarkerAlt />,
      text: "Julio A. Roca, La Reducción, Tucumán",
      href: "https://www.google.com/maps?q=-26.9520397,-65.3526001",
    },
    {
      icon: <FaPhone />,
      text: "Llamadas",
      href: "tel:+5493815303836",
    },
    {
      icon: <FaWhatsapp />,
      text: "WhatsApp",
      href: "https://wa.me/5493815303836",
    },
    {
      icon: <FaEnvelope />,
      text: "Gmail",
      href: "mailto:jorgemedina051001@gmail.com",
    },
    {
      icon: <FaInstagram />,
      text: "Seguinos en Instagram!",
      href: "https://www.instagram.com/",
    },
    {
      icon: <FaFacebook />,
      text: "Seguinos en Facebook!",
      href: "https://www.facebook.com/",
    },
]
  return (
    <Container fluid className="text-center d-flex flex-column gap-2 my-3">
      {links.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none d-flex align-items-center justify-content-center gap-2"
          >
          {item.icon}
          <span>{item.text}</span>
        </a>
      ))}
    </Container>
  )
}

export default LinksContacto