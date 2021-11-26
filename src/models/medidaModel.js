var database = require("../database/config");

function buscarUltimasMedidas(idMaquina,limite_linhas) {
    instrucaoSql = `select month()
                        MAX(percentage_usage)
                        percentage_usage,
                        name_component,
                        FORMAT(date_time,'MM/yyyy') as momento_grafico,
                        ram_memory,
                        terminal_storage
                        from component_registration
                        inner join terminal on id_terminal = fk_terminal
                        where fk_terminal = ${idMaquina}
                        order by id_component_registration desc
                   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idMaquina) {
    instrucaoSql = `select , 
                        name_component,
                        FORMAT(date_time,'HH:mm:ss') as momento_grafico,
                        fk_terminal,
                        ram_memory,
                        terminal_storage
                        from component_registration 
                        inner join terminal on id_terminal = fk_terminal
                        where fk_terminal = ${idMaquina}
                    order by id_component_registration desc`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}