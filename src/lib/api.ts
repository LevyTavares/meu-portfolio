// Configuração da API do Cloudflare Workers
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
  },
};

// Interface para o formulário de contato
export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success?: boolean;
  message?: string;
  error?: string;
  timestamp?: string;
}

// Função para enviar mensagem de contato
export async function sendContactMessage(data: ContactMessage): Promise<ContactResponse> {
  return apiClient.post<ContactResponse>('/api/contact', data);
}

// Função para obter projetos
export async function getProjects() {
  return apiClient.get('/api/projects');
}

// Função para health check
export async function checkHealth() {
  return apiClient.get('/api/health');
}
