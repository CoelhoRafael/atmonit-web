var idTerminalToUpdate
function openModal(id_terminal) {
    idTerminalToUpdate = id_terminal
    document.getElementById('modalHome').style.top = "0";
}

function closeModal() {
    document.getElementById('modalHome').style.top = "-100%";
}

function validateUpdateTerminal() {
    let inpt_processador = document.getElementById('inpt_processador');
    let inpt_modelo_processador = document.getElementById('inpt_modelo_processador');
    let inpt_memoria_ram = document.getElementById('inpt_memoria_ram');
    let inpt_armazenamento = document.getElementById('inpt_armazenamento');
    let inpt_place_id = document.getElementById('inpt_place_id');

    if (inpt_processador.value == '' || !inpt_processador || inpt_processador.value.length < 8) {
        inpt_processador.classList.toggle('wrong-input');
        inpt_processador.value = '';
        inpt_processador.placeholder = 'Digite um processador válido';
        setTimeout(() => {
            inpt_processador.classList.remove('wrong-input');
        }, 1500);
        return false;
    }
    else if (inpt_modelo_processador.value == '' || !inpt_modelo_processador || inpt_modelo_processador.value.length < 8) {
        inpt_modelo_processador.classList.toggle('wrong-input');
        inpt_modelo_processador.value = '';
        inpt_modelo_processador.placeholder = 'Digite um modelo de processador válido';
        setTimeout(() => {
            inpt_modelo_processador.classList.remove('wrong-input');
        }, 1500);
        return false;
    }
    else if (inpt_memoria_ram.value == '' || !inpt_memoria_ram || inpt_memoria_ram.value.length < 8) {
        inpt_memoria_ram.classList.toggle('wrong-input');
        inpt_memoria_ram.value = '';
        inpt_memoria_ram.placeholder = 'Digite um valor válido';
        setTimeout(() => {
            inpt_memoria_ram.classList.remove('wrong-input');
        }, 1500);
        return false;
    }
    else if (inpt_armazenamento.value == '' || !inpt_armazenamento || inpt_armazenamento.value.length < 8) {
        inpt_armazenamento.classList.toggle('wrong-input');
        inpt_armazenamento.value = '';
        inpt_armazenamento.placeholder = 'Digite um valor válido';
        setTimeout(() => {
            inpt_armazenamento.classList.remove('wrong-input');
        }, 1500);
        return false;
    } else if (inpt_place_id.value == '' || !inpt_place_id || inpt_place_id.value.length < 8) {
        inpt_place_id.classList.toggle('wrong-input');
        inpt_place_id.value = '';
        inpt_place_id.placeholder = 'Digite uma key válida';
        setTimeout(() => {
            inpt_place_id.classList.remove('wrong-input');
        }, 1500);
        return false;
    }
    else {
        return true
    }
}

function atualizar() {
    if (validateUpdateTerminal()) {

        var formulario = new URLSearchParams(new FormData(document.getElementById("form_atualizar_caixa")));

        fetch(`/atms/atualizar/${idTerminalToUpdate}`, {
            method: "PUT",
            body: formulario
        }).then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {

                closeModal()
                limparFormulario()
                getAllTerminals(sessionStorage.ID_COMPANY)



                Toastify({
                    text: "Terminal atualizado com sucesso!",
                    duration: 3000,
                    destination: "",
                    newWindow: false,
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
    document.getElementById("form_atualizar_caixa").reset();
}

//Modal de informações do caixa

function openInfoModal(idTerminal){
    document.getElementById('modalInfo').style.top = "0";

}

function closeInfoModal(){
    document.getElementById('modalInfo').style.top = "-100%";
}