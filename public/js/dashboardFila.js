

function plotarGrafico() {
    var dados = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        datasets: [{
            yAxisID: 'y-fila',
            label: 'Uso',
            borderColor: '#fffff',
            backgroundColor: '#ffff',
            fill: true,
            data: [0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                44,
                61,
                75,
                79,
                75,
                69,
                64,
                58,
                48,
                35,
                21,
                9,
                0,
                0
            ]
        }]
    };
    var ctx = canvas_grafico.getContext('2d');
    window.grafico_linha = Chart.Bar(ctx, {
        data: dados,
        //Configurações do gráfico
        options: {
            title: {
                display: true,
                text: 'Histórico de uso do caixa no dia'
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-fila',
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        min: 0
                    },
                    gridLines: {
                        drawOnChartArea: false
                    },
                }, ],
            }
        }
    });

}