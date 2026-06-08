function Sidebar({ setPagina }) {
  return (
    <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
      <h4>Menu</h4>

      <button
        className="btn btn-outline-light w-100 mb-2"
        onClick={() => setPagina("dashboard")}
      >
        Dashboard
      </button>

      <button
        className="btn btn-outline-light w-100 mb-2"
        onClick={() => setPagina("tutores")}
      >
        Tutores
      </button>

      <button
        className="btn btn-outline-light w-100 mb-2"
        onClick={() => setPagina("pets")}
      >
        Pets
      </button>

      <button
        className="btn btn-outline-light w-100"
        onClick={() => setPagina("vincular")}
      >
        Vincular
      </button>
    </div>
  );
}

export default Sidebar;