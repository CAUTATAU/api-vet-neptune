from repositories.clinica_repo import ClinicaRepository
from models.schemas import TutorCreate, PetCreate

class ClinicaService:

    def __init__(self):
        self.repo = ClinicaRepository()

    def registrar_tutor(self, tutor: TutorCreate):
        return self.repo.criar_tutor(tutor)

    def registrar_pet(self, pet: PetCreate):
        return self.repo.criar_pet(pet)

    def adotar_pet(self, id_tutor: str, id_pet: str):
        return self.repo.vincular_tutor_ao_pet(id_tutor, id_pet)

    def listar_tutores(self):
        return self.repo.listar_tutores()

    def listar_pets(self):
        return self.repo.listar_pets()

    def buscar_tutor(self, id_tutor):
        return self.repo.buscar_tutor(id_tutor)

    def buscar_pet(self, id_pet):
        return self.repo.buscar_pet(id_pet)

    def deletar_tutor(self, id_tutor):
        return self.repo.deletar_tutor(id_tutor)

    def deletar_pet(self, id_pet):
        return self.repo.deletar_pet(id_pet)

    def dashboard(self):
        return self.repo.dashboard()

    def listar_vinculos(self):
        return self.repo.listar_vinculos()

    def deletar_vinculo(self, id_tutor, id_pet):
        return self.repo.deletar_vinculo(id_tutor, id_pet)