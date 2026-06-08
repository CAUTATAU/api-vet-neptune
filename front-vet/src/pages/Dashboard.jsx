import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

function Dashboard() {
  const [totalTutores, setTotalTutores] = useState(0);
  const [totalPets, setTotalPets] = useState(0);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const respostaTutores = await axios.get(
        "http://127.0.0.1:8000/tutores"
      );

      const respostaPets = await axios.get(
        "http://127.0.0.1:8000/pets"
      );

      setTotalTutores(respostaTutores.data.length);
      setTotalPets(respostaPets.data.length);
    } catch (erro) {
      console.error(erro);
    }
  }

  return (
    <div className="container">
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">
        <div className="col-md-4">
          <Card
            titulo="Tutores"
            valor={totalTutores}
          />
        </div>

        <div className="col-md-4">
          <Card
            titulo="Pets"
            valor={totalPets}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;