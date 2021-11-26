function loadContent(){
    let company_title = document.getElementById('company_name')
    let name_company = sessionStorage.COMPANY_NAME;
    company_title.innerHTML = name_company;
    getAllTerminals(sessionStorage.ID_COMPANY)
}


function getAllTerminals(idCompany){
    let container = document.getElementById("terminal_container")

    fetch(`/atms/findAllTerminals/${idCompany}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                sessionStorage.ATM_INFOS = JSON.stringify(resposta)
                
                console.log(JSON.stringify(resposta));
                resposta.forEach(element => {
                    container.innerHTML += `<a id='atm-${element.id_terminal}' onclick="viewAtm(this)"">
                    <div class="box expand">
                    <span class="status-info">
                        <div class="indicator normal"></div>Disponivel
                    </span>
                    <img src="img/atm.png" class="card-atm" alt="">
                    <!-- <i class="fa fa-users box-icon"></i> -->
                    </div>
                    </a>`; 
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



// async function generateTerminalsLayout(){
//     let response = await getAllTerminals(sessionStorage.ID_COMPANY)
//     console.log(response);
        
//     let container = document.getElementById("terminal_container")

//     for (let index = 0; index < response.recordset.length; index++) {
//         container.innerHTML += `<a href="Dashboard.html">
//         <div class="box expand">
//           <span class="status-info">
//             <div class="indicator normal"></div>Disponivel
//           </span>
//           <img src="img/atm.png" class="card-atm" alt="">
//           <!-- <i class="fa fa-users box-icon"></i> -->
//         </div>
//         </a>`;
//     }
        
// }