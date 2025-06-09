document.addEventListener("DOMContentLoaded", () => {
    const garcomId = localStorage.getItem("garcomId");
    const tabelaBody = document.getElementById("reservas-body");

    // Função para carregar as reservas pendentes
    async function carregarReservas() {
        try {
            const response = await fetch("http://localhost:3000/mesa/mesas/reservadas");
            const mesas = await response.json();

            // Limpa a tabela antes de adicionar novos dados
            tabelaBody.innerHTML = "";

            mesas.forEach(mesa => {
                mesa.reservas.forEach(reserva => {
                    if (reserva.status === "RESERVADA") {
                        const linha = document.createElement("tr");

                        const data = new Date(reserva.dataHora);
                        const dataFormatada = data.toLocaleDateString();
                        const horaFormatada = data.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                        linha.innerHTML = `
                            <td>${dataFormatada}</td>
                            <td>${horaFormatada}</td>
                            <td>${mesa.numero}</td>
                            <td>${reserva.nomeCliente || '---'}</td>
                            <td><button class="btn-confirmar" data-id="${reserva.id}">Confirmar</button></td>
                        `;

                        tabelaBody.appendChild(linha);
                    }
                });
            });

            adicionarListenersConfirmacao();

        } catch (error) {
            console.error("Erro ao carregar reservas:", error);
        }
    }

    // Função que adiciona o evento de clique nos botões "Confirmar"
    function adicionarListenersConfirmacao() {
        const botoes = document.querySelectorAll(".btn-confirmar");

        botoes.forEach(botao => {
            botao.addEventListener("click", async () => {
                const idReserva = botao.getAttribute("data-id");

                try {
                    const resposta = await fetch("http://localhost:3000/garcom/confirmar", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            id: idReserva,
                            idgarcom: garcomId
                        })
                    });

                    const resultado = await resposta.json();

                    if (resposta.ok) {
                        alert("Reserva confirmada com sucesso!");
                        carregarReservas(); // Atualiza a tabela
                    } else {
                        alert("Erro ao confirmar reserva: " + resultado.mensagem);
                    }

                } catch (err) {
                    console.error("Erro na confirmação da reserva:", err);
                    alert("Erro na comunicação com o servidor.");
                }
            });
        });
    }

    // Carrega as reservas ao iniciar
    carregarReservas();
});
