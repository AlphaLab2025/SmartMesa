document.addEventListener("DOMContentLoaded", () => {
    const tabelaBody = document.getElementById("reservas-body");

    async function carregarReservas() {
        try {
            const response = await fetch("http://localhost:3000/mesa/mesas/reservadas");
            const mesas = await response.json();

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
                            <td><button class="btn-cancelar" data-id="${reserva.id}">Cancelar</button></td>
                        `;

                        tabelaBody.appendChild(linha);
                    }
                });
            });

            adicionarListenersCancelamento();

        } catch (error) {
            console.error("Erro ao carregar reservas:", error);
        }
    }

    function adicionarListenersCancelamento() {
        const botoes = document.querySelectorAll(".btn-cancelar");

        botoes.forEach(botao => {
            botao.addEventListener("click", async () => {
                const idReserva = botao.getAttribute("data-id");

                const confirmar = confirm("Deseja cancelar esta reserva?");
                if (!confirmar) return;

                try {
                    const resposta = await fetch("http://localhost:3000/atendente/cancelar", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ id: idReserva })
                    });

                    const resultado = await resposta.json();

                    if (resposta.ok) {
                        alert("Reserva cancelada com sucesso!");
                        carregarReservas();
                    } else {
                        alert("Erro ao cancelar: " + (resultado.erro || resultado.mensagem));
                    }
                } catch (err) {
                    console.error("Erro ao cancelar reserva:", err);
                    alert("Erro de comunicação com o servidor.");
                }
            });
        });
    }

    carregarReservas();
});
