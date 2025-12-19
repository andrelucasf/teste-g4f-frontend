import axios from 'axios';
import type { ZipCodeData } from '../types';

const cepApi = axios.create({
  baseURL: 'https://viacep.com.br/ws',
});

export const searchCEP = async (cep: string): Promise<ZipCodeData> => {
  const cleanCep = cep.replace(/\D/g, '');

  if (cleanCep.length !== 8) {
    throw new Error('ZIP code must contain 8 digits');
  }

  const { data } = await cepApi.get<ZipCodeData>(`/${cleanCep}/json/`);

  if (data.erro) {
    throw new Error('ZIP code not found');
  }

  return data;
};
