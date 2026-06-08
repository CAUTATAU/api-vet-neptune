from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.schemas import (
    TutorCreate,
    TutorUpdate,
    TutorResponse,
    PetCreate,
    PetUpdate,
    PetResponse,
    VinculoUpdate
)

from services.clinica_service import ClinicaService

app = FastAPI(
    title="API Clínica Veterinária - Neptune Graph"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

clinica_service = ClinicaService()

# status

@app.get("/")
def check_status():
    return {
        "message": (
            "Bem-vindo à API da Clínica Veterinária "
            "usando Neptune Graph!"
        )
    }

# dashboard

@app.get("/dashboard")
def dashboard():
    return clinica_service.dashboard()

# tutores
@app.post(
    "/tutores",
    response_model=TutorResponse
)
def criar_tutor(
    tutor: TutorCreate
):
    return clinica_service.registrar_tutor(
        tutor
    )

@app.get("/tutores")
def listar_tutores():
    return clinica_service.listar_tutores()

@app.get("/tutores/{id_tutor}")
def buscar_tutor(
    id_tutor: str
):
    return clinica_service.buscar_tutor(
        id_tutor
    )

@app.patch("/tutores/{id_tutor}")
def atualizar_tutor(
    id_tutor: str,
    tutor: TutorUpdate
):
    return clinica_service.atualizar_tutor(
        id_tutor,
        tutor
    )

@app.delete("/tutores/{id_tutor}")
def deletar_tutor(
    id_tutor: str
):
    return clinica_service.deletar_tutor(
        id_tutor
    )

# pets

@app.post(
    "/pets",
    response_model=PetResponse
)
def criar_pet(
    pet: PetCreate
):
    return clinica_service.registrar_pet(
        pet
    )

@app.get("/pets")
def listar_pets():
    return clinica_service.listar_pets()

@app.get("/pets/{id_pet}")
def buscar_pet(
    id_pet: str
):
    return clinica_service.buscar_pet(
        id_pet
    )

@app.patch("/pets/{id_pet}")
def atualizar_pet(
    id_pet: str,
    pet: PetUpdate
):
    return clinica_service.atualizar_pet(
        id_pet,
        pet
    )

@app.delete("/pets/{id_pet}")
def deletar_pet(
    id_pet: str
):
    return clinica_service.deletar_pet(
        id_pet
    )

# vínculos

@app.post(
    "/tutores/{id_tutor}/pets/{id_pet}"
)
def vincular_tutor_pet(
    id_tutor: str,
    id_pet: str
):
    return clinica_service.adotar_pet(
        id_tutor,
        id_pet
    )

@app.get("/vinculos")
def listar_vinculos():
    return clinica_service.listar_vinculos()

@app.patch(
    "/vinculos/{id_tutor}/{id_pet}"
)
def atualizar_vinculo(
    id_tutor: str,
    id_pet: str,
    vinculo: VinculoUpdate
):
    return clinica_service.atualizar_vinculo(
        id_tutor,
        id_pet,
        vinculo
    )

@app.delete(
    "/tutores/{id_tutor}/pets/{id_pet}"
)
def deletar_vinculo(
    id_tutor: str,
    id_pet: str
):
    return clinica_service.deletar_vinculo(
        id_tutor,
        id_pet
    )