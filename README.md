# The BARBER CUT - Sistema de Agendamento de Barbearia

Aplicação completa para agendamento de serviços de barbearia com frontend em Next.js/TypeScript e backend em Python Flask.

## 📋 Estrutura do Projeto

\`\`\`
the-barber-cut/
├── Frontend (Next.js 16)
│   ├── app/
│   │   ├── page.tsx (Splash screen)
│   │   ├── login/ (Página de login)
│   │   ├── signup/ (Página de cadastro)
│   │   ├── services/ (Serviços públicos)
│   │   └── dashboard/ (App protegido)
│   │       ├── page.tsx (Menu principal)
│   │       ├── services/ (Seleção de serviço)
│   │       ├── scheduling/ (Agendamento)
│   │       ├── professionals/ (Seleção de profissional)
│   │       ├── payment/ (Pagamento)
│   │       └── evaluation/ (Avaliação)
│   ├── components/
│   │   └── ui/ (Componentes shadcn/ui)
│   └── lib/
│       ├── api.ts (Chamadas à API)
│       └── auth.ts (Gerenciamento de autenticação)
│
└── Backend (Python Flask)
    ├── app.py (Servidor Flask)
    ├── db.py (Banco de dados SQLite)
    ├── seed_db.py (Popular banco de dados)
    └── requirements.txt (Dependências)
\`\`\`

## 🚀 Como Começar

### Pré-requisitos

- Node.js 18+
- Python 3.9+
- pip

### Setup do Frontend

\`\`\`bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.local.example .env.local

# Rodar em desenvolvimento
npm run dev
\`\`\`

O frontend estará em \`http://localhost:3000\`

### Setup do Backend

\`\`\`bash
cd backend

# Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt

# Popular banco de dados
python seed_db.py

# Rodar servidor
python app.py
\`\`\`

O backend estará em \`http://localhost:5000\`

## 📱 Telas Disponíveis

### Autenticação
- **Splash Screen** - Página inicial com 3 opções (Entrar, Cadastrar, Serviços)
- **Login** - Autenticação com email e senha
- **Signup** - Registro com nome, telefone, email e senha

### App Principal (Autenticado)
- **Dashboard** - Menu principal com 3 opções (Serviços, Agendamento, Avaliação)
- **Seleção de Serviços** - Escolha entre Corte, Tintura, Barba e Bigode, Outro
- **Agendamento** - Seleção de data e hora
- **Seleção de Profissional** - Escolha de barbeiro disponível
- **Pagamento** - Escolha de método (Cartão, Pix, Dinheiro)
- **Avaliação** - Classificação (1-5 estrelas) e comentário

## 🔑 Endpoints da API

### Autenticação
- \`POST /api/auth/signup\` - Registrar novo usuário
- \`POST /api/auth/login\` - Fazer login
- \`GET /api/user\` - Obter dados do usuário (requer token)

### Serviços
- \`GET /api/services\` - Listar todos os serviços

### Profissionais
- \`GET /api/professionals\` - Listar todos os profissionais

### Agendamentos
- \`POST /api/appointments\` - Criar novo agendamento
- \`GET /api/appointments\` - Listar agendamentos do usuário

### Pagamentos
- \`POST /api/payments\` - Processar pagamento

### Avaliações
- \`POST /api/reviews\` - Criar avaliação
- \`GET /api/reviews/:professional_id\` - Listar avaliações de profissional

## 🔐 Autenticação

O app usa JWT (JSON Web Tokens) para autenticação. O token é armazenado no localStorage e incluído em todas as requisições autenticadas.

\`\`\`
Header: Authorization: Bearer <token>
\`\`\`

## 🎨 Design

- **Cores**: Tons quentes (marrom/bege) com acentos em burgundy
- **Layout**: Mobile-first e responsivo
- **Componentes**: shadcn/ui com Tailwind CSS v4
- **Logo**: The BARBER CUT com estilo premium

## 📦 Dependências Principais

### Frontend
- Next.js 16
- TypeScript
- Tailwind CSS v4
- shadcn/ui

### Backend
- Flask 2.3
- Flask-CORS 4.0
- PyJWT 2.8
- Werkzeug 2.3

## 🗄️ Banco de Dados

SQLite com as seguintes tabelas:
- \`users\` - Usuários da plataforma
- \`services\` - Serviços oferecidos
- \`professionals\` - Profissionais
- \`appointments\` - Agendamentos
- \`payments\` - Pagamentos
- \`reviews\` - Avaliações

## 🚀 Deploy

### Frontend (Vercel)
\`\`\`bash
npm run build
vercel deploy
\`\`\`

### Backend (Heroku/Railway/Render)
\`\`\`bash
git push heroku main
\`\`\`

Certifique-se de configurar as variáveis de ambiente em produção.

## 📝 Variáveis de Ambiente

### Frontend (.env.local)
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

### Backend (.env)
\`\`\`
SECRET_KEY=your-the-barber-cut-secret-key-change-in-production
DATABASE=the-barber-cut.db
FLASK_ENV=production
\`\`\`

## 🤝 Contribuição

Sinta-se livre para abrir issues e pull requests!

## 📄 Licença

MIT
