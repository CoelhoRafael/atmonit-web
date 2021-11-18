async function loadContent(){
    let company_title = document.getElementById('company_name')
    let name_company = sessionStorage.COMPANY_NAME;
    company_title.innerHTML = name_company;

    let response = await getAllTerminals(sessionStorage.ID_COMPANY)
    console.log(response);
    
    generateTerminalsLayout(response.recordset)
}

function getAllTerminals(idCompany){
    return fetch(`/atms/findAllTerminals/${idCompany}`, {
        method: "GET"
    }).catch(function (erro) {
        console.log(erro);
    })

}

function generateTerminalsLayout(allTerminalsFoundByCompany){
    let container = document.getElementById("terminal_container")
    allTerminalsFoundByCompany.forEach(element => {
        
        
    });
}