import { useState } from "react";
import * as XLSX from "xlsx"; // ✅ Para leer Excel

export default function CargaMasiva() {
  const [archivo, setArchivo] = useState(null);
  const [dataPreview, setDataPreview] = useState([]);
  const [mensaje, setMensaje] = useState(""); // ✅ Nuevo: mostrar estado de carga

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setArchivo(file);

    if (!file) return;

    const reader = new FileReader();
    const extension = file.name.split(".").pop().toLowerCase();

    if (extension === "csv") {
      // ✅ Lectura de CSV
      reader.onload = (event) => {
        const text = event.target.result;
        const rows = text.split("\n").map((row) => row.split(","));
        setDataPreview(rows.slice(0, 5)); // mostramos solo primeras 5 filas
      };
      reader.readAsText(file);
    } else if (["xlsx", "xls"].includes(extension)) {
      // ✅ Lectura de Excel
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
          header: 1,
        });
        setDataPreview(worksheet.slice(0, 5)); // primeras 5 filas
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Formato no soportado. Sube un archivo CSV o Excel.");
    }
  };

  // ✅ Enviar archivo al backend
  const handleUpload = async () => {
    if (!archivo) {
      alert("Por favor selecciona un archivo.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", archivo);

      const res = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        setMensaje("✅ Archivo cargado correctamente en la base de datos.");
        console.log("Respuesta del servidor:", result);
      } else {
        setMensaje("❌ Error al cargar: " + result.error);
      }
    } catch (error) {
      console.error("Error en la subida:", error);
      setMensaje("❌ Error en la conexión con el servidor.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">
        📂 Carga Masiva de Datos
      </h1>

      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Subir Archivo
      </button>

      {/* ✅ Mensaje de estado */}
      {mensaje && <p className="mt-3 font-semibold">{mensaje}</p>}

      {/* Vista previa */}
      {dataPreview.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Vista previa (primeras filas):</h2>
          <table className="table-auto border border-gray-300 w-full text-sm">
            <tbody>
              {dataPreview.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} className="border px-2 py-1">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
