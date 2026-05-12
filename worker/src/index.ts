import { Resend } from 'resend';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Helper para enviar respostas JSON
function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

// Interface do ambiente
interface Env {
  RESEND_API_KEY?: string;
}

// Handler do worker
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Health check
    if (pathname === '/api/health' && request.method === 'GET') {
      return json({ status: 'ok', timestamp: new Date().toISOString() });
    }

    // Endpoint para formulário de contato
    if (pathname === '/api/contact' && request.method === 'POST') {
      try {
        const { name, email, message } = (await request.json()) as any;

        // Validação simples
        if (!name || !email || !message) {
          return json({ error: 'Campos obrigatórios: name, email, message' }, 400);
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return json({ error: 'Email inválido' }, 400);
        }

        console.log(`Nova mensagem de ${name} (${email}): ${message}`);

        // Tentar enviar email com Resend (se configurado)
        if (env.RESEND_API_KEY) {
          try {
            const resend = new Resend(env.RESEND_API_KEY);

            // Enviar email para você (proprietário)
            await resend.emails.send({
              from: 'noreply@resend.dev',
              to: 'isaiaslevi2@gmail.com', // MUDE PARA SEU EMAIL
              subject: `Nova mensagem de ${name}`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #6ba3ff; border-bottom: 1px solid #6ba3ff; padding-bottom: 10px;">
                    Nova Mensagem do Portfólio
                  </h2>
                  
                  <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Nome:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
                  </div>
                  
                  <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #6ba3ff;">
                    <h3 style="margin-top: 0;">Mensagem:</h3>
                    <p style="line-height: 1.6; color: #333;">${message.replace(/\n/g, '<br>')}</p>
                  </div>
                  
                  <div style="margin-top: 20px; color: #999; font-size: 12px;">
                    <p>Este é um email automático do seu portfólio. Para responder, envie um email para ${email}.</p>
                  </div>
                </div>
              `,
            });

            // Enviar email de confirmação para o usuário
            await resend.emails.send({
              from: 'noreply@resend.dev',
              to: email,
              subject: 'Recebemos sua mensagem!',
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2 style="color: #6ba3ff;">Obrigado por entrar em contato! 💙</h2>
                  
                  <p>Olá ${name},</p>
                  
                  <p>Recebemos sua mensagem e responderemos assim que possível. Valorizamos muito o seu interesse!</p>
                  
                  <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Sua mensagem:</strong></p>
                    <p style="color: #666;">${message.replace(/\n/g, '<br>')}</p>
                  </div>
                  
                  <p>Um abraço,<br><strong>FNUF - Frontend Developer</strong></p>
                </div>
              `,
            });

            console.log(`Email enviado com sucesso para ${email}`);
          } catch (emailError) {
            console.error('Erro ao enviar email:', emailError);
            // Não falhar se o email não for enviado, apenas registrar o erro
          }
        }

        return json({
          success: true,
          message: 'Mensagem recebida com sucesso!',
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Erro ao processar contato:', error);
        return json({ error: 'Erro ao processar requisição' }, 500);
      }
    }

    // Endpoint para obter projetos
    if (pathname === '/api/projects' && request.method === 'GET') {
      const projects = [
        {
          id: 1,
          title: 'Projeto 1',
          description: 'Descrição do projeto',
          url: 'https://github.com/seu-usuario/projeto1',
        },
        {
          id: 2,
          title: 'Projeto 2',
          description: 'Descrição do projeto',
          url: 'https://github.com/seu-usuario/projeto2',
        },
      ];

      return json(projects);
    }

    // 404 para rotas não encontradas
    return json({ error: 'Rota não encontrada' }, 404);
  },
};
