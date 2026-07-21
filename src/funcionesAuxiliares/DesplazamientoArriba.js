import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Aos from "aos";

const DesplazamientoArriba = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
    Aos.refresh();
  }, [pathname])

  return null;
}
export default DesplazamientoArriba