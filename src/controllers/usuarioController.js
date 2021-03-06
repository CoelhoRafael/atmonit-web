var usuarioModel = require("../models/usuarioModel");
var atmModel = require("../models/atmModel");
var sessoes = [];

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarFuncionarios(req, res) {
    var idCompany = req.params.idCompany;

    usuarioModel.listarFuncionarios(idCompany)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function login(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (password == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.login(email, password)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado)
                        res.json(resultado[0])
                        // 
                        // 
                        // 
                        // CHAMAR A FUNÇÂO DE LISTAR OS ATMS
                        // 
                        // 
                        // 
                        // console.log(atmModel.listar(resultado[0].fk_company))

                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    var nome = req.body.nome;
    var cargo = req.body.accesslevel;
    var email = req.body.email;
    var fkCompany = req.body.fkCompany;
    var senha = req.body.senha;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (cargo == undefined) {
        res.status(400).send("Sua cargo está undefined!");
    } else if (fkCompany == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.cadastrar(nome, cargo, fkCompany, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizarFuncionario(req, res) {
    var nome = req.body.nome;
    var cargo = req.body.funcionario_group;
    var email = req.body.email;
    var id_user = req.params.id_user;

    if (!nome) {
        res.status(400).send("Seu nome está undefined!");
    } else if (!email) {
        res.status(400).send("Seu email está undefined!");
    } else if (!cargo) {
        res.status(400).send("Sua cargo está undefined!");
    } else if (!id_user) {
        res.status(400).send("Seu id_user está undefined!");
    } else {
        usuarioModel.atualizarFuncionario(id_user, cargo, nome, email)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function deletarFuncionario(req, res) {
    var id = req.params.id;

    usuarioModel.deletarFuncionario(id)
        .then(function (resultado) {
            console.log(resultado);
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


module.exports = {
    login,
    cadastrar,
    listar,
    listarFuncionarios,
    atualizarFuncionario,
    deletarFuncionario
}