function gerarGraficoRAM(idMaquina) {
    chart_div.style.display = 'none';
    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/medidas/ultimas/ram/${idMaquina}`, {
            cache: 'no-store'
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

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
    var dados = {
        labels: [],
        datasets: [{
            yAxisID: 'y-RAM',
            label: 'RAM',
            borderColor: '#fffff',
            backgroundColor: '#bdbdbd',
            fill: false,
            data: []
        }]
    };

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dados.labels.push(registro.momento_grafico);
        dados.datasets[0].data.push(registro.percentage_usage);
    }

    var ctx = canvas_grafico.getContext('2d');
    window.grafico_linha = Chart.Line(ctx, {
        data: dados,
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

    //Atualiza os dados de 2 em 2 segundos
    setTimeout(() => atualizarGraficoRAM(idMaquina, dados), 4000);
}

// só mexer se quiser alterar o tempo de atualização
// ou se souber o que está fazendo!
function atualizarGraficoRAM(idMaquina, dados) {
    fetch(`/medidas/tempo-real/ram/${idMaquina}`, {
            cache: 'no-store'
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (novoRegistro) {

                    // console.log(`Dados recebidos: ${JSON.stringify(novoRegistro.percentage_usage)}`);
                    // console.log(`Dados atuais do gráfico: ${dados}`);
                    // tirando e colocando valores no gráfico
                    dados.labels.shift();
                    dados.labels.push(novoRegistro[0].momento_grafico)
                    dados.datasets[0].data.shift(); // incluir um novo momento
                    dados.datasets[0].data.push(novoRegistro[0].percentage_usage); // incluir uma nova medida de umidade
                    window.grafico_linha.update();


                    setTimeout(() => atualizarGraficoRAM(idMaquina, dados),
                        5000);
                    proximaAtualizacao = setInterval(() => atualizarLabel(idMaquina, dados), 5000);

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
                proximaAtualizacao = setTimeout(() => atualizarGraficoRAM(idMaquina, dados), 4000);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}