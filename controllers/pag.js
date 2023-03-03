//express
const express = require("express")
const pag = express.Router()

//database
const database = require("../models/models")

//add pedido no carrinho e fazer a venda
pag.post("/insert_pedido", function(req, res){
    let token_user = req.body.token_user
    let reference = req.body.reference

    database.run(`insert into pedido (status_pedido, token_user, reference) values("1", "${token_user}", "${reference}")`, 
    function(erro){
        if(erro){
            res.send(erro)
        }
        else{
            console.log("inserido pedido")
        }
    })
})

//notificação url pag
pag.get("/notificacao", function(req, res){
    res.send()
})

module.exports = pag 