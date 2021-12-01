window.onload = loadContent()


function loadContent() {
    checkSession()
    let company_title = document.getElementById('company_name')
    let name_company = sessionStorage.COMPANY_NAME;
    company_title.innerHTML = name_company;
    getAllTerminals(sessionStorage.ID_COMPANY)
}


function getAllTerminals(idCompany) {
    let container = document.getElementById("terminal_container")
    // container.innerHTML = ""
    fetch(`/atms/findAllTerminals/${idCompany}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                sessionStorage.ATM_INFOS = JSON.stringify(resposta)

                // console.log(JSON.stringify(resposta));
                resposta.forEach(element => {
                    // container.innerHTML += `
                    // <div class="box expand">
                    //     <span class="status-info">
                    //         <div class="indicator normal"></div>Disponivel
                    //     </span>
                    //     <a id='atm-${element.id_terminal}' onclick="viewAtm(this)"">
                    //         <img src="img/atm.png" class="card-atm" alt="">
                    //         <!-- <i class="fa fa-users box-icon"></i> -->
                    //     </a>
                    //     <span class="status-info">Id: ${element.id_terminal}</span>
                    //     <span class="status-info">Bairro: ${element.district}</span>
                    //     <div class="container-btn">
                    //         <button class="btn-crud edit" onclick="openModal(${element.id_terminal})">
                    //             <i class="fa-solid fa-pencil"></i>
                    //         </button>
                    //         <button onclick='removerTerminal(${element.id_terminal})' class="btn-crud remove">
                    //             <i class="fa-solid fa-trash"></i>
                    //         </button>
                    //     </div>
                    // </div>`
                    container.innerHTML += `
                    <div class="box expand">
                        <span class="status-info">
                            <div class="indicator normal"></div>Disponível
                        </span>
                        <a id='atm-${element.id_terminal}' onclick="viewAtm(this)">
                            <img src="img/atm.png" class="card-atm" alt="">
                        </a>
                        <span class="status-info">Id: ${element.id_terminal}</span>
                        <span class="status-info">Bairro: ${element.district}</span>
                        <div class="container-btn">
                        <button class="btn-crud edit" onclick="openModal(${element.id_terminal})">
                            <i class="fa-solid fa-pencil"></i>
                        </button>
                        <button class="btn-crud remove" onclick='removerTerminal(${element.id_terminal})'>
                            <i class="fa-solid fa-trash"></i>
                        </button>
                        <button class="btn-crud exclamation" onclick='openInfoModal(${element.id_terminal})'>
                            <i class="fa-solid fa-circle-exclamation"></i>
                        </button>
                        </div>
                  </div>`
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

function viewAtm(context) {
    console.log(context.id);
    sessionStorage.ID_ATM = context.id.split('-')[1]
    window.location.href = "./dashboard.html"
}

function removerTerminal(id_terminal) {
    let confirmation = window.confirm("Deseja excluir o terminal com o id: " + id_terminal)

    if (confirmation) {
        fetch(`/atms/deletar/${id_terminal}`, {
            method: "DELETE",
        }).then(function (resposta) {

        }).catch(function (resposta) {
        });

        setTimeout(() => {
            getAllTerminals(sessionStorage.ID_COMPANY)
        }, 2500)

    }
}