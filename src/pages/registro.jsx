export default function Registro() {
    return (
      <section className="p-6 max-w-md mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 text-center">
          Registro de Usuario
        </h2>
  
        <form className="mt-6 bg-white shadow-lg rounded-xl p-6 space-y-4">
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 rounded-lg"
          >
            Registrarse
          </button>
        </form>
      </section>
    );
  }
  