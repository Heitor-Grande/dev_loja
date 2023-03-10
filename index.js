//express
const express = require("express")
const app = express()

//porta servidor
let porta = process.env.PORT || 8080
app.listen(porta, function(req, res){
    console.log("RODANDO NA PORTA: " + porta)
})

//express-handlebars
const expressHandlebars = require("express-handlebars")
app.engine("handlebars", expressHandlebars.engine())
app.set("view engine", "handlebars")

//body-parser
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}))

//path
const path = require("path")
app.use(express.static(path.join(__dirname + "/")))

//mysql2
const database = require("./models/models")

//urls
app.get("/login", function(req, res){
    res.render("login")
})
app.get("/cad_user", function(req, res){
    res.render("cad_user")
})
app.get("/pedirRec", function(req, res){
        res.render("pedirRec")
})

//controllers
const router = require("./controllers/controllers")

//comprar_cliente
app.get("/comprar/:id_produto/:token_user", router)

//comprar
app.get("/comprar/:id_produto", router)

//index_entrar -> cliente login
app.post("/login_entrar", router)

//index - select
app.get("/", router)

//index - filtro
app.post("/app_filtro", router)

//index - filtro(user)
app.post("/app_filtro/:token_user", router)

//index_user sem filtro 
app.get("/sem_filtro/:token_user", router)

//pesquisa(search)
app.post("/app_pesquisa", router)

//pesquisa(search)_user
app.post("/app_pesquisa/:token_user", router)

//cad_produto _ tela
app.get("/cad_produto/:senha", router)

    //crud - produto(inicio)
app.get("/admin/entrar", router)
app.post("/logar/admin", router)

        //insert
app.post("/cad_produto_set", router)
        //select
app.get("/admin_produto/:senha", router)
        //delete
app.get("/admin_produto_excluir/:id", router)
        //select -> update
app.get("/admin_produto_att/:id/:senha", router)
        //update
app.post("/admin_produto_set_update/:id", router)
    //crud - produto(fim)

    //crud - user(inicio)
        //insert
app.post("/insert_user", router)
        //select
app.get("/minha_conta/:token_user", router)
        //update
app.post("/att_user/:token_user", router)
    //crud - user(fim)

    //crud - categoria(inicio)
        //select
app.get("/categoria/:senha", router)
        //update
app.post("/att_categoria/:id_categoria", router)
        //delete
app.get("/excluir_categoria/:id_categoria", router)
        //insert
app.post("/add_categoria", router)
   //crud -categoria (fim)

//user - entrar
app.get("/user_entrar/:token_user", router)

   //carrinho - inicio
        //insert
app.post("/insert_carrinho/:token_user", router)
        //delete
app.get("/delete_produto_car/:id_carrinho/:token_user", router)
   //carrinho - fim


//recSenha
const recSenha = require("./controllers/recSenha")
app.post("/rec_senha", recSenha)

//pag
const pag = require("./controllers/pag")
app.post("/insert_pedido", pag)
app.post("/notificacao", pag)
app.get("/detalhes/produtos/:token_user/:reference", pag)

app.get("/meusPedidos/admin/:senha", pag)
app.get("/MyAdmin/:tk/:reference", pag)
app.post("/pedido/:token_user/:reference", pag)
//frete
const frete = require("./controllers/frete")
app.get("/calc_frete/:cep", frete)

