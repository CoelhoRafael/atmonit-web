// window.onload = getPopularTimes()

function getPopularTimes() {

    fetch(`/atms/getPopularTimes/`, { cache: 'no-store' }).then(function (response) {

        console.log(response);

    })
        .catch(function (error) {
            console.error(`Erro ao acessar`);
        });

}