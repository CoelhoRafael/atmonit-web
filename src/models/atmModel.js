var database = require("../database/config")

function listarAtms(idCompany) {
    var instrucao = `
    select terminal.*, terminal_address.district from terminal join terminal_address on fk_terminal_address = id_terminal_address where fk_company = ${idCompany} order by district;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarAtm(idAtm) {
    var instrucao = `
    delete from component_registration where fk_terminal = ${idAtm};
    delete from terminal where id_terminal =  ${idAtm};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarAtms,
    deletarAtm
};