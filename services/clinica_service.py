from repositories.clinica_repo import ClinicaRepository
from models.schemas import (
    TutorCreate,
    TutorUpdate,
    PetCreate,
    PetUpdate,
    VinculoUpdate
)


class ClinicaService:

    def __init__(self):
        self.repo = ClinicaRepository()

    # tutores

    def registrar_tutor(
        self,
        tutor: TutorCreate
    ):
        return self.repo.criar_tutor(tutor)

    def listar_tutores(self):
        return self.repo.listar_tutores()

    def buscar_tutor(
        self,
        id_tutor
    ):
        return self.repo.buscar_tutor(id_tutor)

    def atualizar_tutor(
        self,
        id_tutor: str,
        tutor: TutorUpdate
    ):
        return self.repo.atualizar_tutor(
            id_tutor,
            tutor
        )

    def deletar_tutor(
        self,
        id_tutor
    ):
        return self.repo.deletar_tutor(
            id_tutor
        )

    # pets

    def registrar_pet(
        self,
        pet: PetCreate
    ):
        return self.repo.criar_pet(pet)

    def listar_pets(self):
        return self.repo.listar_pets()

    def buscar_pet(
        self,
        id_pet
    ):
        return self.repo.buscar_pet(id_pet)

    def atualizar_pet(
        self,
        id_pet: str,
        pet: PetUpdate
    ):
        return self.repo.atualizar_pet(
            id_pet,
            pet
        )

    def deletar_pet(
        self,
        id_pet
    ):
        return self.repo.deletar_pet(
            id_pet
        )

    # vínculos

    def adotar_pet(
        self,
        id_tutor: str,
        id_pet: str
    ):
        return self.repo.vincular_tutor_ao_pet(
            id_tutor,
            id_pet
        )

    def listar_vinculos(self):
        return self.repo.listar_vinculos()

    def atualizar_vinculo(
        self,
        tutor_original: str,
        pet_original: str,
        vinculo: VinculoUpdate
    ):
        return self.repo.atualizar_vinculo(
            tutor_original,
            pet_original,
            vinculo
        )

    def deletar_vinculo(
        self,
        id_tutor,
        id_pet
    ):
        return self.repo.deletar_vinculo(
            id_tutor,
            id_pet
        )

    # dashboard

    def dashboard(self):
        return self.repo.dashboard()