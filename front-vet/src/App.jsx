import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Tutores from "./pages/Tutores";
import Pets from "./pages/Pets";
import Vincular from "./pages/Vincular";

function App() {
  const [pagina, setPagina] = useState("dashboard");

  function renderizarPagina() {
    switch (pagina) {
      case "tutores":
        return <Tutores />;

      case "pets":
        return <Pets />;

      case "vincular":
        return <Vincular />;

      default:
        return <Dashboard />;
    }
  }

  return (
    <div>
      <Navbar />

      <div
        style={{
          display: "flex",
        }}
      >
        <Sidebar setPagina={setPagina} />

        <div
          style={{
            padding: "20px",
            flex: 1,
          }}
        >
          {renderizarPagina()}
        </div>
      </div>
    </div>
  );
}

export default App;