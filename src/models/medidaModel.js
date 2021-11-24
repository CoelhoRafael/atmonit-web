var database = require("../database/config");

function buscarUltimasMedidas(idMaquina,limite_linhas) {
    instrucaoSql = `select top ${limite_linhas}
                        percentage_usage,
                        name_component,
                        date_time
                    from component_registration
                    where fk_terminal = 21
                    and percentage_usage >= 0
                    order by id_component_registration desc
                   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idMaquina) {
    instrucaoSql = `select
                        percentage_usage, 
                        name_component,
                        date_time,
                        fk_terminal 
                        from component_registration where fk_terminal = 21
                    order by id_component_registration desc`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}