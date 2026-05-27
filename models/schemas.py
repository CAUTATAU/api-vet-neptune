from pydantic import BaseModel

class TutorCreate(BaseModel):
    id_tutor: str
    nome: str
    telefone: str

class TutorResponse(TutorCreate):
    pass

class PetCreate(BaseModel):
    id_pet: str
    nome: str
    especie: str
    idade: int

class PetResponse(PetCreate):
    pass