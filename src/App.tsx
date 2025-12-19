import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import CepPage from './pages/CepPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <nav className="header-nav">
            <Link to="/" className="nav-link">
              Início
            </Link>
            <Link to="/news" className="nav-link">
              Notícias
            </Link>
            <Link to="/cep" className="nav-link">
              Busca CEP
            </Link>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/cep" element={<CepPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
