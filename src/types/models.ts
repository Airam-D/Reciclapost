export interface Ecoponto {
  id: string;
  nome: string;
  endereco: string;
  cepCidade: string;
  distancia: string;
  horario: string;
  dias: string;
  materiais: string[];
  aviso: string;
  imagem: string;
  latitude: number;
  longitude: number;
}

export interface Usuario {
  id?: string;
  nome: string;
  email: string;
  perfil: 'cidadao' | 'voluntario';
}