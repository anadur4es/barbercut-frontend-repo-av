# Guia Completo de Setup - The BARBER CUT

## 1. Clonar o Repositório

\`\`\`bash
git clone <seu-repo>
cd the-barber-cut
\`\`\`

## 2. Setup do Frontend

### Instalar dependências
\`\`\`bash
npm install
\`\`\`

### Verificar instalação
\`\`\`bash
npm list next typescript react
\`\`\`

### Criar arquivo .env.local
\`\`\`bash
cp .env.example .env.local
\`\`\`

Conteúdo:
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

### Rodar em desenvolvimento
\`\`\`bash
npm run dev
\`\`\`

Acesse: http://localhost:3000

## 3. Setup do Backend

### Entrar na pasta backend
\`\`\`bash
cd backend
\`\`\`

### Criar ambiente virtual
\`\`\`bash
# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
\`\`\`

### Instalar dependências Python
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### Criar arquivo .env
\`\`\`bash
cp .env.example .env
\`\`\`

Conteúdo padrão (.env):
\`\`\`
SECRET_KEY=your-the-barber-cut-secret-key-change-in-production
DATABASE=the-barber-cut.db
FLASK_ENV=development
\`\`\`

### Inicializar banco de dados
\`\`\`bash
python seed_db.py
\`\`\`

Você verá: \`Database seeded successfully!\`

### Rodar servidor Flask
\`\`\`bash
python app.py
\`\`\`

Você verá:
\`\`\`
* Running on http://127.0.0.1:5000
\`\`\`

## 4. Testar a Integração

### 1. Abra dois terminais:
- Terminal 1: Frontend rodando (\`npm run dev\`)
- Terminal 2: Backend rodando (\`python app.py\`)

### 2. Teste o Signup
- Acesse http://localhost:3000
- Clique em "Cadastrar"
- Preencha os dados:
  - Nome: Jose Carlos
  - Email: jose@test.com
  - Telefone: (31) 98899-7766
  - Senha: senha123
- Clique em "Cadastrar"

Se tudo funcionar, você será redirecionado para o \`/dashboard\`

### 3. Teste o Login
- Volte para home
- Clique em "Entrar"
- Use as credenciais que cadastrou
- Clique em "Entrar"

## 5. Arquivos Importantes

### Frontend
- \`app/layout.tsx\` - Layout principal (layout.tsx)
- \`app/page.tsx\` - Splash screen
- \`lib/api.ts\` - Todas as chamadas à API
- \`lib/auth.ts\` - Gerenciamento de autenticação (tokens)

### Backend
- \`app.py\` - Servidor Flask e todas as rotas
- \`db.py\` - Inicialização do banco e helpers
- \`seed_db.py\` - Script para popular banco com dados iniciais

## 6. Solução de Problemas

### Erro: CORS Error

**Problema**: Frontend não consegue acessar backend
- Verifique se ambos estão rodando (http://localhost:3000 e http://localhost:5000)
- Verifique \`NEXT_PUBLIC_API_URL\` no .env.local
- Reinicie ambos os servidores

### Erro: Database is locked

**Problema**: SQLite bloqueado
\`\`\`bash
# Delete o banco de dados e recriar
rm backend/the-barber-cut.db
cd backend && python seed_db.py
\`\`\`

### Erro: Port 5000 em uso

**Solução**: Mudar porta no app.py
\`\`\`python
if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Mude para 5001 ou outra porta
\`\`\`

E atualize NEXT_PUBLIC_API_URL em .env.local

### Erro: Module not found (Python)

\`\`\`bash
# Verifique se o venv está ativado
pip install -r requirements.txt
\`\`\`

## 7. Estructura de Fluxo de Dados

### Signup/Login
\`\`\`
Form (Componente) 
  → auth.ts (setToken) 
  → API (app.py/auth/signup)
  → DB (SQLite)
  → JWT Token
  → localStorage
\`\`\`

### Criar Agendamento
\`\`\`
Form (Componente)
  → localStorage (data, hora, profissional)
  → API (app.py/appointments)
  → DB (insert appointement)
  → Confirmar Pagamento
  → API (app.py/payments)
  → Avaliar Serviço
  → API (app.py/reviews)
\`\`\`

## 8. Próximos Passos (Opcional)

- [ ] Adicionar upload de fotos de profissionais
- [ ] Implementar notificações por email
- [ ] Adicionar sistema de notificações em tempo real (WebSockets)
- [ ] Criar dashboard de admin para gerenciar serviços e profissionais
- [ ] Integrar com Stripe para pagamentos reais
- [ ] Deploy em produção

## 📞 Suporte

Se tiver problemas:
1. Verifique se ambos os servidores estão rodando
2. Limpe cache do navegador (F12 → Application → Clear Storage)
3. Verifique console do navegador (F12 → Console)
4. Verifique logs do Flask no terminal
