import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();

  // Dividir la ruta en partes (ej: "/propiedades/casas" → ["propiedades", "casas"])
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-sm mb-4 text-gray-600" aria-label="Breadcrumb">
      <ol className="flex space-x-2">
        {/* Inicio siempre */}
        <li>
          <Link to="/" className="hover:text-orange-500 font-medium">
            Inicio
          </Link>
        </li>

        {pathnames.map((name, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          return (
            <li key={routeTo} className="flex items-center space-x-2">
              <span>/</span>
              {isLast ? (
                <span className="text-orange-500 font-semibold capitalize">
                  {name}
                </span>
              ) : (
                <Link to={routeTo} className="hover:text-orange-500 capitalize">
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
