var database = require("../database/config");

function buscarUltimasMedidas(idMaquina, limite_linhas) {
    instrucaoSql = `select 
                        percentage_usage, 
                        date_time,    
                        DATE_FORMAT(date_time,'%H:%i:%s') as momento_grafico
                    from component_registration
                    where fk_terminal = ${idMaquina}
                    order by id desc limit ${limite_linhas}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idMaquina) {
    instrucaoSql = `select 
                        percentage_usage, 
                        DATE_FORMAT(date_time,'%H:%i:%s') as momento_grafico, 
                        fk_terminal 
                        from component_regkistrationm where fk_terminal = ${idMaquina} 
                    order by id desc limit 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}