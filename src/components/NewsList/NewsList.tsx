import React from 'react';
import './NewsList.css';
import type { News } from '../../types';

interface NewsListProps {
  news: News[];
  onEdit: (news: News) => void;
  onDelete: (id: number) => void;
}

const NewsList: React.FC<NewsListProps> = ({ news, onEdit, onDelete }) => {
  if (news.length === 0) {
    return (
      <div className="empty-state">
        Nenhuma notícia encontrada. Crie uma nova notícia acima.
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  return (
    <div className="news-list">
      {news.map((newsItem) => (
        <div key={newsItem.id} className="news-card">
          <div className="news-header">
            <h3>{newsItem.title}</h3>
            <div className="news-actions">
              <button
                onClick={() => onEdit(newsItem)}
                className="btn-edit"
                title="Editar"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(newsItem.id)}
                className="btn-delete"
                title="Deletar"
              >
                🗑️
              </button>
            </div>
          </div>
          <p className="news-description">{newsItem.description}</p>
          <div className="news-meta">
            <span>Criado em: {formatDate(newsItem.createdAt)}</span>
            {newsItem.updatedAt !== newsItem.createdAt && (
              <span>Atualizado em: {formatDate(newsItem.updatedAt)}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
