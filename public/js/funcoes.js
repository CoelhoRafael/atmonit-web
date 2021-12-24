// sessão
function checkSession() {
    let nome = sessionStorage.NOME_USER;
    let office = sessionStorage.OFFICE;
    let func_option_nav = document.getElementById("func_nav_option");
    let add_func_nav = document.getElementById("add_func_nav");
    // console.log(office);

    if (office != "administrador") {
        func_option_nav.style.display = "none"
        add_func_nav.style.display = "none"
    }

    if (!nome) {
        window.location = "../index.html"
    }


}


function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "./index.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.innerHTML = texto;
    }
}


// modal
function mostrarModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "flex";
}

function fecharModal() {
    var divModal = document.getElementById("div_modal");
    divModal.style.display = "none";
}

