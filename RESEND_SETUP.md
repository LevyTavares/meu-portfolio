# 📧 Configurando Resend para Enviar Emails

## 🎯 O Que É Resend?

**Resend** é um serviço de email moderno e fácil de usar, perfeito para portfólios e aplicações!

- ✅ **100 emails/dia** no plano gratuito
- ✅ **Sem cartão de crédito** para começar
- ✅ **API super simples** e bem documentada
- ✅ **Templates HTML** prontos
- ✅ **Suporte a variáveis** de ambiente

---

## 🚀 Passo a Passo para Configurar

### 1. **Criar Conta no Resend**

1. Acesse: https://resend.com
2. Clique em **"Sign Up"**
3. Complete o registro (leva 2 minutos)
4. Verifique seu email

### 2. **Gerar API Key**

Após fazer login:

1. Vá para: **Settings** → **API Keys**
2. Clique em **"Create API Key"**
3. Dê um nome: `meu-portfolio-api`
4. **Copie a chave** (será algo como: `re_123456789...`)
5. **GUARDE EM LOCAL SEGURO!** ⚠️

### 3. **Atualizar Seu Email no Worker**

No arquivo `worker/src/index.ts`, procure por esta linha:

```typescript
to: 'isaiaslevi2@gmail.com', // MUDE PARA SEU EMAIL
```

**Mude para seu email real:**

```typescript
to: 'seu-email@gmail.com', // ou seu email pessoal
```

### 4. **Adicionar API Key ao GitHub Secrets**

Esta é a parte importante para produção!

#### No GitHub:

1. Vá para seu repositório
2. **Settings** → **Secrets and variables** → **Actions**
3. Clique em **"New repository secret"**
4. Nome: `RESEND_API_KEY`
5. Valor: Paste da API Key que você copiou do Resend
6. Clique em **"Add secret"**

#### Para Desenvolvimento Local:

Crie um arquivo `.env` no diretório `worker/`:

```bash
# worker/.env
RESEND_API_KEY=re_sua_chave_aqui
```

**⚠️ Não commit este arquivo!** Ele já está no `.gitignore`.

### 5. **Atualizar wrangler.toml**

O arquivo `worker/wrangler.toml` já está configurado, mas você pode verificar:

```toml
[env.production]
vars = { RESEND_API_KEY = "" }
```

Quando fazer deploy, a chave virá do GitHub Secret automaticamente.

### 6. **Testar Localmente (Opcional)**

Se quiser testar com Resend local:

```bash
# No diretório worker/
npm run dev

# Em outro terminal, teste:
curl -X POST http://localhost:8787/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Seu Nome",
    "email": "seu-email@gmail.com",
    "message": "Teste de email"
  }'
```

Se configurado, você deve receber:
- ✅ Email de notificação em seu email
- ✅ Email de confirmação no email do usuário

---

## 📋 Verificação Final

Depois de configurar, verifique:

- [x] Conta Resend criada
- [x] API Key gerada
- [x] Email atualizado em `worker/src/index.ts`
- [x] Secret `RESEND_API_KEY` adicionado no GitHub
- [x] Arquivo `worker/wrangler.toml` OK
- [x] `worker/.env` criado (local) - **NÃO COMMITAR**

---

## 🧪 Teste em Produção

Após fazer deploy:

```bash
# 1. Deploy do worker
cd worker
wrangler deploy

# 2. Atualizar variável de ambiente (se necessário)
wrangler secret put RESEND_API_KEY
# Cole sua API Key quando pedido

# 3. Teste o endpoint
curl -X POST https://meu-portfolio-api.<seu-username>.workers.dev/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Teste",
    "email": "teste@example.com",
    "message": "Email de teste"
  }'
```

---

## 🔄 O Que Acontece Agora?

Quando alguém preenche o formulário:

```
┌─────────────────────┐
│  Frontend (React)   │
│  Formulário enviado │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Backend (Worker)    │
│ Recebe dados        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Resend              │
│ Envia 2 emails      │
└──────────┬──────────┘
           │
    ┌──────┴──────┐
    ▼             ▼
 Seu Email   Email do Usuário
 (notificação)  (confirmação)
```

---

## 📧 Emails Enviados

### 1️⃣ **Email para Você** (Notificação)

```
Assunto: Nova mensagem de [Nome do usuário]

Mostra:
- Nome do visitante
- Email do visitante
- Data e hora
- Mensagem completa
```

### 2️⃣ **Email para o Visitante** (Confirmação)

```
Assunto: Recebemos sua mensagem!

Mensagem:
- Agradecimento
- Confirmação que recebeu
- Echo da mensagem enviada
```

---

## ❓ FAQ

### "Não recebi o email"

1. Verifique a pasta de **SPAM**
2. Confirme se a API Key está correta
3. Verifique se o email está correto em `worker/src/index.ts`
4. Veja os logs: `wrangler tail`

### "Quer testar sem email real?"

Você pode deixar sem Resend! O formulário vai:
- ✅ Aceitar a mensagem
- ✅ Responder com sucesso
- ✅ Apenas não enviará email

### "Como vejo os erros?"

```bash
# Ver logs do worker
wrangler tail

# Você verá mensagens como:
# "Email enviado com sucesso para..."
# ou
# "Erro ao enviar email: ..."
```

### "Quantos emails posso enviar?"

- **Plano Gratuito:** 100 emails/dia
- **Plano Pago:** A partir de $20/mês (emails ilimitados)

---

## 🔗 Links Úteis

- [Resend Docs](https://resend.com/docs)
- [Resend Dashboard](https://resend.com/dashboard)
- [GitHub Secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)

---

## ✨ Agora Você Está Pronto!

Seu portfólio pode receber mensagens de verdade! 🎉

Se tiver dúvidas, confira os logs:

```bash
cd worker
wrangler tail
```

**Boa sorte! 🚀**
