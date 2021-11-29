window.onload = getPopularTimes()

function getPopularTimes() {
    let placeId = getPlaceId()
    plotarGrafico()
    fetch(`atms/popularTimes/${placeId}`, {
        cache: 'no-store'
    }).then(function (response) {
        console.log(response);
        response.json().then((resposta) => {

            let resp = JSON.stringify(resposta).replace(/"/g, '')
            resp = eval(resp);
            console.log(resp[0]);
        })
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function getPlaceId() {
    let terminals = JSON.parse(sessionStorage.ATM_INFOS)
    let getPlaceId

    for (let index = 0; index < terminals.length; index++) {
        if (terminals[index].id_terminal == sessionStorage.ID_ATM) {
            getPlaceId = terminals[index].place_id
        }
    }
    return getPlaceId
}

function plotarGrafico() {
    var dados = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        datasets: [{
            yAxisID: 'y-fila',
            label: 'Uso',
            borderColor: 'rgb(234, 122, 11)',
            backgroundColor: 'orange',
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
                },],
            }
        }
    });

}