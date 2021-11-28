function gerarGraficoDISCO(idMaquina) {
    chart_div.style.display = 'none';
    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/medidas/ultimas/disco/${idMaquina}`, {
            cache: 'no-store'
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();

                    plotarGraficoDISCO(resposta, idMaquina);
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
function plotarGraficoDISCO(resposta, idMaquina) {
    console.log('iniciando plotagem do gráfico...');
    var dados = {
        labels: [],
        datasets: [{
            yAxisID: 'y-DISCO',
            label: 'DISCO',
            borderColor: '#fffff',
            backgroundColor: '#ffff',
            fill: false,
            data: []
        }]
    };

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dados.labels.push(registro.momento_grafico);
        dados.datasets[0].data.push(Math.round(registro.percentage_usage));
    }

    var ctx = canvas_grafico.getContext('2d');
    window.grafico_linha = Chart.Line(ctx, {
        data: dados,
        //Configurações do gráfico
        options: {
            title: {
                display: true,
                text: 'Histórico recente de uso do DISCO'
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-DISCO',
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
    setTimeout(() => atualizarGraficoDISCO(idMaquina, dados), 5000);
}

// só mexer se quiser alterar o tempo de atualização
// ou se souber o que está fazendo!
function atualizarGraficoDISCO(idMaquina, dados) {
    fetch(`/medidas/tempo-real/disco/${idMaquina}`, {
            cache: 'no-store'
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (novoRegistro) {

                    // console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                    // console.log(`Dados atuais do gráfico: ${dados}`);
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento
                    dados.datasets[0].data.shift(); // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].percentage_usage); // incluir uma nova medida de umidade

                    window.grafico_linha.update();

                    setTimeout(() => atualizarGraficoRAM(idMaquina, dados),
                        5000);
                    proximaAtualizacao = setInterval(() => atualizarLabel(idMaquina, dados), 5000);

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
                proximaAtualizacao = setTimeout(() => atualizarGraficoDISCO(idMaquina, dados), 2000);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}