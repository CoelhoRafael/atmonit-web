var database = require("../database/config")

function listar(idCompany) {
    var instrucao = `
    select * from terminal where fk_company = ${idCompany};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
};