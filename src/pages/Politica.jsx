import { Link } from "react-router-dom";

export default function Politica() {
  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <header
        style={{
          backgroundColor: "#1f3b8f",
          color: "white",
          padding: "2rem 1rem",
          textAlign: "center",
        }}
      >
        <img
          src="/logo.png"
          alt="Logo InmoGestión"
          style={{ maxHeight: "150px", marginBottom: "1rem" }}
        />
        <h1>Política de Privacidad</h1>
        <p>Última actualización: Septiembre 2025</p>
      </header>

      <main
        style={{
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "2rem",
          backgroundColor: "white",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <section>
          <h2 style={{ color: "#1f3b8f" }}>1. ¿Quiénes somos?</h2>
          <p>
            En <strong>InmoGestión</strong>, nos comprometemos a proteger la
            privacidad de nuestros usuarios y clientes. Esta política explica
            cómo recopilamos, usamos y protegemos su información personal.
          </p>
        </section>

        {/* Aquí copias los demás <section> con el mismo contenido que tu HTML */}
      </main>

      <footer
        style={{
          backgroundColor: "#1f3b8f",
          color: "white",
          textAlign: "center",
          padding: "1rem",
          marginTop: "2rem",
        }}
      >
        <p>
          © 2025 InmoGestión. Todos los derechos reservados. |{" "}
          {/* Aquí usamos Link en vez de <a href="index.html"> */}
          <Link to="/" style={{ color: "#ffcc00" }}>
            Volver al inicio
          </Link>
        </p>
      </footer>
    </div>
  );
}
