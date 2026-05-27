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