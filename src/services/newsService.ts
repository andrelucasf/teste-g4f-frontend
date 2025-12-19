import type { NewsResponse, News, NewsInput } from '../types';
import api from './api';

interface FetchNewsParams {
  page?: number;
  limit?: number;
  title?: string;
  description?: string;
}

export const fetchNews = async (
  params: FetchNewsParams = {}
): Promise<NewsResponse> => {
  const { page = 1, limit = 10, title = '', description = '' } = params;
  const { data } = await api.get<any>('/noticias', {
    params: { page, limit, titulo: title, descricao: description },
  });

  // Mapeia os campos do backend (português) para o frontend (inglês)
  const mappedData = {
    data: data.data.map((item: any) => ({
      id: item.id,
      title: item.titulo,
      description: item.descricao,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    })),
    meta: data.meta,
  };

  return mappedData;
};

export const fetchNewsById = async (id: number): Promise<News> => {
  const { data } = await api.get<any>(`/noticias/${id}`);
  return {
    id: data.id,
    title: data.titulo,
    description: data.descricao,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

export const createNews = async (news: NewsInput): Promise<News> => {
  const { data } = await api.post<any>('/noticias', {
    titulo: news.title,
    descricao: news.description,
  });
  return {
    id: data.id,
    title: data.titulo,
    description: data.descricao,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

export const updateNews = async (
  id: number,
  news: NewsInput
): Promise<News> => {
  const { data } = await api.patch<any>(`/noticias/${id}`, {
    titulo: news.title,
    descricao: news.description,
  });
  return {
    id: data.id,
    title: data.titulo,
    description: data.descricao,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};

export const deleteNews = async (id: number): Promise<void> => {
  await api.delete(`/noticias/${id}`);
};
