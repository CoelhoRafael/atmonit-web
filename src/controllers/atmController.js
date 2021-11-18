var atmModel = require("../models/atmModel");

function findAllTerminals (req, res) {
    var idAtm = req.params.idAtm;

        return atmModel.listar(idAtm).catch(
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