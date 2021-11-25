function loadContent() {
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
                                <button class="table-btn edit" onclick="openModal()">Editar</button>
                                <button class="table-btn remove">Remover</button>
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