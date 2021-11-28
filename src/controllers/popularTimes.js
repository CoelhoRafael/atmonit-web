const { PythonShell } = require('python-shell')

var options = {
    scriptPath: "C:/Users/abner/Desktop/atmonit-web",
    args: ["ChIJ0RGdBvFZzpQRQeWcrwlhk8s"]
}

async function rodarScriptPython() {
    let teste

    await PythonShell.run("teste.py", options, async function(error, res){
        teste = await res
    })

}


module.exports = {
    rodarScriptPython
}