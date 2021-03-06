window.onload = plotarGrafico()
var dados

function getPopularTimes(option) {
    document.getElementById('terminal_inovacao').innerHTML = `Estimativa de movimento da máquina: ${sessionStorage.ID_ATM}`
    showLoad()
    let placeId = getPlaceId()
    fetch(`atms/popularTimes/${placeId}`, {
        cache: 'no-store'
    }).then(function (response) {
        // console.log(response);
        response.json().then((resposta) => {

            // console.log(resposta);
            resp = JSON.stringify(resposta).replace(/"/g, '')
            resp = eval(resp);
            console.log(resp[0].populartimes[0].data);
            if (option) {
                let dadosPopularTimes = resp[0].populartimes[option.value].data
                for (let index = 0; index < dadosPopularTimes.length; index++) {
                    if (dadosPopularTimes[index] == 0) dadosPopularTimes[index] = 1
                }
                dados.datasets[0].data = dadosPopularTimes
            }
            else {
                let dadosPopularTimes = resp[0].populartimes[6].data
                for (let index = 0; index < dadosPopularTimes.length; index++) {
                    if (dadosPopularTimes[index] == 0) dadosPopularTimes[index] = 1
                }
                dados.datasets[0].data = dadosPopularTimes
            }
            hiddenLoad()
            window.grafico_linha.update();
        })
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function plotarGrafico() {
    checkSession()
    dados = {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 00],
        datasets: [{
            yAxisID: 'y-fila',
            label: 'Uso',
            borderColor: 'rgb(234, 122, 11)',
            backgroundColor: 'orange',
            fill: true,
            data: []
        }]
    }
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
    getPopularTimes()
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

function showLoad() {
    document.getElementById('chart_gif').style.display = 'block'
    document.getElementById('canvas_grafico').style.display = 'none'
}

function hiddenLoad() {
    document.getElementById('chart_gif').style.display = 'none'
    document.getElementById('canvas_grafico').style.display = 'block'
}