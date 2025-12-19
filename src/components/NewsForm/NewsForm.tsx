import React, { useState, useEffect } from 'react';
import './NewsForm.css';
import type { NewsInput, News } from '../../types';

interface NewsFormProps {
  onSubmit: (news: NewsInput) => void;
  initialData?: News | null;
  onCancel?: () => void;
  isEditing?: boolean;
}

const NewsForm: React.FC<NewsFormProps> = ({
  onSubmit,
  initialData,
  onCancel,
  isEditing = false,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description });
    if (!isEditing) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="news-form-container">
      <h3>{isEditing ? 'Editar Notícia' : 'Nova Notícia'}</h3>
      <form onSubmit={handleSubmit} className="news-form">
        <div className="form-field">
          <label htmlFor="title">Título:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título da notícia"
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite a descrição da notícia"
            rows={4}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {isEditing ? 'Atualizar' : 'Criar'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewsForm;
