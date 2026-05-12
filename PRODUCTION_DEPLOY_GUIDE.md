# 🚀 Guia de Deploy em Produção

## 📊 Ambiente Atual

- **Frontend:** React + Vite (http://localhost:5173)
- **Backend:** Cloudflare Workers (http://localhost:8787)
- **CI/CD:** GitHub Actions (Deploy automático no Pages)
- **Hospedagem:** Cloudflare (Pages + Workers)

---

## 🔄 Fluxo de Deploy

```
┌─────────────────┐
│   git push      │
│  (branch main)  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│  GitHub Actions CI/CD           │
│  1. Build (npm run build)       │
│  2. Deploy (npm run preview)    │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  Cloudflare Pages               │
│  📍 https://meu-portfolio...    │
│      pages.dev                  │
└─────────────────────────────────┘
```

---

## 📋 Checklist Antes de Fazer Deploy

### 1. **Verificar as Variáveis de Ambiente**

#### Frontend (Raiz do projeto)
```bash
# .env.production (criar se não existir)
VITE_API_URL=https://meu-portfolio-api.<seu-username>.workers.dev
```

**Onde encontrar seu username:**
- Acesse: https://dash.cloudflare.com/
- Seu username está no perfil
- Ou veja ao fazer deploy do worker

#### Backend (worker/)
```bash
# Não precisa de .env, mas confira o wrangler.toml
# Deve ter seu account_id correto
```

### 2. **Testar Build Local**

```bash
# Frontend
npm run build
npm run preview  # Simula produção local

# Backend
cd worker
npx wrangler deploy --dry-run  # Testa sem fazer deploy
```

### 3. **Verificar Git**

```bash
# Certifique-se de estar na branch main
git branch

# Adicione e commite todas as mudanças
git add .
git commit -m "chore: adicionar backend cloudflare workers"

# Verifique o status
git status
```

---

## 🚀 Executar Deploy

### **Opção 1: Deploy Manual (Teste)**

#### Backend (Cloudflare Workers)
```bash
cd worker
npx wrangler deploy
```

**Output esperado:**
```
✨ Successfully published your Worker to
   https://meu-portfolio-api.<seu-username>.workers.dev
```

**Salve essa URL** - você vai usar no frontend!

#### Frontend (Verifica se build funciona)
```bash
npm run build
npm run preview
```

### **Opção 2: Deploy Automático (Recomendado)**

O GitHub Actions já está configurado para fazer tudo automaticamente!

```bash
# Apenas fazer push para main
git push origin main

# GitHub Actions irá automaticamente:
# 1. Fazer build do projeto
# 2. Deploy no Cloudflare Pages
# 3. URL: https://meu-portfolio.pages.dev
```

**Acompanhe em:** `https://github.com/seu-usuario/meu-portfolio/actions`

---

## 🔧 Configurar Worker em Produção

Após o primeiro deploy do worker, você precisa atualizar a URL no frontend:

### 1. Copie a URL do Worker
Após `wrangler deploy`, você receberá:
```
https://meu-portfolio-api.<seu-username>.workers.dev
```

### 2. Atualize o arquivo `.env.production` (Frontend)
```bash
# meu-portfolio/.env.production (criar novo arquivo)
VITE_API_URL=https://meu-portfolio-api.<seu-username>.workers.dev
```

### 3. Commit e Push
```bash
git add .env.production
git commit -m "chore: atualizar URL da API para produção"
git push origin main
```

---

## ✅ Validar Deploy

### 1. **Frontend Deployed**
```bash
# Acesse
https://meu-portfolio.pages.dev

# Verifique:
# ✅ Carrega corretamente
# ✅ Formulário de contato aparece
# ✅ Estilos estão aplicados
```

### 2. **Backend Deployed**
```bash
# Teste o health check
curl https://meu-portfolio-api.<seu-username>.workers.dev/api/health

# Deve retornar:
# {"status":"ok","timestamp":"2026-05-12T..."}
```

### 3. **Integração Completa**
```bash
# Acesse o portfólio
# Role até o formulário de contato
# Preencha e envie uma mensagem
# Deve aparecer: "Mensagem enviada com sucesso!"
```

---

## 📊 URLs de Produção

Após deploy bem-sucedido, você terá:

```
🌐 Portfólio (Frontend)
   https://meu-portfolio.pages.dev
   
🔧 API (Backend)
   https://meu-portfolio-api.<seu-username>.workers.dev
   
📊 Dashboard Cloudflare
   https://dash.cloudflare.com/
```

---

## 🔄 Próximas Atualizações

Para fazer novas atualizações no futuro:

```bash
# 1. Faça suas alterações localmente
# 2. Teste tudo funcionando (npm run dev)
# 3. Commit suas mudanças
git add .
git commit -m "feat: descrição da mudança"

# 4. Push para main (GitHub Actions faz o resto!)
git push origin main

# 5. Acompanhe em GitHub Actions
# https://github.com/seu-usuario/meu-portfolio/actions
```

---

## 🐛 Troubleshooting

### "API não está respondendo"
```bash
# Verifique se o worker foi deployado
wrangler deployments list

# Teste o endpoint
curl https://meu-portfolio-api.<seu-username>.workers.dev/api/health

# Se não funcionar, refaça o deploy:
cd worker
wrangler deploy
```

### "Formulário envia mas não recebe resposta"
- Verifique se a `VITE_API_URL` está correta no `.env.production`
- Confirme que o CORS está habilitado no worker
- Teste a API diretamente pelo curl

### "GitHub Actions falhou"
- Verifique se os secrets estão corretos
- Confira o arquivo `.github/workflows/deploy.yml`
- Veja os logs em: Actions → Seu workflow

---

## 📚 Documentos de Referência

- [INTEGRATION_GUIDE.md](../INTEGRATION_GUIDE.md)
- [CLOUDFLARE_WORKERS_SETUP.md](../CLOUDFLARE_WORKERS_SETUP.md)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)

---

## ✨ Status Final

```
✅ Frontend: React + TypeScript + Vite
✅ Backend: Cloudflare Workers
✅ CI/CD: GitHub Actions
✅ Hospedagem: Cloudflare (Pages + Workers)
✅ Formulário: Integrado e Testado
✅ Deploy: Pronto para Produção
```

**Você tem um portfólio full-stack pronto para o mundo! 🌍**
