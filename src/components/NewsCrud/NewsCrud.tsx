import React, { useState, useEffect } from 'react';
import {
  fetchNews,
  createNews,
  updateNews,
  deleteNews,
} from '../../services/newsService';
import NewsForm from '../NewsForm/NewsForm';
import NewsList from '../NewsList/NewsList';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import './NewsCrud.css';
import type { News, NewsInput } from '../../types';

const NewsCrud: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchDescription, setSearchDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const limit = 10;

  const loadNews = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchNews({
        page: currentPage,
        limit,
        title: searchTitle,
        description: searchDescription,
      });
      setNews(response.data);
      setTotalPages(response.meta.totalPages);
    } catch (err) {
      setError('Erro ao carregar notícias');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, [currentPage, searchTitle, searchDescription]);

  const handleCreate = async (newsItem: NewsInput) => {
    try {
      await createNews(newsItem);
      setCurrentPage(1);
      await loadNews();
      setIsModalOpen(false);
    } catch (err) {
      setError('Erro ao criar notícia');
      console.error(err);
    }
  };

  const handleUpdate = async (newsItem: NewsInput) => {
    if (!editingNews) return;

    try {
      await updateNews(editingNews.id, newsItem);
      setEditingNews(null);
      await loadNews();
      setIsModalOpen(false);
    } catch (err) {
      setError('Erro ao atualizar notícia');
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Deseja realmente deletar esta notícia?')) return;

    try {
      await deleteNews(id);
      await loadNews();
    } catch (err) {
      setError('Erro ao deletar notícia');
      console.error(err);
    }
  };

  const handleEdit = (newsItem: News) => {
    setEditingNews(newsItem);
    setIsModalOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingNews(null);
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setEditingNews(null);
    setIsModalOpen(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    loadNews();
  };

  return (
    <div className="news-crud-container">
      <div className="news-header">
        <h2>Gerenciamento de Notícias</h2>
        <button onClick={handleOpenModal} className="btn-add-news">
          + Nova Notícia
        </button>
      </div>

      <div className="search-section">
        <h3>Filtrar Notícias</h3>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Buscar por título"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Buscar por descrição"
            value={searchDescription}
            onChange={(e) => setSearchDescription(e.target.value)}
          />
          <button type="submit">Buscar</button>
          <button
            type="button"
            onClick={() => {
              setSearchTitle('');
              setSearchDescription('');
            }}
          >
            Limpar
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <>
          <NewsList news={news} onEdit={handleEdit} onDelete={handleDelete} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCancelEdit}
        title={editingNews ? 'Editar Notícia' : 'Nova Notícia'}
      >
        <NewsForm
          onSubmit={editingNews ? handleUpdate : handleCreate}
          initialData={editingNews}
          onCancel={handleCancelEdit}
          isEditing={!!editingNews}
        />
      </Modal>
    </div>
  );
};

export default NewsCrud;
