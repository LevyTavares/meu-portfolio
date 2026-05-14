# 📧 Guia de Teste de Email com Resend

## 1. Criar a API Key

1. Abra o dashboard do Resend.
2. Vá em `Settings` > `API Keys`.
3. Crie uma nova chave.
4. Copie o valor gerado, que começa com `re_`.

## 2. Configurar o worker

No arquivo [worker/.env](worker/.env), deixe assim:

```bash
RESEND_API_KEY=re_sua_chave_aqui
CONTACT_TO_EMAIL=seu-email@exemplo.com
```

Depois reinicie o worker.

## 3. Testar no navegador

1. Abra o portfólio em `http://localhost:5173`.
2. Preencha o formulário de contato.
3. Envie uma mensagem de teste.
4. Verifique se você recebe o email de confirmação.
5. Verifique se o email definido em `CONTACT_TO_EMAIL` recebe a mensagem do formulário.

## 4. Publicar em produção

1. Adicione `RESEND_API_KEY` e `CONTACT_TO_EMAIL` nos secrets do GitHub.
2. Faça deploy do worker com `wrangler deploy`.
3. Confirme que `VITE_API_URL` aponta para a URL do worker em produção.

## 5. Se algo falhar

- Verifique a pasta de SPAM.
- Confirme que a API key está correta.
- Confirme que o `.env` do worker foi atualizado.
- Reinicie o worker depois de alterar variáveis de ambiente.

## Resultado esperado

Quando funcionar, o formulário deve:

- Enviar uma confirmação para o email digitado no formulário.
- Enviar uma cópia da mensagem para `CONTACT_TO_EMAIL`.
- Responder com sucesso no endpoint `/api/contact`.
