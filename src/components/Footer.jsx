// src/components/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1f3b8f', color: 'white', textAlign: 'center', padding: '1rem' }}>
      <p>
        &copy; 2025 InmoGestión. Todos los derechos reservados. |{" "}
        <Link to="/politica" style={{ color: '#ffffff', textDecoration: 'underline' }}>
          Política de Privacidad
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
