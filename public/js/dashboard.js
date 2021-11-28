window.onload = dadosCards()

var ram_card = document.getElementById('ram_card_value')
var cpu_card = document.getElementById('cpu_card_value')

var status_cpu = document.getElementById('status_cpu')
var status_ram = document.getElementById('status_ram')
var status_disco = document.getElementById('status_disco')

function dadosCards() {
    let idMaquina = sessionStorage.ID_ATM

    fetch(`/medidas/ultimas/ram/${idMaquina}`, {
        cache: 'no-store'
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                // console.log(resposta[0].percentage_usage)
                usoRam = resposta[0].percentage_usage
                if (usoRam <= 60) {
                    status_ram.innerHTML = `
                    <div class="indicator normal"></div>
                    Normal
                  </span>
                    `
                }
                else if (usoRam <= 80) {
                    status_ram.innerHTML = `
                    <div class="indicator caution"></div>
                    Atenção
                  </span>
                    `
                }
                else {
                    status_ram.innerHTML = `
                    <div class="indicator danger"></div>
                    Crítico
                  </span>
                    `
                }
                ram_card.innerHTML = `${usoRam}%`
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

    fetch(`/medidas/ultimas/cpu/${idMaquina}`, {
        cache: 'no-store'
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                // console.log(resposta[0].percentage_usage)

                usoCpu = resposta[0].percentage_usage
                if (usoCpu <= 60) {
                    status_cpu.innerHTML = `
                    <div class="indicator normal"></div>
                    Normal
                  </span>
                    `
                }
                else if (usoCpu <= 80) {
                    status_cpu.innerHTML = `
                    <div class="indicator caution"></div>
                    Atenção
                  </span>
                    `
                }
                else {
                    status_cpu.innerHTML = `
                    <div class="indicator danger"></div>
                    Crítico
                  </span>
                    `
                }
                cpu_card.innerHTML = `${usoCpu}%`

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });


    setTimeout(() => dadosCards(),
        1000);

}