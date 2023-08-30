export interface Usuario {
  _id: string;
  nome: string;
  senha: string;
  cpf: string;
  urlFoto: string | null;
  email: string;
  telefone: string;
  dataDeNascimento: string;
  tipo: "comum" | "admin";
}