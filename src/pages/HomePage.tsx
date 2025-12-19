import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <h2>Bem-vindo ao Sistema</h2>
      <p>Escolha uma das funcionalidades abaixo:</p>

      <div className="home-cards">
        <Link to="/news" className="home-card">
          <h3>📰 Notícias</h3>
          <p>Gerenciar notícias com CRUD completo</p>
        </Link>

        <Link to="/cep" className="home-card">
          <h3>📍 Busca de CEP</h3>
          <p>Buscar endereços pelo CEP usando ViaCEP</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
