var database = require("../database/config")

function listarAtms(idCompany) {
    var instrucao = `
    select terminal.*, terminal_address.district from terminal join terminal_address on fk_terminal_address = id_terminal_address where fk_company = ${idCompany} order by district;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarAtms,
};