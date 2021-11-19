let proximaAtualizacao;

    window.onload = obterDadosGrafico(18);

    // b_usuario.innerHTML = sessionStorage.NOME_USUARIO;

    //verificar_autenticacao();

    // altere aqui como os dados serão exibidos
    // e como são recuperados do BackEnd
    function obterDadosGrafico(idMaquina) {
        if (proximaAtualizacao != undefined) {
            clearTimeout(proximaAtualizacao);
        }

        fetch(`/medidas /ultimas/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();

                    plotarGrafico(resposta, idMaquina);
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
    function plotarGrafico(resposta, idMaquina) {
        console.log('iniciando plotagem do gráfico...');
            google.charts.load('current', {
      packages: ['corechart', 'line']
    });
    google.charts.setOnLoadCallback(drawBasic);

    function drawBasic() {

      var dados= new google.visualization.DataTable();
      dados.addColumn('number', 'Hora');
      dados.addColumn('number', 'RAM');
      dados.addColumn('number', 'CPU');
      dados.addColumn('number', 'DISCO');
    
      dados.addRows([[]]);
    //   data.addRows([[50,10,20,30],
    //   [55,15,25,34],
    //   [60,20,30,44],
    //   [65,25,35,48]
    // ]);

      var options = {
        legend:{
          textStyle:{
            color: '#FFF'
          },
        },
        hAxis: {
          title: 'TEMPO',
          textStyle: {
            color: '#ffffff',
            fontSize: 18,
            fontName: 'Arial',
            bold: true
            // italic: true
          },
          titleTextStyle: {
            color: '#ffffff',
            fontSize: 18,
            bold: true
          },
        },
        vAxis: {
          title: 'DESEMPENHO',
          textStyle: {
            color: '#ffffff',
            fontSize: 18,
            fontName: 'Arial',
            bold: true
            // italic: true
          },
          titleTextStyle: {
            color: '#ffffff',
            fontSize: 18,
            bold: true
          },
        },
        textStyle: {
          color: '#ffffff',
          fontSize: 18,
          fontName: 'Arial',
          bold: true
          // italic: true
        },
        backgroundColor: '#272c4a',

      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(dados, options);
    }
        for (i = 0; i < resposta.length; i++) {
            var registro = resposta[i];
            dados.labels.push(registro.momento_grafico);
            dados.datasets[0].data.push(registro.percentage_usage);
            dados.datasets[1].data.push(registro.percentage_usage);
            dados.datasets[2].data.push(registro.percentage_usage);
            dados.datasets[3].data.push(registro.percentage_usage);
        }
[]

        //Atualiza os dados de 2 em 2 segundos
        setTimeout(() => atualizarGrafico(idMaquina, dados), 2000);
    }

    // só mexer se quiser alterar o tempo de atualização
    // ou se souber o que está fazendo!
    function atualizarGrafico(idMaquina, dados) {
        fetch(`/medidas/tempo-real/${idMaquina}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (novoRegistro) {

                    console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                    console.log(`Dados atuais do gráfico: ${dados}`);

                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento
                    dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].percentage_usage); // incluir uma nova medida de umidade
                    dados.datasets[1].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[1].data.push(novoRegistro[0].percentage_usage); // incluir uma nova medida de umidade
                    dados.datasets[2].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[2].data.push(novoRegistro[0].percentage_usage); // incluir uma nova medida de umidade
                    dados.datasets[3].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[3].data.push(novoRegistro[0].percentage_usage);
                    window.grafico_linha.update();

                    proximaAtualizacao = setTimeout(() => atualizarGrafico(idMaquina, dados), 2000);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
                proximaAtualizacao = setTimeout(() => atualizarGrafico(idMaquina, dados), 2000);
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });

    }
