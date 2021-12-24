var atmModel = require("../models/atmModel");
var medidaModel = require("../models/medidaModel");


function atualizarAtm(req, res) {
    let idAtm = req.params.idTerminal;

    let processador = req.body.processador;
    let modelo_processador = req.body.modelo_processador;
    let memoria_ram = req.body.memoria_ram;
    let armazenamento = req.body.armazenamento;
    let place_id = req.body.place_id;


    if (!processador) {
        res.status(400).send("Seu nome está undefined!");
    } else if (!modelo_processador) {
        res.status(400).send("Seu email está undefined!");
    } else if (!memoria_ram) {
        res.status(400).send("Sua cargo está undefined!");
    } else if (!armazenamento) {
        res.status(400).send("Seu id_user está undefined!");
    }
    else if (!place_id) {
        res.status(400).send("Seu id_user está undefined!");
    }
    else {
        atmModel.atualizarTerminal(idAtm, processador, modelo_processador, memoria_ram, armazenamento, place_id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}




function findAllTerminals(req, res) {
    var idCompany = req.params.idCompany;

    console.log("Buscando todos os caixas da companhia com o id: " + idCompany);

    atmModel.listarAtms(idCompany).then(
        (resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }
    )
        .catch(
            (erro) => {
                console.log(erro);
                console.log("\nHouve um erro ao realizar ao listar os caixas! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function deletarAtm(req, res) {
    var id = req.params.id;

    atmModel.deletarAtm(id)
        .then(function (resultado) {
            console.log(resultado);
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 10;

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idMaquina, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var idMaquina = req.params.idMaquina;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idMaquina).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    findAllTerminals,
    deletarAtm,
    atualizarAtm
}