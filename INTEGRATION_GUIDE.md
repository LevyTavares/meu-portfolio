# 🚀 Guia de Integração - Frontend + Cloudflare Workers

## ✅ Status da Implementação

- ✅ **API Backend**: Cloudflare Workers rodando em `http://localhost:8787`
- ✅ **Frontend**: React + TypeScript + Vite
- ✅ **Formulário de Contato**: Integrado
- ✅ **Variáveis de Ambiente**: Configuradas

---

## 📋 Como Usar

### 1. **Ambiente de Desenvolvimento**

#### Terminal 1 - Iniciar o Backend (Cloudflare Workers)
```bash
cd worker
npx wrangler dev
```

#### Terminal 2 - Iniciar o Frontend (Vite)
```bash
npm run dev
```

Seu portfólio estará disponível em `http://localhost:5173` (ou porta indicada pelo Vite).

---

### 2. **Usar o Componente ContactForm**

Importe o componente em qualquer página do seu portfólio:

```tsx
import { ContactForm } from './components/ContactForm';
import './styles/contact-form.css';

export function ContatoPage() {
  return (
    <div>
      <h1>Entre em Contato</h1>
      <ContactForm />
    </div>
  );
}
```

---

### 3. **API Disponível**

#### Health Check
```bash
curl http://localhost:8787/api/health
```

**Resposta:**
```json
{
  "status": "ok",
  "timestamp": "2026-05-12T17:52:18.947Z"
}
```

#### Enviar Mensagem de Contato
```bash
curl -X POST http://localhost:8787/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "message": "Adorei seu portfólio!"
  }'
```

**Resposta Sucesso:**
```json
{
  "success": true,
  "message": "Mensagem recebida com sucesso!",
  "timestamp": "2026-05-12T17:53:14.120Z"
}
```

#### Obter Lista de Projetos
```bash
curl http://localhost:8787/api/projects
```

**Resposta:**
```json
[
  {
    "id": 1,
    "title": "Projeto 1",
    "description": "Descrição do projeto",
    "url": "https://github.com/seu-usuario/projeto1"
  },
  {
    "id": 2,
    "title": "Projeto 2",
    "description": "Descrição do projeto",
    "url": "https://github.com/seu-usuario/projeto2"
  }
]
```

---

## 📦 Estrutura de Arquivos

```
meu-portfolio/
├── .env.local                          # Variáveis de ambiente (local)
├── .env.example                        # Exemplo de variáveis
├── src/
│   ├── components/
│   │   └── ContactForm.tsx             # Componente do formulário
│   ├── lib/
│   │   └── api.ts                      # Cliente HTTP da API
│   ├── styles/
│   │   └── contact-form.css            # Estilos do formulário
│   └── ...
├── worker/
│   ├── src/
│   │   └── index.ts                    # API do Cloudflare Workers
│   ├── wrangler.toml                   # Configuração do Worker
│   ├── package.json
│   └── tsconfig.json
└── ...
```

---

## 🔧 Configuração de Variáveis de Ambiente

### Arquivo `.env.local` (não fazer commit)
```
VITE_API_URL=http://localhost:8787
```

### Arquivo `.env.example` (fazer commit)
```
VITE_API_URL=http://localhost:8787
```

---

## 📤 Deploy em Produção

### 1. Deploy do Backend (Cloudflare Workers)

```bash
cd worker
wrangler deploy
```

Será publicado em: `https://meu-portfolio-api.<seu-username>.workers.dev`

### 2. Atualizar Variável de Ambiente

Crie um `.env.production.local`:
```
VITE_API_URL=https://meu-portfolio-api.<seu-username>.workers.dev
```

### 3. Deploy do Frontend (Cloudflare Pages)

O GitHub Actions automaticamente fará deploy quando você der push na branch `main`.

---

## 🛠️ Próximas Melhorias

### [ ] Integrar com Serviço de Email
- Opção recomendada: Resend
- Fazer as mensagens chegarem no seu email real

### [ ] Banco de Dados
- Usar Cloudflare D1 (SQLite)
- Armazenar mensagens recebidas

### [ ] Autenticação
- Painel de admin para visualizar mensagens
- Dashboard com estatísticas

### [ ] Rate Limiting
- Proteger contra spam
- Limitar requisições por IP

---

## 🐛 Troubleshooting

### "Port 8787 already in use"
```bash
# Matar processo na porta
lsof -i :8787 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### "Cannot find module '@cloudflare/workers-types'"
```bash
cd worker
npm install
```

### CORS Error no navegador
Certifique-se de que os headers CORS estão no arquivo `worker/src/index.ts` (já estão configurados).

---

## 📚 Referências

- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [React](https://react.dev/)
- [Vite](https://vite.dev/)

---

**Tudo pronto para começar! 🎉**
