var atmModel = require("../models/atmModel");

function findAllTerminals (req, res) {
    var idCompany = req.params.idCompany;

    console.log("Buscando todos os caixas da companhia com o id: " + idCompany);
    
        atmModel.listarAtms(idCompany).then(
            (resultado)=>{
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


module.exports = {
    findAllTerminals
}