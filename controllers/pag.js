//express
const express = require("express")
const pag = express.Router()

//database
const database = require("../models/models")

//add pedido no carrinho e fazer a venda
pag.post("/insert_pedido", function(req, res){
    let token_user = req.body.token_user
    let reference = req.body.reference
    let data = new Date()
    let dataFormatada = data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear()
    let senderName = req.body.senderName
    let senderPhone = req.body.senderPhone

    //pegar valor total
    let valor_total = req.body.valor_total
    console.log("VALOR TOTAL -> "  + valor_total)

    let quantidade_total_itens = req.body.quantidade_total_itens

    database.run(`insert into pedido (status_pedido, token_user, reference, data_pedido, valor_total, nome_cliente, contato) 
    values("Aguardando liberação", "${token_user}", "${reference}", 
    "${dataFormatada}", "${valor_total}" , "${senderName}", "${senderPhone}")`, 
    function(erro){
        if(erro){
            res.send(erro)
            console.log(erro)
        }
        else{
            //logica de criar pedido_detalhes
            for(let i = 0; i < quantidade_total_itens; i = i + 1){
                let itemId_ = req.body.itemId
                console.log("---> " + itemId_[i])

                let itemDescription = req.body.itemDescription
                console.log("itemDescription " + itemDescription[i])


                let itemAmount =  req.body.itemAmount
                console.log("itemAmount " + itemAmount[i])


                let itemQuantity = req.body.itemQuantity
                console.log("itemQuantity " + itemQuantity[i])


                database.run(`insert into pedido_detalhes 
                (reference_pedido, item_pedido, preco_item, quantidade_item, token_user) 
                values("${reference}", "${itemDescription[i]}", "${itemAmount[i]}", "${itemQuantity[i]}", "${token_user}")`)

            }
        }
    })
})


pag.get("/detalhes/produtos/:token_user/:reference", function(req, res){
    let token_user = req.params.token_user
    let reference = req.params.reference
    database.all(`select * from pedido_detalhes where token_user = "${token_user}" and reference_pedido = "${reference}"`, 
    function(erro, pedido){
        if(erro){
            res.send(erro)
        }
        else{
            res.render("pedido_detalhes", {pedido})
        }
    })

})


pag.get("/meusPedidos/admin/:senha", function(req, res){
    let senha = req.params.senha

    database.all(`select * from admin where senha = "${senha}"`, function(erro, admin){
        if(erro){
            res.send(erro)
        }
        else if(admin != ""){
            database.all(`select * from pedido`, function(erro, pedido){
                if(erro){
                    req.send(erro)
                }
                else{
                    res.render("meus_pedidos", {pedido})
                }
            })
        }
        else{
            res.send("senha incorreta")
        }
    })
})

pag.get("/MyAdmin/:token_user/:reference", function(req, res){
    let token_user = req.params.token_user
    let reference = req.params.reference

    database.all(`select * from pedido_detalhes where token_user = "${token_user}" and reference_pedido = "${reference}"`, 
    function(erro, pedido_detalhes){
        if(erro){
            res.send(erro)
            console.log(erro)
        }
        else{
            database.all(`select * from pedido where token_user = "${token_user}" and reference = "${reference}"`, 
            function(erro, pedido){
                res.render("meus_pedidos_detalhes" , {pedido, pedido_detalhes})
            })
        }
    })
})

pag.post("/pedido/:token_user/:reference", function(req, res){
    let token_user = req.params.token_user
    let reference = req.params.reference

    let status_pedido = req.body.status_pedido
    console.log("STATUS PEDIDO: " + status_pedido)

    database.run(`update pedido set status_pedido = "${status_pedido}" 
    where token_user = "${token_user}" and reference = "${reference}"`, function(erro){
        if(erro){
            res.send(erro)
        }
        else{
            res.redirect(`/MyAdmin/${token_user}/${reference}`)
        }
    })
})
module.exports = pag 