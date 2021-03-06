var employee_id

function openModal(context) {
    employee_id = context.id.split("_")[1]
    document.getElementById('modal').style.top = "0";
}

function closeModal() {
    document.getElementById('modal').style.top = "-100%";
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

function atualizar() {
    if (validateUpdateEmployee()) {

        var formulario = new URLSearchParams(new FormData(document.getElementById("form_atualizar_cadastro")));

        fetch(`/usuarios/atualizar/${employee_id}`, {
            method: "PUT",
            body: formulario
        }).then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {

                closeModal()
                limparFormulario()
                getAllEmployees(sessionStorage.ID_COMPANY)

                Toastify({
                    text: "Funcionário atualizado com sucesso!",
                    duration: 3000,
                    destination: "",
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "#90be6d",
                    },
                    onClick: function () { } // Callback after click
                }).showToast();

            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!" + JSON.stringify(formulario.json));
            }
        }).catch(function (resposta) {

        });
    }
}

function limparFormulario() {
    document.getElementById("form_atualizar_cadastro").reset();
}

function deleteUser(context) {
    employee_id = context.id.split("_")[1]
    let confirmation = window.confirm("Deseja excluir o funcionário de com o id: " + employee_id)

    if (confirmation) {
        fetch(`/usuarios/deletar/${employee_id}`, {
            method: "DELETE",
        }).then(function (resposta) {

        }).catch(function (resposta) {
        });

        setTimeout(() => {
            getAllEmployees(sessionStorage.ID_COMPANY)
        }, 2500)

    }
}