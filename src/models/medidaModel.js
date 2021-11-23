var database = require("../database/config");

function buscarUltimasMedidas(idMaquina,limite_linhas) {
    instrucaoSql = `select top 10
                        name_component,
                        format (percentage_usage,'P2') as percentage_usage
                    from component_registration
                    where fk_terminal = 18
                    order by id_component_registration desc
                   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idMaquina) {
    instrucaoSql = `select 
                        percentage_usage, 
                        DATE_FORMAT(date_time,'%H:%i:%s') as momento_grafico, 
                        fk_terminal 
                        from component_registration where fk_terminal = ${idMaquina} 
                    order by id desc limit 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}