import { useState } from 'react';
import { sendContactMessage, type ContactMessage, type ContactResponse } from '../lib/api';

export function ContactForm() {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const response: ContactResponse = await sendContactMessage(formData);
      if (response.success) {
        setStatus('success');
        setStatusMessage('Mensagem enviada com sucesso!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(response.error || 'Erro ao enviar mensagem');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage(
        error instanceof Error ? error.message : 'Erro ao enviar mensagem'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Seu nome"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Seu email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <textarea
          name="message"
          placeholder="Sua mensagem"
          value={formData.message}
          onChange={handleChange}
          required
          disabled={loading}
          rows={5}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar Mensagem'}
      </button>

      {status === 'success' && (
        <div className="status-message success">{statusMessage}</div>
      )}
      {status === 'error' && (
        <div className="status-message error">{statusMessage}</div>
      )}
    </form>
  );
}
