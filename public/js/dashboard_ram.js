let proximaAtualizacaoRam;


cpu_card_info = document.getElementById('cpu_card')
ram_card_info = document.getElementById('ram_card')

function gerarGraficoRAM() {
    cpu_card_info.classList.remove("expand-selected")
    ram_card_info.classList.add("expand-selected")

    let idMaquina = sessionStorage.ID_ATM

    chart_div.style.display = 'none';
    
    if (proximaAtualizacaoRam != undefined) {
        clearTimeout(proximaAtualizacaoRam);
    }

    fetch(`/medidas/ultimas/ram/${idMaquina}`, {
            cache: 'no-store'
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    plotarGraficoRAM(resposta, idMaquina);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

// só altere aqui se souber o que está fazendo!
function plotarGraficoRAM(resposta, idMaquina) {
    console.log('iniciando plotagem do gráfico...');
    var dadosRam = {
        labels: [],
        datasets: [{
            yAxisID: 'y-RAM',
            label: 'RAM',
            borderColor: 'rgb(234, 122, 11)',
            backgroundColor: 'orange',
            fill: false,
            data: []
        }]
    };

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dadosRam.labels.push(registro.momento_grafico);
        dadosRam.datasets[0].data.push(registro.percentage_usage);
    }

    var ctx = canvas_grafico.getContext('2d');
    window.grafico_linha = Chart.Line(ctx, {
        data: dadosRam,
        //Configurações do gráfico
        options: {
            title: {
                display: true,
                text: 'Histórico recente de uso da RAM'
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-RAM',
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        min: 0
                    },
                    gridLines: {
                        drawOnChartArea: false,
                    },
                }, ],
            }
        }
    });

    //Atualiza os dadosRam de 2 em 2 segundos
    setTimeout(() => atualizarGraficoRAM(idMaquina, dadosRam), 4000);
}

function atualizarGraficoRAM(idMaquina, dadosRam) {
    fetch(`/medidas/tempo-real/ram/${idMaquina}`, {
            cache: 'no-store'
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (novoRegistro) {

                    // console.log(`DadosRam recebidos: ${JSON.stringify(novoRegistro.percentage_usage)}`);
                    // console.log(`DadosRam atuais do gráfico: ${dadosRam}`);
                    // tirando e colocando valores no gráfico
                    dadosRam.labels.shift();
                    dadosRam.labels.push(novoRegistro[0].momento_grafico)
                    dadosRam.datasets[0].data.shift(); // incluir um novo momento
                    dadosRam.datasets[0].data.push(novoRegistro[0].percentage_usage); // incluir uma nova medida de umidade
                    window.grafico_linha.update();


                    proximaAtualizacaoRam = setTimeout(() => atualizarGraficoRAM(idMaquina, dadosRam),
                        4000);

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
                proximaAtualizacaoRam = setTimeout(() => atualizarGraficoRAM(idMaquina, dadosRam), 4000);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dadosRam p/ gráfico: ${error.message}`);
        });

}