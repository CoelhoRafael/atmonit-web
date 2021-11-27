var database = require("../database/config");

function buscarUltimasMedidas(idMaquina,limite_linhas) {
    instrucaoSql = `select top ${limite_linhas}
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
    instrucaoSql = `select
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

function buscarUltimasMedidasCPU(idMaquina,limite_linhas) {
    instrucaoSql = `select top ${limite_linhas}
                        percentage_usage,
                        name_component,
                        FORMAT(date_time,'HH:mm:ss') as momento_grafico,
                        ram_memory,
                        terminal_storage
                        from component_registration
                        inner join terminal on id_terminal = fk_terminal
                        where fk_terminal = ${idMaquina}
                        and name_component = 'Processor'
                        order by id_component_registration desc;
                   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealCPU(idMaquina) {
    instrucaoSql = `select 
                        name_component,
                        FORMAT(date_time,'HH:mm:ss') as momento_grafico,
                        fk_terminal,
                        ram_memory,
                        terminal_storage
                        from component_registration 
                        inner join terminal on id_terminal = fk_terminal
                        where fk_terminal = ${idMaquina}
                        and name_component = 'Processor'
                    order by id_component_registration desc`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasRAM(idMaquina,limite_linhas) {
    instrucaoSql = `select top ${limite_linhas}
                        percentage_usage,
                        name_component,
                        FORMAT(date_time,'HH:mm:ss') as momento_grafico,
                        ram_memory,
                        terminal_storage
                        from component_registration
                        inner join terminal on id_terminal = fk_terminal
                        where fk_terminal = ${idMaquina}
                        and name_component = 'Ram memory'
                        order by id_component_registration desc;
                   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealRAM(idMaquina) {
    instrucaoSql = `select 
                        name_component,
                        FORMAT(date_time,'HH:mm:ss') as momento_grafico,
                        fk_terminal,
                        ram_memory
                        from component_registration 
                        where fk_terminal = ${idMaquina}
                        and name_component = 'Ram memory'
                    order by id_component_registration desc`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasDISCO(idMaquina,limite_linhas) {
    instrucaoSql = `select top ${limite_linhas}
                        percentage_usage,
                        name_component,
                        FORMAT(date_time,'HH:mm:ss') as momento_grafico,
                        ram_memory,
                        terminal_storage
                        from component_registration
                        inner join terminal on id_terminal = fk_terminal
                        where fk_terminal = ${idMaquina}
                        and name_component = 'Hard Disk 1'
                        order by id_component_registration desc;
                   `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealDISCO(idMaquina) {
    instrucaoSql = `select 
                        name_component,
                        FORMAT(date_time,'HH:mm:ss') as momento_grafico,
                        fk_terminal,
                        ram_memory,
                        terminal_storage
                        from component_registration 
                        inner join terminal on id_terminal = fk_terminal
                        where fk_terminal = ${idMaquina}
                        and name_component = 'Hard Disk 1'
                    order by id_component_registration desc`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarUltimasMedidasCPU,
    buscarMedidasEmTempoRealCPU,
    buscarUltimasMedidasRAM,
    buscarMedidasEmTempoRealRAM,
    buscarUltimasMedidasDISCO,
    buscarMedidasEmTempoRealDISCO
}