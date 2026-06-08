import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import api from "../services/api";

function Tutores() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tutores, setTutores] = useState([]);

  const [editandoId, setEditandoId] =
    useState(null);

  async function cadastrarTutor() {
    if (!nome.trim()) {
      alert("Informe o nome do tutor.");
      return;
    }

    if (!telefone.trim()) {
      alert("Informe o telefone.");
      return;
    }

    try {
      await api.post("/tutores", {
        id_tutor: Date.now().toString(),
        nome,
        telefone,
      });

      alert("Tutor cadastrado.");

      limparFormulario();

      listarTutores();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Erro ao cadastrar tutor"
      );
    }
  }

  async function atualizarTutor() {
    if (!nome.trim()) {
      alert("Informe o nome do tutor.");
      return;
    }

    if (!telefone.trim()) {
      alert("Informe o telefone.");
      return;
    }

    try {
      await api.patch(
        `/tutores/${editandoId}`,
        {
          id_tutor: editandoId,
          nome,
          telefone,
        }
      );

      alert("Tutor atualizado.");

      limparFormulario();

      listarTutores();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Erro ao atualizar tutor"
      );
    }
  }

  function editarTutor(tutor) {
    setEditandoId(tutor.id);

    setNome(tutor.nome);
    setTelefone(
      String(tutor.telefone)
    );
  }

  function limparFormulario() {
    setNome("");
    setTelefone("");
    setEditandoId(null);
  }

  async function listarTutores() {
    try {
      const response =
        await api.get("/tutores");

      setTutores(response.data);
    } catch (error) {
      console.error(error);

      alert("Erro ao listar tutores");
    }
  }

  async function excluirTutor(id) {
    if (
      !window.confirm(
        "Deseja remover este tutor?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/tutores/${id}`);

      alert("Tutor removido.");

      listarTutores();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Erro ao excluir tutor"
      );
    }
  }

  return (
    <div>
      <h2>
        {editandoId
          ? "Editar Tutor"
          : "Cadastrar Tutor"}
      </h2>

      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) =>
          setNome(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Telefone"
        value={telefone}
        onChange={(e) =>
          setTelefone(e.target.value)
        }
      />

      <br />
      <br />

      <button
        onClick={
          editandoId
            ? atualizarTutor
            : cadastrarTutor
        }
      >
        {editandoId
          ? "Atualizar Tutor"
          : "Salvar Tutor"}
      </button>

      {editandoId && (
        <button
          onClick={limparFormulario}
          style={{
            marginLeft: "10px",
          }}
        >
          Cancelar
        </button>
      )}

      <button
        onClick={listarTutores}
        style={{
          marginLeft: "10px",
        }}
      >
        Listar Tutores
      </button>

      <hr />

      <h3>Tutores Cadastrados</h3>

      {tutores.length === 0 ? (
        <p>Nenhum tutor encontrado.</p>
      ) : (
        <ul>
          {tutores.map((tutor) => (
            <li key={tutor.id}>
              <span
                onClick={() =>
                  editarTutor(tutor)
                }
                style={{
                  cursor: "pointer",
                  marginRight: "8px",
                }}
                title="Editar tutor"
              >
                <FaEdit />
              </span>

              <strong>
                {tutor.nome}
              </strong>

              {" | ID: "}
              <strong>
                {tutor.id}
              </strong>

              {" | "}
              {tutor.telefone}

              <span
                onClick={() =>
                  excluirTutor(
                    tutor.id
                  )
                }
                style={{
                  cursor: "pointer",
                  marginLeft: "8px",
                }}
                title="Excluir tutor"
              >
                <FaTrash />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tutores;