var express = require("express");
var router = express.Router();
const { PythonShell } = require('python-shell');

router.get("/", function (req, res) {
    res.render("index", { title: "Express" });
});

router.get("/popularTimes/", (req, res, next) => {

    var options = {
        args: ["ChIJ0RGdBvFZzpQRQeWcrwlhk8s"]
    }

    PythonShell.run('teste.py', options, function (err, result) {
        if (err) throw err;
        res.send(result)
    });
});

module.exports = router;