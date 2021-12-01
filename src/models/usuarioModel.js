var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function login(email, password) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function login(): ", email, password)
    var sql = `
    select * from employee as e join company 
    as c on e.fk_company = c.id_company where e.login = '${email}' and e.password = '${password}';
    `;
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);
}

function atualizarFuncionario(id, cargo, nome, email) {
    var sql = `
    update employee set employee_name = '${nome}', login = '${email}', office = '${cargo}' where id_employee = ${id};    
    `;
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);
}

function deletarFuncionario(id) {
    var sql = `
    delete from employee where id_employee = ${id};   
    `;
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);
}

function cadastrar(nome, cargo, fkCompany, email, password) {
    var sql = `
        INSERT INTO [dbo].[employee] (employee_name,office,fk_company,login,password)
        VALUES ('${nome}', '${cargo}', '${fkCompany}','${email}','${password}');
    `;
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);
}

function listarFuncionarios(idCompany) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarFuncionarios()");
    var instrucao = `
    select * from employee where fk_company = ${idCompany};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    login,
    cadastrar,
    listar,
    listarFuncionarios,
    atualizarFuncionario,
    deletarFuncionario
};