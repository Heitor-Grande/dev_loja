//database
const database = require("../models/models")

//config nodemailer
const nodemailer = require("nodemailer")
let email_emitente = nodemailer.createTransport({
    //entrar no email do emitente
    host: "SMTP.office365.com",
    port: 587,
    secure: false, // verdadeiro para port 465, falso para o restante
    auth: {
      user: "queryhtr2022@outlook.com", // email do emitente
      pass: "CorsaRally123" // senha do email emitente
    }
})

//config router
const express = require("express")
const recSenha = express.Router()

//enviar email
recSenha.post("/rec_senha", function(req, res){
    const email_dest = req.body.email

    database.run(`select pass from user where senderEmail = "${email_dest}"`, function(erro, [user]){

        if(erro){
            res.send(erro)
        }
        else if(user){
            const email_conteudo = {
                from: 'queryhtr2022@outlook.com', //emitente
                to: email_dest, //destinatario
                subject: "RECUPERAÇÃO DE SENHA",
                //text: mensagem,
                html: "<h4>Sua senha é: " + user.pass + "</h4>"
              }
            
            email_emitente.sendMail(email_conteudo, function(erro){
                if(erro){
                    res.send(erro)
                }
                else{
                    res.redirect("/login")
                }
            })
        }
        else{
            res.send("esse email não esta cadastrado em nosso banco de dados")
        }
        
    })
})
module.exports = recSenha