from fastapi import FastAPI
from models.schemas import TutorCreate, TutorResponse, PetCreate, PetResponse
from services.clinica_service import ClinicaService

app = FastAPI(title="API Clínica Veterinária - Neptune Graph")
clinica_service = ClinicaService()

@app.post("/tutores", response_model=TutorResponse)
def criar_tutor(tutor: TutorCreate):
    return clinica_service.registrar_tutor(tutor)

@app.post("/pets", response_model=PetResponse)
def criar_pet(pet: PetCreate):
    return clinica_service.registrar_pet(pet)

@app.post("/tutores/{id_tutor}/pets/{id_pet}")
def vincular_tutor_pet(id_tutor: str, id_pet: str):
    return clinica_service.adotar_pet(id_tutor, id_pet)

@app.get("/tutores")
def listar_tutores():
    return clinica_service.listar_tutores()

@app.get("/")
def check_status():
    return {"message": "Bem-vindo à API da Clínica Veterinária usando Neptune Graph!"}