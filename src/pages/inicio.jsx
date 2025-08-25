import { Link } from "react-router-dom";

export default function Inicio() {
    return (
      <section className="bg-gray-50">
        {/* Hero principal */}
        <div className="relative bg-yellow-500 text-white py-20 text-center">
          <h1 className="text-5xl font-extrabold">
            Bienvenido a <span className="text-blue-900">InmoGestión</span>
          </h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Encuentra la propiedad de tus sueños con la ayuda de nuestros agentes expertos.
          </p>
          <button className="mt-6 bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition">
            Ver Propiedades
          </button>
        </div>
  
        {/* Sección de ventajas */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <h3 className="text-xl font-bold text-blue-900">Propiedades verificadas</h3>
            <p className="mt-2 text-gray-600">Publicaciones reales con documentación en regla.</p>
          </div>
  
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <h3 className="text-xl font-bold text-blue-900">Agentes expertos</h3>
            <p className="mt-2 text-gray-600">Profesionales que te guiarán en todo el proceso.</p>
          </div>
  
          <div className="bg-white p-6 rounded-xl shadow-lg border">
            <h3 className="text-xl font-bold text-blue-900">Búsqueda rápida</h3>
            <p className="mt-2 text-gray-600">Encuentra propiedades por zona, precio o tipo en segundos.</p>
          </div>
        </div>
  
        {/* CTA final */}
        <div className="bg-blue-900 text-white py-16 text-center">
          <h2 className="text-3xl font-bold">¿Listo para encontrar tu nuevo hogar?</h2>
          <Link
  to="/registro"
  className="mt-6 inline-block bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-6 py-3 rounded-lg shadow-md transition"
>
  Registrarme Ahora
</Link>
        </div>
      </section>
    );
  }
  