from core.database import get_graph_traversal
from models.schemas import TutorCreate, PetCreate
from gremlin_python.process.graph_traversal import __

class ClinicaRepository:
    def criar_tutor(self, tutor: TutorCreate):
        g, connection = get_graph_traversal()
        try:
            g.addV('Tutor') \
             .property('id', tutor.id_tutor) \
             .property('nome', tutor.nome) \
             .property('telefone', tutor.telefone) \
             .next()
            return tutor
        finally:
            connection.close()

    def criar_pet(self, pet: PetCreate):
        g, connection = get_graph_traversal()
        try:
            g.addV('Pet') \
             .property('id', pet.id_pet) \
             .property('nome', pet.nome) \
             .property('especie', pet.especie) \
             .property('idade', pet.idade) \
             .next()
            return pet
        finally:
            connection.close()

    def vincular_tutor_ao_pet(self, id_tutor: str, id_pet: str):
        g, connection = get_graph_traversal()
        try:
            # Busca o Tutor, adiciona uma aresta 'POSSUI' apontando para o Vértice do Pet
            g.V().has('Tutor', 'id', id_tutor) \
             .addE('POSSUI') \
             .to(__.V().has('Pet', 'id', id_pet)) \
             .next()
            return {"mensagem": f"Tutor {id_tutor} agora possui o Pet {id_pet}"}
        finally:
            connection.close()

    def listar_tutores(self):
        g, connection = get_graph_traversal()
        try:
            # Busca todos os vértices com a label 'Tutor' e traz suas propriedades
            tutores = g.V().hasLabel('Tutor').valueMap().toList()
            
            # O Gremlin retorna as propriedades como listas (ex: {'nome': ['Carlos']}).
            # Vamos limpar isso para ficar um JSON mais amigável:
            resultado_limpo = []
            for t in tutores:
                tutor_limpo = {chave: valor[0] for chave, valor in t.items()}
                resultado_limpo.append(tutor_limpo)
                
            return resultado_limpo
        finally:
            connection.close()