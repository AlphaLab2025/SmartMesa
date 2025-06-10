const form = document.getElementById('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const dados = Object.fromEntries(formData);

  try {
    const response = await fetch('http://localhost:3000/atendente/criar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });

    if (response.ok) {
      alert('Mensagem enviada com sucesso!');
    } else {
      const erro = await response.json();
      alert('Erro ao enviar: ' + (erro.message || erro.erro || 'Erro desconhecido'));
    }
  } catch (error) {
    alert('Erro de rede ou servidor: ' + error.message);
  }
})