// Script de teste da API Key Resend
const API_KEY = process.env.RESEND_API_KEY;

if (!API_KEY) {
  console.error('❌ RESEND_API_KEY não está definida!');
  process.exit(1);
}

console.log('🔑 Testando API Key Resend...');
console.log(`API Key: ${API_KEY.substring(0, 10)}...`);

// Teste 1: Verificar se consegue chamar a API
async function testResendAPI() {
  try {
    console.log('\n📧 Tentando enviar email de teste...\n');
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@iaontiapix.resend.app',
        to: 'isaiaslevi2@gmail.com',
        subject: 'Teste de API Key Resend',
        html: '<p>Se você vê isso, a API Key está funcionando! ✅</p>',
      }),
    });

    const data = await response.json();
    
    console.log(`Status HTTP: ${response.status}`);
    console.log(`Response:`, JSON.stringify(data, null, 2));

    if (response.status === 200) {
      console.log('\n✅ API Key funciona! Email foi enviado com sucesso!');
      console.log(`ID do Email: ${data.id}`);
      return true;
    } else {
      console.log('\n❌ Erro ao enviar email:');
      console.log(JSON.stringify(data, null, 2));
      return false;
    }
  } catch (error) {
    console.error('\n❌ Erro na requisição:', error.message);
    return false;
  }
}

testResendAPI().then(success => {
  process.exit(success ? 0 : 1);
});
