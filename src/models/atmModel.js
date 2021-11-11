var database = require("../database/config")

function listar(idCompany) {
    var instrucao = `
    select * from terminal where fk_company = ${idCompany};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function login(email, password) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function login(): ", email, password)
//     var sql = `
//     select * from employee as e join company 
//     as c on e.fk_company = c.id_company where c.company_name = 'bandtec' and e.login = '${email}' and e.password = '${password}';
//     `;
//     console.log("Executando a instrução SQL: \n" + sql);
//     return database.executar(sql);
// }

// function cadastrar(nome, email, password) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, password);
//     var sql = `
//         INSERT INTO usuario (nome, email, password) VALUES ('${nome}', '${email}', '${password}');
//     `;
//     console.log("Executando a instrução SQL: \n" + sql);
//     return database.executar(sql);
// }

module.exports = {
    // login,
    // cadastrar,
    listar,
};