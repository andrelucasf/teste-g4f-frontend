import React, { useState } from 'react';
import { searchCEP } from '../../services/cepService';
import './CepSearch.css';
import type { ZipCodeData } from '../../types';

const CepSearch: React.FC = () => {
  const [cep, setCep] = useState('');
  const [cepData, setCepData] = useState<ZipCodeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCepData(null);

    try {
      const data = await searchCEP(cep);
      setCepData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar CEP');
    } finally {
      setLoading(false);
    }
  };

  const formatCep = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 5) {
      return cleaned;
    }
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCep(e.target.value);
    setCep(formatted);
  };

  return (
    <div className="cep-search-container">
      <h2>Busca de CEP</h2>
      <form onSubmit={handleSearch} className="cep-form">
        <div className="form-group">
          <input
            type="text"
            value={cep}
            onChange={handleCepChange}
            placeholder="00000-000"
            maxLength={9}
            required
            disabled={loading}
            data-testid="cep-input"
          />
          <button type="submit" disabled={loading} data-testid="search-button">
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </form>

      {error && (
        <div className="error-message" data-testid="error-message">
          {error}
        </div>
      )}

      {cepData && (
        <div className="cep-result" data-testid="cep-result">
          <h3>Resultado:</h3>
          <div className="result-grid">
            <div className="result-item">
              <strong>CEP:</strong> {cepData.cep}
            </div>
            <div className="result-item">
              <strong>Logradouro:</strong> {cepData.logradouro}
            </div>
            <div className="result-item">
              <strong>Bairro:</strong> {cepData.bairro}
            </div>
            <div className="result-item">
              <strong>Cidade:</strong> {cepData.localidade}
            </div>
            <div className="result-item">
              <strong>Estado:</strong> {cepData.uf}
            </div>
            {cepData.complemento && (
              <div className="result-item">
                <strong>Complemento:</strong> {cepData.complemento}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CepSearch;
