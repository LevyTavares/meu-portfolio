# Cloudflare Workers API - Guia de Setup

## 📋 Pré-requisitos

1. Conta no Cloudflare com acesso a Workers
2. Node.js 18+ instalado
3. `wrangler` CLI

## 🚀 Configuração Local

### 1. Instalar Wrangler

```bash
npm install -g wrangler
```

### 2. Clonar o repositório e instalar dependências do worker

```bash
cd worker
npm install
```

### 3. Autenticar com Cloudflare

```bash
wrangler login
```

Isso abrirá o navegador para você autorizar a CLI do Cloudflare.

### 4. Copiar variáveis de ambiente

```bash
cp .env.example .env.local
```

Configure a URL da API:
- **Desenvolvimento local:** `http://localhost:8787`
- **Produção:** `https://api.seudominio.com` ou `https://meu-portfolio.pages.dev`

### 5. Executar em desenvolvimento

```bash
# No diretório /worker
wrangler dev
```

Isso iniciará o servidor local em `http://localhost:8787`

## 🧪 Testar a API

### Health Check
```bash
curl http://localhost:8787/api/health
```

### Enviar Mensagem de Contato
```bash
curl -X POST http://localhost:8787/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "message": "Olá! Adorei seu portfólio."
  }'
```

### Obter Projetos
```bash
curl http://localhost:8787/api/projects
```

## 📤 Fazer Deploy na Produção

### 1. Configurar o wrangler.toml

Atualize o arquivo `wrangler.toml` com suas informações do Cloudflare:
- Substitua `YOUR_ZONE_ID` pelo seu Zone ID real
- Você pode encontrar isso no dashboard do Cloudflare

### 2. Deploy

```bash
wrangler deploy
```

### 3. Configurar variáveis de ambiente na produção

```bash
wrangler secret put CLOUDFLARE_ACCOUNT_ID
wrangler secret put CLOUDFLARE_API_TOKEN
```

## 🔗 Integrar com o Frontend

Use o `apiClient` do arquivo `src/services/api.ts`:

```typescript
import { sendContactMessage, getProjects } from './services/api';

// Enviar mensagem
await sendContactMessage({
  name: 'João',
  email: 'joao@example.com',
  message: 'Olá!'
});

// Obter projetos
const projects = await getProjects();
```

## 🎨 Usar o Componente de Contato

```tsx
import { ContactForm } from './components/ContactForm';

export default function App() {
  return (
    <div>
      <h1>Meu Portfólio</h1>
      <ContactForm />
    </div>
  );
}
```

## 📝 Próximas Melhorias

- [ ] Integrar com serviço de email (SendGrid, Resend, etc)
- [ ] Adicionar banco de dados (D1 do Cloudflare)
- [ ] Implementar autenticação
- [ ] Adicionar ratelimiting
- [ ] Criar dashboard de mensagens recebidas

## 🆘 Troubleshooting

### CORS Error
Se receber erro de CORS, certifique-se de que os headers CORS estão sendo retornados. O arquivo `src/index.ts` já inclui isso.

### Porta 8787 em uso
```bash
wrangler dev --port 3000
```

### Erro de autenticação
```bash
wrangler logout
wrangler login
```

## 📚 Documentação

- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [itty-router](https://itty.dev/)
