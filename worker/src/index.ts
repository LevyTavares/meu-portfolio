import { Resend } from 'resend';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Interface do ambiente
interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
}

// Interface para contato
interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

// Helper para enviar respostas JSON
function json(data: Record<string, unknown> | unknown[], status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return character;
    }
  });
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
        const { name, email, message } = (await request.json()) as ContactRequest;

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

        if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) {
          return json(
            {
              error:
                'Configuração de email incompleta. Defina RESEND_API_KEY e CONTACT_TO_EMAIL.',
            },
            500
          );
        }

        const resend = new Resend(env.RESEND_API_KEY);

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

        const ownerEmailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6ba3ff; border-bottom: 1px solid #6ba3ff; padding-bottom: 10px;">
              Nova Mensagem do Portfólio
            </h2>

            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Nome:</strong> ${safeName}</p>
              <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
              <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
            </div>

            <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #6ba3ff;">
              <h3 style="margin-top: 0;">Mensagem:</h3>
              <p style="line-height: 1.6; color: #333;">${safeMessage}</p>
            </div>

            <div style="margin-top: 20px; color: #999; font-size: 12px;">
              <p>Este é um email automático do seu portfólio. Para responder, envie um email para ${safeEmail}.</p>
            </div>
          </div>
        `;

        const confirmationEmailHtml = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <div style="padding: 40px 0; text-align: center;">
              <h2 style="margin: 0; font-size: 24px; font-weight: 600; color: #000;">Obrigado por entrar em contato!</h2>
            </div>

            <div style="padding: 0 20px;">
              <p style="margin: 20px 0; font-size: 15px; line-height: 1.6;">Olá <strong>${safeName}</strong>,</p>

              <p style="margin: 20px 0; font-size: 15px; line-height: 1.6;">Recebemos sua mensagem com sucesso. Vou revisar e responder em breve.</p>

              <div style="margin: 30px 0; padding: 20px; background: #fafafa; border-radius: 8px; border-left: 3px solid #6ba3ff;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Sua mensagem:</p>
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #333;">${safeMessage}</p>
              </div>

              <p style="margin: 30px 0 0 0; font-size: 14px; line-height: 1.6; color: #666;">Atenciosamente,<br><strong style="color: #000;">Vessel</strong><br><span style="color: #999;">Frontend Developer</span></p>
            </div>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5; text-align: center; font-size: 12px; color: #999;">
              <p style="margin: 0;">Este é um e-mail automático. Por favor, não responda diretamente para este endereço.</p>
            </div>
          </div>
        `;

        try {
          await Promise.all([
            resend.emails.send({
              from: 'Vessel <contato@fnuf.me>',
              to: env.CONTACT_TO_EMAIL,
              reply_to: email,
              subject: `Nova mensagem de ${name}`,
              html: ownerEmailHtml,
            }),
            resend.emails.send({
              from: 'Vessel <contato@fnuf.me>',
              to: email,
              subject: 'Recebemos sua mensagem!',
              html: confirmationEmailHtml,
            }),
          ]);

          console.log(`Email enviado com sucesso para ${email}`);
        } catch (emailError) {
          console.error('Erro ao enviar email:', emailError);
          return json(
            {
              error:
                emailError instanceof Error
                  ? emailError.message
                  : 'Erro ao enviar email',
            },
            500
          );
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
