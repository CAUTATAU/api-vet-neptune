from pydantic import BaseModel, Field


# tutores

class TutorCreate(BaseModel):
    id_tutor: str
    nome: str
    telefone: str


class TutorUpdate(BaseModel):
    nome: str
    telefone: str


class TutorResponse(BaseModel):
    id: str
    nome: str
    telefone: str


# pets
class PetCreate(BaseModel):
    id_pet: str
    nome: str
    especie: str
    idade: int = Field(ge=0)


class PetUpdate(BaseModel):
    nome: str
    especie: str
    idade: int = Field(ge=0)


class PetResponse(BaseModel):
    id: str
    nome: str
    especie: str
    idade: int


# vínculos

class VinculoCreate(BaseModel):
    tutor_id: str
    pet_id: str


class VinculoUpdate(BaseModel):
    novo_tutor: str
    novo_pet: str


class VinculoResponse(BaseModel):
    tutor_id: str
    tutor_nome: str
    pet_id: str
    pet_nome: str


# mensagens

class MensagemResponse(BaseModel):
    mensagem: str


# dashboard

class DashboardResponse(BaseModel):
    total_tutores: int
    total_pets: int
    total_vinculos: int