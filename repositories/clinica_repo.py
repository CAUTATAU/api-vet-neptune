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
            g.V().has('Tutor', 'id', id_tutor) \
                .addE('POSSUI') \
                .to(__.V().has('Pet', 'id', id_pet)) \
                .next()

            return {
                "mensagem": f"Tutor {id_tutor} agora possui o Pet {id_pet}"
            }

        finally:
            connection.close()

    def listar_tutores(self):
        g, connection = get_graph_traversal()

        try:
            tutores = g.V().hasLabel('Tutor').valueMap().toList()

            resultado = []

            for t in tutores:
                resultado.append({
                    chave: valor[0]
                    for chave, valor in t.items()
                })

            return resultado

        finally:
            connection.close()

    def listar_pets(self):
        g, connection = get_graph_traversal()

        try:
            pets = g.V().hasLabel('Pet').valueMap().toList()

            resultado = []

            for p in pets:
                resultado.append({
                    chave: valor[0]
                    for chave, valor in p.items()
                })

            return resultado

        finally:
            connection.close()

    def buscar_tutor(self, id_tutor):
        g, connection = get_graph_traversal()

        try:
            tutor = g.V() \
                .has('Tutor', 'id', id_tutor) \
                .valueMap() \
                .toList()

            return tutor

        finally:
            connection.close()

    def buscar_pet(self, id_pet):
        g, connection = get_graph_traversal()

        try:
            pet = g.V() \
                .has('Pet', 'id', id_pet) \
                .valueMap() \
                .toList()

            return pet

        finally:
            connection.close()

    def deletar_tutor(self, id_tutor):
        g, connection = get_graph_traversal()

        try:
            g.V().has('Tutor', 'id', id_tutor).drop().iterate()

            return {
                "mensagem": "Tutor removido com sucesso"
            }

        finally:
            connection.close()

    def deletar_pet(self, id_pet):
        g, connection = get_graph_traversal()

        try:
            g.V().has('Pet', 'id', id_pet).drop().iterate()

            return {
                "mensagem": "Pet removido com sucesso"
            }

        finally:
            connection.close()

    def dashboard(self):
        g, connection = get_graph_traversal()

        try:
            total_tutores = g.V().hasLabel('Tutor').count().next()
            total_pets = g.V().hasLabel('Pet').count().next()

            return {
                "tutores": total_tutores,
                "pets": total_pets
            }

        finally:
            connection.close()

    def listar_vinculos(self):
        g, connection = get_graph_traversal()

        try:
            vinculos = g.V() \
                .hasLabel('Tutor') \
                .as_('tutor') \
                .out('POSSUI') \
                .as_('pet') \
                .select('tutor', 'pet') \
                .by(__.valueMap()) \
                .toList()

            resultado = []

            for v in vinculos:
                tutor = {
                    chave: valor[0]
                    for chave, valor in v["tutor"].items()
                }

                pet = {
                    chave: valor[0]
                    for chave, valor in v["pet"].items()
                }

                resultado.append({
                    "tutor_id": tutor["id"],
                    "tutor_nome": tutor["nome"],
                    "pet_id": pet["id"],
                    "pet_nome": pet["nome"]
                })

            return resultado

        finally:
            connection.close()

    def deletar_vinculo(self, id_tutor, id_pet):
        g, connection = get_graph_traversal()

        try:
            g.V() \
                .has('Tutor', 'id', id_tutor) \
                .outE('POSSUI') \
                .where(
                    __.inV().has('Pet', 'id', id_pet)
                ) \
                .drop() \
                .iterate()

            return {
                "mensagem": "Vínculo removido com sucesso"
            }

        finally:
            connection.close()