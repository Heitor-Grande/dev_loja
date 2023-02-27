//sqlite3
const sqlite3 = require("sqlite3")
const database = new sqlite3.Database("./models/teste.db", function(){
    console.log("CONECTADO AO BANCO COM SUCESSO")
})



//só retorna 2 promisse nos selects 
// no run -> apenas erros
//no all -> erro e o select
module.exports = database