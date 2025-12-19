export interface News {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsInput {
  title: string;
  description: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NewsResponse {
  data: News[];
  meta: PaginationMeta;
}

export interface ZipCodeData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}
