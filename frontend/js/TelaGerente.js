const tipoRelatorio = document.getElementById('tipo-relatorio');
const filtrosDinamicos = document.getElementById('filtros-dinamicos');
const form = document.getElementById('form');
const tbody = document.querySelector('tbody');
const mensagemStatus = document.querySelector('.mensagem-status');
const mensagemErro = document.querySelector('.mensagem-erro');

// Limpar campos ao resetar o formulário
form.addEventListener('reset', () => {
  filtrosDinamicos.innerHTML = '';
  tbody.innerHTML = '';
  mensagemStatus.textContent = '';
  mensagemErro.textContent = '';
});

// Mostrar campos extras com base no tipo de relatório
tipoRelatorio.addEventListener('change', () => {
  filtrosDinamicos.innerHTML = '';
  mensagemStatus.textContent = '';
  mensagemErro.textContent = '';

  switch (tipoRelatorio.value) {
    case 'periodo':
      filtrosDinamicos.innerHTML = `
        <label for="inicio">Início:</label>
        <input type="datetime-local" id="inicio" name="inicio" required />
        <label for="fim">Fim:</label>
        <input type="datetime-local" id="fim" name="fim" required />
      `;
      break;

    case 'mesa':
      filtrosDinamicos.innerHTML = `
        <label for="mesa">Número da Mesa:</label>
        <input type="number" id="mesa" name="mesa" min="0" max="11" required />
      `;
      break;

    case 'garcom':
      filtrosDinamicos.innerHTML = `
        <label for="garcom">ID do Garçom:</label>
        <input type="number" id="garcom" name="garcom" required />
      `;
      break;
  }
});

// Buscar relatório
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const tipo = tipoRelatorio.value;
  tbody.innerHTML = '';
  mensagemStatus.textContent = '';
  mensagemErro.textContent = '';

  let url = '';
  let params = {};

  try {
    switch (tipo) {
      case 'periodo':
        const inicio = document.getElementById('inicio').value;
        const fim = document.getElementById('fim').value;

        if (!inicio || !fim) throw new Error('Preencha as datas.');

        url = `http://localhost:3000/gerente/relatorio/periodo?inicio=${inicio}&fim=${fim}`;
        break;

      case 'mesa':
        const mesa = document.getElementById('mesa').value;
        if (!mesa) throw new Error('Informe o número da mesa.');
        url = `http://localhost:3000/gerente/relatorio/mesa/${mesa}`;
        break;

      case 'garcom':
        const garcom = document.getElementById('garcom').value;
        if (!garcom) throw new Error('Informe o ID do garçom.');
        url = `http://localhost:3000/gerente/relatorio/garcom/${garcom}`;
        break;

      default:
        throw new Error('Tipo de relatório inválido.');
    }

    const resposta = await fetch(url);
    const dados = await resposta.json();

    if (dados.mensagem) {
      mensagemStatus.textContent = dados.mensagem;
      return;
    }

    if (!Array.isArray(dados)) {
      throw new Error('Resposta inesperada da API.');
    }

    dados.forEach(reserva => {
      const dataHora = new Date(reserva.dataHora);
      const data = dataHora.toLocaleDateString();
      const hora = dataHora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const linha = `
        <tr>
          <td>${data}</td>
          <td>${hora}</td>
          <td>${reserva.mesaId}</td>
          <td>${reserva.nomeCliente}</td>
          <td>${reserva.status}</td>
        </tr>
      `;
      tbody.innerHTML += linha;
    });

  } catch (err) {
    mensagemErro.textContent = err.message;
  }
});
