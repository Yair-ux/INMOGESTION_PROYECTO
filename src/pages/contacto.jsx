import React from 'react';
import marcaAgua from "../assets/logo.png";

export default function Contacto() {
  return (
    <section className="p-6 relative bg-white overflow-hidden">
      {/* Marca de agua */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-20"
       style={{ backgroundImage: `url(${marcaAgua})` }}

      ></div>

      {/* Contenido encima */}
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-blue-900">Contacto</h2>
        <p className="mt-4 text-gray-700">
          Déjanos tu mensaje y te responderemos pronto.
        </p>

        <a
          href="https://wa.me/573214622453?text=Hola,%20quiero%20más%20información%20sobre%20una%20propiedad"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Contactar por WhatsApp
        </a>
      </div>
    </section>
  );
}