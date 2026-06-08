import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import api from "../services/api";

function Pets() {
  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [idade, setIdade] = useState("");
  const [pets, setPets] = useState([]);

  const [editandoId, setEditandoId] = useState(null);

  async function cadastrarPet() {
    if (!nome.trim()) {
      alert("Informe o nome do pet.");
      return;
    }

    if (!especie.trim()) {
      alert("Informe a espécie.");
      return;
    }

    if (idade === "" || Number(idade) < 0) {
      alert("Informe uma idade válida.");
      return;
    }

    try {
      await api.post("/pets", {
        id_pet: Date.now().toString(),
        nome,
        especie,
        idade: Number(idade),
      });

      alert("Pet cadastrado.");

      limparFormulario();

      listarPets();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Erro ao cadastrar pet"
      );
    }
  }

  async function atualizarPet() {
    try {
      await api.patch(`/pets/${editandoId}`, {
        id_pet: editandoId,
        nome,
        especie,
        idade: Number(idade),
      });

      alert("Pet atualizado.");

      limparFormulario();

      listarPets();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Erro ao atualizar pet"
      );
    }
  }

  function editarPet(pet) {
    setEditandoId(pet.id);

    setNome(pet.nome);
    setEspecie(pet.especie);
    setIdade(String(pet.idade));
  }

  function limparFormulario() {
    setNome("");
    setEspecie("");
    setIdade("");
    setEditandoId(null);
  }

  async function listarPets() {
    try {
      const response = await api.get("/pets");

      setPets(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao listar pets");
    }
  }

  async function excluirPet(id) {
    if (
      !window.confirm(
        "Deseja remover este pet?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/pets/${id}`);

      alert("Pet removido.");

      listarPets();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Erro ao excluir pet"
      );
    }
  }

  const estiloIcone = {
    marginLeft: "10px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#000",
    fontSize: "16px",
  };

  return (
    <div>
      <h2>
        {editandoId
          ? "Editar Pet"
          : "Cadastrar Pet"}
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
        placeholder="Espécie"
        value={especie}
        onChange={(e) =>
          setEspecie(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="number"
        min="0"
        placeholder="Idade"
        value={idade}
        onChange={(e) =>
          setIdade(e.target.value)
        }
      />

      <br />
      <br />

      <button
        onClick={
          editandoId
            ? atualizarPet
            : cadastrarPet
        }
      >
        {editandoId
          ? "Atualizar Pet"
          : "Salvar Pet"}
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
        onClick={listarPets}
        style={{
          marginLeft: "10px",
        }}
      >
        Listar Pets
      </button>

      <hr />

      <h3>Pets Cadastrados</h3>

      {pets.length === 0 ? (
        <p>Nenhum pet encontrado.</p>
      ) : (
        <ul>
          {pets.map((pet) => (
            <li key={pet.id}>
              <button
                onClick={() =>
                  editarPet(pet)
                }
                style={estiloIcone}
                title="Editar pet"
              >
                <FaEdit />
              </button>

              <strong>{pet.nome}</strong>

              {" | ID: "}
              <strong>{pet.id}</strong>

              {" | "}
              {pet.especie}

              {" | "}
              {pet.idade} anos

              <button
                onClick={() =>
                  excluirPet(pet.id)
                }
                style={estiloIcone}
                title="Excluir pet"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Pets;