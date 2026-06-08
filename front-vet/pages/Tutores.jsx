import { useState } from "react";
import api from "../services/api";

function Tutores() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  async function cadastrarTutor() {
    try {
      await api.post("/tutores", {
        id_tutor: Date.now().toString(),
        nome,
        telefone,
      });

      alert("Tutor cadastrado!");

      setNome("");
      setTelefone("");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cadastrar Tutor</h2>

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
      />

      <br /><br />

      <button onClick={cadastrarTutor}>
        Salvar Tutor
      </button>
    </div>
  );
}

export default Tutores;