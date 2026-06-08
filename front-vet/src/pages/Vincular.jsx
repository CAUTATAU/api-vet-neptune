import { useState } from "react";
import {
  FaTrash,
  FaEdit,
  FaInfoCircle,
} from "react-icons/fa";
import api from "../services/api";

function Vincular() {
  const [idTutor, setIdTutor] = useState("");
  const [idPet, setIdPet] = useState("");
  const [vinculos, setVinculos] = useState([]);

  const [editando, setEditando] =
    useState(false);

  const [idTutorOriginal, setIdTutorOriginal] =
    useState("");

  const [idPetOriginal, setIdPetOriginal] =
    useState("");

  async function vincular() {
    if (!idTutor.trim() || !idPet.trim()) {
      alert(
        "Preencha os IDs do tutor e do pet."
      );
      return;
    }

    try {
      const response = await api.post(
        `/tutores/${idTutor}/pets/${idPet}`
      );

      alert(
        response.data.mensagem ||
          "Vínculo criado com sucesso."
      );

      limparFormulario();
      listarVinculos();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Erro ao vincular tutor e pet."
      );
    }
  }

  async function atualizarVinculo() {
    if (!idTutor.trim() || !idPet.trim()) {
      alert(
        "Preencha os IDs do tutor e do pet."
      );
      return;
    }

    try {
      await api.patch(
        `/vinculos/${idTutorOriginal}/${idPetOriginal}`,
        {
          novo_tutor: idTutor,
          novo_pet: idPet,
        }
      );

      alert("Vínculo atualizado!");

      limparFormulario();
      listarVinculos();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Erro ao atualizar vínculo."
      );
    }
  }

  function editarVinculo(vinculo) {
    setEditando(true);

    setIdTutor(vinculo.tutor_id);
    setIdPet(vinculo.pet_id);

    setIdTutorOriginal(
      vinculo.tutor_id
    );

    setIdPetOriginal(
      vinculo.pet_id
    );
  }

  function visualizarVinculo(vinculo) {
    alert(
      `Tutor: ${vinculo.tutor_nome}\n` +
        `ID Tutor: ${vinculo.tutor_id}\n\n` +
        `Pet: ${vinculo.pet_nome}\n` +
        `ID Pet: ${vinculo.pet_id}`
    );
  }

  function limparFormulario() {
    setIdTutor("");
    setIdPet("");

    setEditando(false);

    setIdTutorOriginal("");
    setIdPetOriginal("");
  }

  async function listarVinculos() {
    try {
      const response =
        await api.get("/vinculos");

      setVinculos(response.data);
    } catch (error) {
      console.error(error);

      alert(
        "Erro ao listar vínculos."
      );
    }
  }

  async function excluirVinculo(
    idTutor,
    idPet
  ) {
    if (
      !window.confirm(
        "Deseja remover este vínculo?"
      )
    ) {
      return;
    }

    try {
      await api.delete(
        `/tutores/${idTutor}/pets/${idPet}`
      );

      alert("Vínculo removido!");

      listarVinculos();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Erro ao excluir vínculo."
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
        {editando
          ? "Editar Vínculo"
          : "Vincular Tutor e Pet"}
      </h2>

      <input
        type="text"
        placeholder="ID Tutor"
        value={idTutor}
        onChange={(e) =>
          setIdTutor(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="ID Pet"
        value={idPet}
        onChange={(e) =>
          setIdPet(e.target.value)
        }
      />

      <br />
      <br />

      <button
        onClick={
          editando
            ? atualizarVinculo
            : vincular
        }
      >
        {editando
          ? "Atualizar Vínculo"
          : "Vincular"}
      </button>

      {editando && (
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
        onClick={listarVinculos}
        style={{
          marginLeft: "10px",
        }}
      >
        Listar Vínculos
      </button>

      <hr />

      <h3>Vínculos Cadastrados</h3>

      {vinculos.length === 0 ? (
        <p>
          Nenhum vínculo encontrado.
        </p>
      ) : (
        <ul>
          {vinculos.map(
            (vinculo, index) => (
              <li key={index}>
                <button
                  onClick={() =>
                    editarVinculo(vinculo)
                  }
                  style={estiloIcone}
                  title="Editar vínculo"
                >
                  <FaEdit />
                </button>

                <strong>
                  {vinculo.tutor_nome}
                </strong>

                {" (ID "}
                {vinculo.tutor_id}
                {") → "}

                <strong>
                  {vinculo.pet_nome}
                </strong>

                {" (ID "}
                {vinculo.pet_id}
                {")"}

                <button
                  onClick={() =>
                    visualizarVinculo(
                      vinculo
                    )
                  }
                  style={estiloIcone}
                  title="Informações"
                >
                  <FaInfoCircle />
                </button>

                <button
                  onClick={() =>
                    excluirVinculo(
                      vinculo.tutor_id,
                      vinculo.pet_id
                    )
                  }
                  style={estiloIcone}
                  title="Excluir vínculo"
                >
                  <FaTrash />
                </button>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}

export default Vincular;