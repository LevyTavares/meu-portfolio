# 📧 Guia Completo: Teste de Email com Resend

## ✅ Passo 1: Criar Conta no Resend (Autenticar com GitHub)

1. **Na página GitHub que abriu agora:**
   - Faça login com suas credenciais do GitHub
   - Ou crie uma conta se não tiver
   - Autorize o Resend a acessar seus dados do GitHub

2. **Você será redirecionado para o Dashboard do Resend** ✨

---

## 🔑 Passo 2: Gerar API Key

1. No dashboard do Resend, vá para **Settings** (canto inferior esquerdo)
2. Clique em **API Keys**
3. Clique em **Create New API Key** (botão roxo/azul)
4. Escolha um nome (ex: "Portfolio Emails")
5. Confirme
6. **Copie a chave que aparece** (formato: `re_xxxxxxxx...`)
   - ⚠️ Será exibida UMA VEZ APENAS. Se perder, gere outra!

---

## 🛠️ Passo 3: Configurar no seu Projeto

### **Option A: Arquivo de Ambiente Local** (para teste local)

1. Abra o terminal em `/home/fnuf/meu-portfolio/worker/`

2. Crie o arquivo `.env`:
```bash
cat > .env << 'EOF'
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
EOF
```

3. **Substitua `re_xxxxxxxxxxxxxxxxxxxxx` pela sua chave real**

4. Salve (Ctrl+S ou Cmd+S)

5. **Reinicie o servidor do worker:**
```bash
npm run dev
```

---

## 🧪 Passo 4: Testar Email ao Vivo

1. **Abra** http://localhost:5173 (seu portfolio)

2. **Scroll até** a seção "Entre em Contato" (Contact Form)

3. **Preencha o formulário:**
   - **Nome:** Seu nome ou "Teste"
   - **Email:** Pode usar qualquer email válido (ex: seu email pessoal)
   - **Mensagem:** "Teste de email do meu portfolio"

4. **Clique em "Enviar Mensagem"**

5. **Verifique seu email:**
   - Você receberá um email de confirmação em poucos segundos
   - isaiaslevi2@gmail.com receberá uma notificação com seus dados

6. **Se tudo funcionar:**
   - ✅ Você receberá: "Recebemos sua mensagem!"
   - ✅ Admin (isaiaslevi2@gmail.com) receberá os detalhes
   - ✅ Emails estarão formatados com o tema Hollow Knight!

---

## 🚀 Passo 5: Depois de Testar - Deploy em Produção

### **A. Adicionar API Key no GitHub Secrets**

1. Vá para seu repositório no GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Nome: `RESEND_API_KEY`
5. Valor: Cole sua chave `re_xxxxxxxx...`
6. Salve

### **B. Deploy do Worker**

```bash
cd /home/fnuf/meu-portfolio/worker
wrangler deploy --env production
```

Copie a URL que aparece (ex: `https://meu-portfolio-api.xxxxx.workers.dev`)

### **C. Atualizar `.env.production`**

```bash
VITE_API_URL=https://meu-portfolio-api.xxxxx.workers.dev
```

### **D. Push para GitHub**

```bash
git add .
git commit -m "Configure Resend API for email delivery"
git push origin main
```

GitHub Actions fará o deploy automaticamente!

---

## ❓ Troubleshooting

### Email não chegou?
- [ ] Verifique a pasta de SPAM
- [ ] Confirme que a API Key foi gerada corretamente
- [ ] Reinicie o servidor: `npm run dev`
- [ ] Verifique se `.env` tem a chave certa (sem espaços)

### "Failed to authenticate" no console?
- [ ] `.env` não foi criado no lugar certo (`worker/.env`)
- [ ] Chave da API contém erros ou está incompleta
- [ ] Servidor não foi reiniciado

### "CORS error" no navegador?
- [ ] Verifique que `VITE_API_URL` aponta para `http://localhost:8787`
- [ ] Worker está rodando? (`wrangler dev`)

---

## 📊 Resultado Esperado

Quando tudo funciona:

**Terminal (Worker):**
```
✅ [POST] /api/contact - 200 OK
✅ Email enviado para isaiaslevi2@gmail.com
✅ Email de confirmação enviado para [seu-email]
```

**Browser:**
```
✅ Formulário desaparece
✅ Mensagem verde: "Mensagem enviada com sucesso!"
```

**Seu Email:**
```
✅ Recebe: "Recebemos sua mensagem!"
✅ Formatação Hollow Knight (fundo escuro, azul neon)
```

**isaiaslevi2@gmail.com:**
```
✅ Recebe notificação com: Nome, Email, Mensagem
✅ Mesmo tema visual
```

---

## 🎮 Você Consegue!

Esse é o último passo para sua aplicação ficar 100% funcional. Após isso:

- ✅ Portfolio com tema Hollow Knight
- ✅ Contact form interativo
- ✅ Emails automáticos
- ✅ Deploy em Cloudflare
- ✅ GitHub Actions CI/CD

**Bora começar! 🚀**
