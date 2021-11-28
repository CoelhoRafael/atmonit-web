let proximaAtualizacaoCpu;

function gerarGraficoCPU() {
    clearTimeout(proximaAtualizacaoRam)
    let idMaquina = sessionStorage.ID_ATM

    chart_div.style.display = 'none';
    if (proximaAtualizacaoCpu != undefined) {
        clearTimeout(proximaAtualizacaoCpu);
    }

    fetch(`/medidas/ultimas/cpu/${idMaquina}`, {
        cache: 'no-store'
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                plotarGraficoCPU(resposta, idMaquina);
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
function plotarGraficoCPU(resposta, idMaquina) {
    console.log('iniciando plotagem do gráfico...');
    var dadosCPU = {
        labels: [],
        datasets: [{
            yAxisID: 'y-CPU',
            label: 'CPU',
            borderColor: '#fffff',
            backgroundColor: '#ffff',
            fill: false,
            data: []
        }]
    };

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dadosCPU.labels.push(registro.momento_grafico);
        dadosCPU.datasets[0].data.push(Math.trunc(registro.percentage_usage));
    }

    var ctx = canvas_grafico.getContext('2d');
    window.grafico_linha = Chart.Line(ctx, {
        data: dadosCPU,
        //Configurações do gráfico
        options: {
            title: {
                display: true,
                text: 'Histórico recente de uso da CPU'
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-CPU',
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        min: 0
                    },

                    gridLines: {
                        drawOnChartArea: false,
                    },
                },],
            }
        }
    });

    //Atualiza os dadosCPU de 2 em 2 segundos
    setTimeout(() => atualizarGraficoCPU(idMaquina, dadosCPU), 4000);
}

// só mexer se quiser alterar o tempo de atualização
// ou se souber o que está fazendo!
function atualizarGraficoCPU(idMaquina, dadosCPU) {
    fetch(`/medidas/tempo-real/cpu/${idMaquina}`, {
        cache: 'no-store'
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`DadosCPU recebidos: ${JSON.stringify(novoRegistro)}`);
                // console.log(`DadosCPU atuais do gráfico: ${dadosCPU}`);
                // tirando e colocando valores no gráfico
                dadosCPU.labels.shift(); // apagar o primeiro
                dadosCPU.labels.push(novoRegistro[0].momento_grafico);
                dadosCPU.datasets[0].data.shift();
                dadosCPU.datasets[0].data.push(novoRegistro[0].percentage_usage);
                window.grafico_linha.update();


                proximaAtualizacaoCpu = setTimeout(() => atualizarGraficoCPU(idMaquina, dadosCPU),
                    4000);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacaoCpu = setTimeout(() => atualizarGraficoCPU(idMaquina, dadosCPU), 4000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}