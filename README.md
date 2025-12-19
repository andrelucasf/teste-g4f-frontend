# 📰 Sistema de Notícias e Busca de CEP - Frontend

Sistema frontend desenvolvido em React + TypeScript para gerenciamento de notícias e busca de CEP, integrado com backend NestJS.

## 🚀 Tecnologias Utilizadas

- **React 18.2** - Biblioteca para construção de interfaces
- **TypeScript 5.3** - Tipagem estática
- **Vite 5.0** - Build tool e dev server
- **Axios** - Cliente HTTP para requisições
- **Vitest** - Framework de testes
- **Testing Library** - Testes de componentes React
- **ESLint + Prettier** - Linting e formatação de código
- **CSS Puro** - Estilização sem frameworks (paleta preto/branco)
- **Docker** - Containerização com build multi-stage

## 📁 Estrutura do Projeto

```
teste-g4f-frontend/
├── src/
│   ├── components/          # Componentes React
│   │   ├── CepSearch/       # Componente de busca de CEP
│   │   ├── NoticiaCrud/     # Container principal de notícias
│   │   ├── NoticiaForm/     # Formulário de criar/editar
│   │   ├── NoticiaList/     # Lista de notícias
│   │   └── Pagination/      # Componente de paginação
│   ├── services/            # Serviços de API
│   │   ├── api.ts           # Cliente Axios configurado
│   │   ├── cepService.ts    # Integração com ViaCEP
│   │   └── noticiaService.ts # CRUD de notícias
│   ├── types/               # Definições TypeScript
│   │   └── index.ts         # Interfaces e tipos
│   ├── tests/               # Testes BDD
│   │   ├── setup.ts         # Configuração do Vitest
│   │   └── CepSearch.test.tsx # Testes do CEP
│   ├── App.tsx              # Componente raiz
│   ├── App.css              # Estilos globais
│   ├── main.tsx             # Entry point
│   └── index.css            # CSS base
├── public/                  # Arquivos estáticos
├── Dockerfile               # Build multi-stage
├── docker-compose.yml       # Orquestração Docker
├── nginx.conf               # Configuração Nginx
├── vite.config.ts           # Configuração Vite
├── vitest.config.ts         # Configuração Vitest
├── tsconfig.json            # Configuração TypeScript
├── .eslintrc.cjs            # Configuração ESLint
├── .prettierrc              # Configuração Prettier
└── package.json             # Dependências
```

### 📐 Justificativa da Estrutura

1. **Componentes por funcionalidade**: Cada componente tem sua pasta com arquivo `.tsx` e `.css`, facilitando manutenção e escalabilidade.

2. **Separação de responsabilidades**:
   - `services/`: Lógica de comunicação com APIs
   - `types/`: Contratos TypeScript centralizados
   - `components/`: UI e lógica de apresentação
   - `tests/`: Testes isolados

3. **CSS modular**: Cada componente tem seu próprio arquivo CSS, evitando conflitos e facilitando manutenção.

4. **Configuração centralizada**: ESLint, Prettier, TypeScript e Vitest configurados na raiz para consistência.

## 🎨 Design System

### Paleta de Cores

- **Primária**: `#000000` (Preto)
- **Secundária**: `#FFFFFF` (Branco)
- Seguindo as especificações do requisito: apenas preto e branco

### Responsividade

- Mobile-first approach
- Breakpoint: `768px` para tablet/desktop
- Componentes adaptam layout em telas menores

## 🔧 Instalação e Execução Local

### Pré-requisitos

- Node.js 20.11.1
- npm 10.2.4

### Instalação

```bash
# Clonar repositório
git clone <url-do-repositorio>
cd teste-g4f-frontend

# Instalar dependências
npm install
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Aplicação estará disponível em http://localhost:5173
```

### Build

```bash
# Criar build de produção
npm run build

# Visualizar preview do build
npm run preview
```

### Linting e Formatação

```bash
# Executar ESLint
npm run lint

# Formatar código com Prettier
npm run format
```

### Testes

```bash
# Executar testes
npm test

# Executar testes com UI
npm run test:ui
```

## 🐳 Docker

### Build e Execução

```bash
# Build da imagem
docker build -t teste-g4f-frontend .

# Executar container
docker run -p 8080:80 teste-g4f-frontend

# Aplicação estará disponível em http://localhost:8080
```

### Docker Compose

```bash
# Iniciar aplicação
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar aplicação
docker-compose down
```

### Dockerfile Multi-Stage

O Dockerfile utiliza build multi-stage para otimização:

1. **Stage 1 (builder)**:
   - Instala dependências
   - Executa build da aplicação
   - Node.js 20.11.1-alpine

2. **Stage 2 (production)**:
   - Nginx Alpine (imagem mínima)
   - Copia apenas arquivos buildados
   - Configuração otimizada do Nginx
   - Imagem final ~25MB

**Benefícios**:

- Imagem final muito menor (não inclui Node.js)
- Cache de layers otimizado
- Segurança (apenas runtime necessário)
- Performance de pull/push melhorada

## 🔗 Integração com Backend

### Configuração

O frontend está configurado para se comunicar com o backend em:

```
http://localhost:3000/api
```

Para alterar a URL, edite:

```typescript
// src/services/api.ts
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});
```

### Endpoints Utilizados

**Notícias:**

- `GET /noticias?page=1&limit=10&titulo=&descricao=` - Listar com paginação e filtros
- `GET /noticias/:id` - Buscar por ID
- `POST /noticias` - Criar notícia
- `PATCH /noticias/:id` - Atualizar notícia
- `DELETE /noticias/:id` - Excluir notícia

**CEP (ViaCEP):**

- `GET https://viacep.com.br/ws/:cep/json/` - Buscar CEP

## ✅ Funcionalidades

### 1. Busca de CEP

- ✅ Integração com ViaCEP API
- ✅ Formatação automática (00000-000)
- ✅ Loading states
- ✅ Tratamento de erros
- ✅ Exibição de resultados formatados
- ✅ Validação de CEP (8 dígitos)

### 2. CRUD de Notícias

- ✅ Listagem com paginação (10 itens por página)
- ✅ Criar nova notícia
- ✅ Editar notícia existente
- ✅ Excluir notícia (com confirmação)
- ✅ Busca por título e descrição
- ✅ Exibição de datas formatadas
- ✅ Integração completa com backend

### 3. Paginação

- ✅ Navegação entre páginas
- ✅ Indicador de página atual
- ✅ Total de páginas dinâmico
- ✅ Botões anterior/próxima

## 🧪 Testes BDD

### Cobertura de Testes

Implementado teste BDD para busca de CEP usando Vitest + Testing Library:

**Scenarios testados:**

1. ✅ Buscar CEP válido com sucesso
2. ✅ Buscar CEP inválido (tratamento de erro)
3. ✅ Exibir loading durante busca
4. ✅ Formatação automática do CEP

**Padrão BDD (Given-When-Then):**

```typescript
describe('Feature: Busca de CEP', () => {
  describe('Scenario: Buscar um CEP válido com sucesso', () => {
    it('Given o usuário está na página de busca de CEP', () => {
      // Setup inicial
    });

    it('When o usuário digita um CEP válido e clica em buscar', async () => {
      // Ação do usuário
    });

    it('Then o sistema deve exibir os dados do endereço', async () => {
      // Verificação do resultado
    });
  });
});
```

### Executar Testes

```bash
# Executar todos os testes
npm test

# Executar com interface gráfica
npm run test:ui

# Executar com coverage
npm test -- --coverage
```

## 📝 Padrões de Código

### ESLint

- Configuração recomendada do TypeScript
- Plugin React Hooks
- Plugin React Refresh
- Máximo 0 warnings em produção

### Prettier

- Semi-colons obrigatórios
- Single quotes
- Print width: 80
- Tab width: 2 espaços
- Trailing commas: ES5

### TypeScript

- Strict mode habilitado
- Tipos explícitos em funções
- Interfaces para contratos
- No any permitido

## 🌐 Variáveis de Ambiente

Não são necessárias variáveis de ambiente para execução local. Para produção, configure:

```env
VITE_API_URL=http://seu-backend.com/api
```

E atualize o arquivo `src/services/api.ts`:

```typescript
baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
```

## 🔒 Segurança

- Headers de segurança configurados no Nginx
- Validação de inputs no frontend
- Tratamento de erros sem expor stack traces
- CORS configurado no backend
- Sem credenciais hardcoded

## 📦 Build de Produção

O build de produção gera:

- Assets minificados
- CSS extraído e otimizado
- Code splitting automático
- Tree shaking
- Source maps (opcional)

Tamanho médio do build: ~150KB (gzipped)

## 🐛 Troubleshooting

### Backend não conecta

- Verifique se o backend está rodando em `http://localhost:3000`
- Verifique CORS no backend
- Confira logs do navegador (F12 > Console)

### Erro ao instalar dependências

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro ao executar testes

```bash
# Verificar setup do Vitest
npm run test -- --reporter=verbose
```

## 📚 Documentação Adicional

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/react)

## 🤝 GitFlow

Este projeto utiliza GitFlow:

```bash
# Branch principal (produção)
main

# Branch de desenvolvimento
develop

# Features
feature/nome-da-feature

# Hotfixes
hotfix/descricao
```

### Workflow

```bash
# Criar feature
git checkout develop
git checkout -b feature/nova-funcionalidade

# Desenvolver e commitar
git add .
git commit -m "feat: adiciona nova funcionalidade"

# Merge na develop
git checkout develop
git merge feature/nova-funcionalidade

# Release para main
git checkout main
git merge develop
git tag -a v1.0.0 -m "Release v1.0.0"
```

## 📄 Licença

Este projeto foi desenvolvido como teste técnico.

---

**Desenvolvido com ❤️ usando React + TypeScript + Vite**
