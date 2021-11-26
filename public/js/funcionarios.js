window.onload = loadContent()

function loadContent() {
    checkSession()
    getAllEmployees(sessionStorage.ID_COMPANY)
}


function getAllEmployees(idCompany) {
    let tableBody = document.getElementById("table_body")

    fetch(`/usuarios/listarFuncionarios/${idCompany}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(JSON.stringify(resposta));
                resposta.forEach(element => {
                    tableBody.innerHTML +=
                        `
                    <tr>
                        <td>${element.id_employee}</td>
                        <td>${element.employee_name}</td>
                        <td>${element.office}</td>
                        <td>${element.login}</td>
                        <td>
                            <span class="action_btn">
                                <button id="edit_element.id_employee" class="table-btn edit" onclick="openModal()">Editar</button>
                                <button id="rm_element.id_employee" class="table-btn remove">Remover</button>
                            </span>
                        </td>
                    </tr>
                    `;
                });

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}


function validateUpdateEmployee() {
    let nome = document.getElementById('inpt_nome');
    let email = document.getElementById('inpt_email');

    if (nome.value == '' || nome.value.match(/[0-9]/)) {
        nome.classList.toggle('wrong-input');
        nome.value = '';
        nome.placeholder = 'Digite um nome válido';
        setTimeout(() => {
            nome.classList.remove('wrong-input');
        }, 1500);
        return false;
    }
    else if (email.value == '' || !email.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        email.classList.toggle('wrong-input');
        email.value = '';
        email.placeholder = 'Digite um email válido';

        setTimeout(() => {
            email.classList.remove('wrong-input');
        }, 1500);
        return false;
    }
    else {
        return true
    }
}

function cadastrar() {
    if (validateUpdateEmployee()) {

        var formulario = new URLSearchParams(new FormData(document.getElementById("form_atualizar_cadastro")));
        formulario.set("fkCompany", sessionStorage.ID_COMPANY)


        // fetch("/usuarios/cadastrar", {
        //     method: "PUT",
        //     body: formulario
        // }).then(function (resposta) {
        //     console.log("resposta: ", resposta);

        //     if (resposta.ok) {

        //         Toastify({
        //             text: "Funcionário cadastrado com sucesso!",
        //             duration: 3000,
        //             destination: "https://github.com/apvarun/toastify-js",
        //             newWindow: true,
        //             close: true,
        //             gravity: "top", // `top` or `bottom`
        //             position: "right", // `left`, `center` or `right`
        //             stopOnFocus: true, // Prevents dismissing of toast on hover
        //             style: {
        //                 background: "#90be6d",
        //             },
        //             onClick: function () { } // Callback after click
        //         }).showToast();


        //         setTimeout(() => {
        //             window.location.replace('funcionarios.html');
        //         }, 4000)
        //     } else {
        //         throw ("Houve um erro ao tentar realizar o cadastro!" + JSON.stringify(formulario.json));
        //     }
        // }).catch(function (resposta) {
        //     Toastify({
        //         text: "Erro ao cadastrar funcionário!",
        //         duration: 3000,
        //         destination: "https://github.com/apvarun/toastify-js",
        //         newWindow: true,
        //         close: true,
        //         gravity: "top", // `top` or `bottom`
        //         position: "right", // `left`, `center` or `right`
        //         stopOnFocus: true, // Prevents dismissing of toast on hover
        //         style: {
        //             background: "#f94144",
        //         },
        //         onClick: function () { } // Callback after click
        //     }).showToast();
        // });
    }
}