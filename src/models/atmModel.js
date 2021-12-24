var database = require("../database/config")

function listarAtms(idCompany) {
    var instrucao = `
    select terminal.*, terminal_address.district from terminal join terminal_address on fk_terminal_address = id_terminal_address where fk_company = ${idCompany} order by district;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarTerminal(idAtm, processador, modelo_processador, memoria_ram, armazenamento, place_id) {
    var sql = `
    update terminal set processor = '${processador}', ram_memory = ${memoria_ram}, terminal_storage = ${armazenamento}, cpu_model = '${modelo_processador}', place_id = '${place_id}' where id_terminal = ${idAtm};    
    `;
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);
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
    deletarAtm,
    atualizarTerminal
};