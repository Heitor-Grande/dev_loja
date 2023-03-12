//fs
    //Utilizando o File System para atualizar, deletar e renomear arquivos
const fs = require("fs")
//multer
const multer = require("multer")
 
        //armazenamento multer config
const hd = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/")
    },
    filename: function(req, file, cb){
        //cria um nome para o arquivo
        cb(null, `${Date.now()}` + file.originalname)
    }
})

        //usar multer
const upload = multer({ storage: hd})

//router
const express = require("express")
const router = express.Router()

//database
const database = require("../models/models")

//login -- action 
router.post("/login_entrar", function(req, res){
        let senderEmail = req.body.senderEmail 
        let pass = req.body.pass

        database.all(`select token_user from user where senderEmail = '${senderEmail}' and pass = '${pass}'`, function(erro, [user]){
            if(erro){
                res.send(erro)
            }
            else if(user){
                res.redirect("/user_entrar/" + user.token_user)
            }
        })
})
//user -- entrar
router.get("/user_entrar/:token_user", function(req, res){
    let token_user = req.params.token_user

    database.all(`select token_user from user where token_user = "${token_user}"`, function(erro, [user]){
        if(token_user == user.token_user){
            database.all(`select * from produto`, function(erro, produto){
                database.all(`select * from categoria`, function(erro_categoria, categoria){
                   database.all(`select * from user where token_user = "${token_user}"`, function(erro, user){
                    res.render("index_user", {produto, categoria, user})
                   })
                })
            })
        }
        else{
            res.send("token não existe")
        }
    })

}) 
    //url principal
router.get("/", function(req, res){
    database.all(`select * from produto where quantidade >= 1`, function(erro, produto){
        if(erro){
            console.log("erro select index: " + erro)
            res.send(erro)
        }
        else if(produto){
            database.all(`select * from categoria`, function(erro, categoria){
                console.log("select index feito com sucesso: " + produto)
                res.render("index", {produto, categoria})
            })
        }
    })
})
    //filtro index
router.post("/app_filtro", function(req, res){
        let nome_categoria = req.body.nome_categoria
        database.all(`select * from produto where categoria_produto = "${nome_categoria}" and quantidade >= 1`, 
        function(erro, produto){
            if(erro){
                res.send(erro)
            }
            else if(produto){
                database.all(`select * from categoria`, function(erro, categoria){
                    console.log("select index feito com sucesso: " + produto)
                    res.render("index", {produto, categoria})
                })
            }
        })
})

    //app_pesquisa(search)
router.post("/app_pesquisa", function(req, res){
        let nome_produto = req.body.nome_produto
        database.all(`select * from produto where nome_produto like "%${nome_produto}%" and quantidade >= 1`, function(erro, produto){
            if(erro){
                res.send(erro)
            }
            else if(produto){
                database.all(`select * from categoria`, function(erro, categoria){
                    console.log("select index feito com sucesso: " + produto)
                    res.render("index", {produto, categoria})
                })
            }
        })
})

    //filtro index_user
router.post("/app_filtro/:token_user", function(req, res){
    let token_user = req.params.token_user

    let nome_categoria = req.body.nome_categoria
    database.all(`select * from produto where categoria_produto = "${nome_categoria}" and quantidade >= 1`, 
    function(erro, produto){
        if(erro){
            res.send(erro)
        }
        else if(produto){
            database.all(`select * from user where token_user = "${token_user}"`, function(erro, user){
                database.all(`select * from categoria`, function(erro, categoria){
                    console.log("select index feito com sucesso: " + produto)
                    res.render("index_user", {produto, categoria, user})
                })
            })
        }
    })
})

    //sem filtro index_user
router.get("/sem_filtro/:token_user", function(req, res){
    let token_user = req.params.token_user

    database.all(`select * from user where token_user = "${token_user}"`, function(erro, user){
        if(erro){
            res.send(erro)
        }
        else if(user){
            database.all(`select * from produto where quantidade >= 1`, function(erro, produto){
                if(erro){
                    res.send(erro)
                }
                else if(produto){
                    database.all(`select * from categoria`, function(erro, categoria){
                        if(erro){
                            res.send(erro)
                        }
                        else if(categoria){
                            res.render("index_user", {produto, categoria, user})
                        }
                    })
                }
            })
        }
    })

})
    //pesquisa(search)_user
router.post("/app_pesquisa/:token_user", function(req, res){
        let token_user = req.params.token_user
    
        let nome_produto = req.body.nome_produto
        database.all(`select * from produto where nome_produto like "%${nome_produto}%" and quantidade >= 1`, function(erro, produto){
            if(erro){
                res.send(erro)
            }
            else if(produto){
                database.all(`select * from user where token_user = "${token_user}"`, function(erro, user){
                    database.all(`select * from categoria`, function(erro, categoria){
                        console.log("select index feito com sucesso: " + produto)
                        res.render("index_user", {produto, categoria, user})
                    })
                })
            }
        })
    })

    //tela cadastrar produto
router.get("/cad_produto/:senha", function(req, res){
    let senha = req.params.senha

    database.all(`select * from admin where senha = "${senha}"`, function(erro, admin){
        if(erro){
            res.send(erro)
        }
        else if(admin != ""){
            database.all(`select * from categoria`, function(erro, categoria){
                if(erro){
                    res.send(erro)
                }
                else if(categoria){
                    res.render("cad_produto", {categoria, admin})
                }
            })
        }
        else{
            res.send("senha incorreta")
        }
    })
})

        //(crud-produto) ---- inicio
router.get("/admin/entrar", function(req, res){
    res.render("admin")
})

router.post("/logar/admin", function(req, res){
    let admin = req.body.admin
    let senha = req.body.senha
    
    database.all(`select * from admin where admin = "${admin}" and senha = "${senha}"`, function(erro, admin){
        if(erro){
            res.send(erro)
            console.log(erro)
        }
        else if(admin != ""){
            console.log(admin)
            res.redirect(`/admin_produto/${senha}`)
        }
        else{
            res.send("Usuario e senha não existem no banco de dados")
            console.log(admin)
        }
    })

})

router.get("/admin_produto/:senha", function(req, res){
    //select todos produtos
    let senha = req.params.senha

    database.all(`select * from admin where senha = "${senha}"`, function(erro, admin){
        if(erro){
            res.send(erro)
        }
        else if(admin != ""){
            database.all(`select * from produto`, function(erro, produto){
                if(erro){
                    console.log("erro ao fazer select(produto): " + erro)
                    res.send(erro)
                }
                else if(produto){
                    console.log("sucesso ao fazer select(produto): " + produto)
                    res.render("admin_produto", {produto, admin})
                }
            })
        }
        else{
            res.send("senha incorreta")
        }
    })
})
    
router.post("/cad_produto_set/:senha", upload.array("fotos", 3), function(req, res){
    //cad_produto
    let nome_produto = req.body.nome_produto
    console.log("nome produto criado: " + nome_produto)
    let preco_produto = req.body.preco_produto
    console.log("preço do produto criado: " + preco_produto)

    let senha = req.params.senha

    let img_1 = req.files[0].filename
    let img_2 = req.files[1].filename
    let img_3 = req.files[2].filename

    let descricao_produto = req.body.descricao_produto
    console.log("descrição produto: " + descricao_produto)
    let categoria_produto = req.body.categoria_produto
    console.log("categoria vinculada: " + categoria_produto)

    let tamanho_1 = req.body.tamanho_1
    let tamanho_2 = req.body.tamanho_2
    let tamanho_3 = req.body.tamanho_3

    let quantidade = req.body.quantidade
           
    database.run(`insert into produto (nome_produto, preco_produto, imagem_produto, imagem_produto_s, 
        imagem_produto_t, descricao_produto, categoria_produto, tamanho_1, tamanho_2, tamanho_3, quantidade) 
                    values("${nome_produto}", "${preco_produto}", "${img_1}", 
                    "${img_2}", "${img_3}", "${descricao_produto}", "${categoria_produto}", 
                    "${tamanho_1}", "${tamanho_2}", "${tamanho_3}", "${quantidade}")`, 
                    function(erro){
                        if(erro){
                            console.log("erro ao fazer insert(produto): " + erro)
                            res.send(erro)
                        }
                        else{
                            console.log("sucesso ao fazer insert(produto)")
                            res.redirect(`/admin_produto/${senha}`)
                        }
                    })
})

router.get("/admin_produto_excluir/:id/:senha", function(req, res){
    //delete produto 
    const id_produto = req.params.id
    const senha = req.params.senha

    //deletar imagens produto
    database.all(`select imagem_produto, imagem_produto_s, imagem_produto_t from produto 
    where id_produto = "${id_produto}"`, function(erro, [produto]){
        if(erro){
            res.send("erro ao selecionar as imagens: " + erro)
        }
        else{
            fs.unlink(`uploads/${produto.imagem_produto}`, function(erro){
                if(erro){
                    res.send("erro ao deletar imagem: " + erro)//1
                }
                else{
                    fs.unlink(`uploads/${produto.imagem_produto_s}`, function(erro){
                        if(erro){
                            res.send("erro ao deletar imagem: " + erro)//2
                        }
                        else{
                            fs.unlink(`uploads/${produto.imagem_produto_t}`, function(erro){
                                if(erro){
                                    res.send("erro ao deletar imagem: " + erro)//3
                                }
                            })
                        }
                    })
                }
            })
        }
    })

    database.run(`delete from produto where id_produto = "${id_produto}"`, function(erro){
        if(erro){
            console.log("erro ao deletar id: " + id_produto + ", erro: " + erro)
            res.send(erro)
        }
        else{
            res.redirect("/admin_produto/:senha")
        }
    })
})

router.post("/admin_produto_set_update/:id/:senha", upload.array("fotos", 3) , function(req, res){

    let senha = req.params.senha
    let id_produto = req.params.id

    let img_1 = req.files[0].filename
    let img_2 = req.files[1].filename
    let img_3 = req.files[2].filename

    //deletar imagens produto
    database.all(`select imagem_produto, imagem_produto_s, imagem_produto_t from produto 
    where id_produto = "${id_produto}"`, function(erro, [produto]){
        if(erro){
            res.send("erro ao selecionar as imagens: " + erro)
        }
        else{
            fs.unlink(`uploads/${produto.imagem_produto}`, function(erro){
                if(erro){
                    res.send("erro ao deletar imagem: " + erro)//1
                }
                else{
                    fs.unlink(`uploads/${produto.imagem_produto_s}`, function(erro){
                        if(erro){
                            res.send("erro ao deletar imagem: " + erro)//2
                        }
                        else{
                            fs.unlink(`uploads/${produto.imagem_produto_t}`, function(erro){
                                if(erro){
                                    res.send("erro ao deletar imagem: " + erro)//3
                                }
                            })
                        }
                    })
                }
            })
        }
    })

    //update produto
    let nome_produto = req.body.nome_produto
    console.log("nome produto atualizado: " + nome_produto)
    let preco_produto = req.body.preco_produto
    console.log("preço do produto atualizado: " + preco_produto)

    let descricao_produto = req.body.descricao_produto
    console.log("descrição produto: " + descricao_produto)
    let categoria_produto = req.body.categoria_produto
    console.log("categoria vinculada: " + categoria_produto)

    let tamanho_1 = req.body.tamanho_1
    let tamanho_2 = req.body.tamanho_2
    let tamanho_3 = req.body.tamanho_3

    let quantidade = req.body.quantidade

    database.run(`update produto set nome_produto = 
    "${nome_produto}", preco_produto = "${preco_produto}", 
    imagem_produto = "${img_1}", imagem_produto_s = "${img_2}", 
    imagem_produto_t = "${img_3}", descricao_produto = "${descricao_produto}", categoria_produto = "${categoria_produto}",
    id_produto = "${id_produto}", tamanho_1 = "${tamanho_1}", tamanho_2 = "${tamanho_2}", tamanho_3 = "${tamanho_3}",
    quantidade = "${quantidade}" where id_produto = "${id_produto}"`, 
     function(erro){
        if(erro){
            console.log("erro ao fazer upload(produto): " + erro)
            res.send(erro)
        }
        else{
            res.redirect(`/admin_produto/${senha}`)
        }
    })
})

router.get("/admin_produto_att/:id/:senha", function(req, res){
    //puxar produtos para att na pagina
    const id_produto = req.params.id
    let senha = req.params.senha

    database.all(`select * from admin where senha = "${senha}"`, function(erro, admin){
        if(erro){
            res.send(erro)
        }
        else if(admin != ""){
            database.all(`select * from produto where id_produto="${id_produto}"`, function(erro, produto){
                if(erro){
                    console.log("erro ao fazer select_att(produto): " + erro)
                }
                else if(produto){
                    database.all(`select * from categoria`, function(erro, categoria){
                        console.log("sucesso ao fazer select_att: " + produto)
                        res.render("cad_produto_att", {produto, categoria, admin})
                    })
                }
            })
        }
        else{
            res.send("senha incorreta")
        }
    })
})
        //(crud-produto) ---- fim

//comprar
router.get("/comprar/:id_produto", function(req, res){
        let id_produto = req.params.id_produto

        database.all(`select * from produto where id_produto = "${id_produto}"`, function(erro, produto){
            res.render("comprar", {produto})
        })

})

//comprar_user
router.get("/comprar/:id_produto/:token_user", function(req, res){
    let id_produto = req.params.id_produto
    let token_user = req.params.token_user

    database.all(`select * from produto where id_produto = '${id_produto}'`, function(erro, produto){
        if(erro){
            res.send("erro ao carregar pagina: " + erro)
        }
        else if(produto){
            database.all(`select * from user where token_user = '${token_user}'`, function(erro, user){
                console.log("erro select user: " + erro)
                res.render("comprar_user", {produto, user})
                console.log("carregou pagina comprar com sucesso")
            })
        }
        else{
            res.redirect("/login")
        }
    })
})

        //(crud-user) ---- inicio
    //insert
router.post("/insert_user", function(req, res){
    //campos
    let senderName = req.body.senderName
    let senderCpfCnpj = req.body.senderCpfCnpj
    let senderPhone = req.body.senderPhone
    let senderEmail = req.body.senderEmail
    let pass = req.body.pass
    let shippingAddressPostalCode = req.body.shippingAddressPostalCode
    let shippingAddressStreet = req.body.shippingAddressStreet
    let shippingAddressNumber = req.body.shippingAddressNumber
    let shippingAddressComplement = req.body.shippingAddressComplement
    let shippingAddressDistrict = req.body.shippingAddressDistrict
    let hippingAddressCity = req.body.hippingAddressCity
    let shippingAddressState = req.body.shippingAddressState
    let token_user = Math.random()

    database.run(`insert into user (senderName, senderPhone, senderEmail, shippingAddressPostalCode, 
        shippingAddressStreet, shippingAddressNumber, shippingAddressComplement,  shippingAddressDistrict, 
        hippingAddressCity, shippingAddressState, senderCpfCnpj, pass, token_user)
        values ("${senderName}","${senderPhone}", "${senderEmail}", "${shippingAddressPostalCode}",
        "${shippingAddressStreet}", "${shippingAddressNumber}", "${shippingAddressComplement}", "${shippingAddressDistrict}",
        "${hippingAddressCity}", "${shippingAddressState}", "${senderCpfCnpj}", "${pass}", "${token_user}")`, function(erro){

            if(erro){
                res.send(erro)
            }
            else{
                res.redirect("/login")
            }
        })
})
    //select dados user
router.get("/minha_conta/:token_user", function(req, res){
    let token_user = req.params.token_user
    database.all(`select * from user where token_user = "${token_user}"`, function(erro, user){
        if(erro){
            res.send(erro)
        }
        else if(user != ""){
            database.all(`select * from carrinho where token_user = "${token_user}"`, function(erro, carrinho){
                database.all(`select * from pedido where token_user = "${token_user}"`, function(erro, pedido){
                    res.render("minha_conta", {user, carrinho, pedido})
                })
            })
        }
    })
})
router.post("/att_user/:token_user", function(req, res){
    let token_user = req.params.token_user

    let senderName = req.body.senderName
    let senderCpfCnpj = req.body.senderCpfCnpj
    let senderPhone = req.body.senderPhone
    let senderEmail = req.body.senderEmail
    let pass = req.body.pass
    let shippingAddressPostalCode = req.body.shippingAddressPostalCode
    let shippingAddressStreet = req.body.shippingAddressStreet
    let shippingAddressNumber = req.body.shippingAddressNumber
    let shippingAddressComplement = req.body.shippingAddressComplement
    let shippingAddressDistrict = req.body.shippingAddressDistrict
    let hippingAddressCity = req.body.hippingAddressCity
    let shippingAddressState = req.body.shippingAddressState

    database.run(`update user set senderName = "${senderName}", senderCpfCnpj = "${senderCpfCnpj}", 
    senderPhone = "${senderPhone}", senderEmail = "${senderEmail}", pass = "${pass}", shippingAddressPostalCode = "${shippingAddressPostalCode}", 
    shippingAddressStreet = "${shippingAddressStreet}", shippingAddressNumber = "${shippingAddressNumber}", 
    shippingAddressComplement = "${shippingAddressComplement}", shippingAddressDistrict = "${shippingAddressDistrict}", 
    hippingAddressCity = "${hippingAddressCity}", shippingAddressState = "${shippingAddressState}" where token_user = "${token_user}"`, 
    function(erro){
        if(erro){
            res.send(erro)
        }
        else{
            res.redirect("/minha_conta/" + token_user + "")
        }
    })

})
        //(crud-user) ---- fim

    //(crud-categoria) ----  inicio
    //select
router.get("/categoria/:senha", function(req, res){
    let senha = req.params.senha

    database.all(`select * from admin where senha = "${senha}"`, function(erro, admin){
        if(erro){
            res.send(erro)
        }
        else if(admin != ""){
            database.all(`select * from categoria`, function(erro, categoria){
                if(erro){
                    res.send(erro)
                }
                else{
                    res.render("categoria", {categoria, admin})
                }
            })
        }
        else{
            res.send("senha incorreta")
        }
    })
})
    //update
router.post("/att_categoria/:id_categoria/:senha", function(req, res){
        let id_categoria = req.params.id_categoria
        let categoria_antiga = req.body.categoria_antiga
        let nome_categoria = req.body.nome_categoria
        let senha = req.params.senha

        database.run(`update categoria set nome_categoria = '${nome_categoria}' where id_categoria = '${id_categoria}'`, function(erro){
            if(erro){
                res.send(erro)
            }
            else{
                database.all(`select * from categoria`, function(erro, categoria){
                    if(erro){
                        res.send(erro)
                    }
                    else{
                        database.run(`update produto set categoria_produto = "${nome_categoria}" 
                        where categoria_produto = "${categoria_antiga}"`)
                        res.redirect(`/categoria/${senha}`)
                    }
                })
            }
        })
})
    //delete
router.get("/excluir_categoria/:id_categoria/:senha", function(req, res){
        let id_categoria = req.params.id_categoria
        let senha = req.params.senha

        
        database.run(`delete from categoria where id_categoria = '${id_categoria}'`, function(erro){
            if(erro){
                res.send(erro)
            }
            else{
                res.redirect(`/categoria/${senha}`)
            }
        })
})
    //insert
router.post("/add_categoria/:senha" , function(req, res){
    let nome_categoria = req.body.nome_categoria
    let senha = req.params.senha

    database.run(`insert into categoria (nome_categoria) values ('${nome_categoria}')`, function(erro){
        if(erro){
            res.send(erro)
        }
        else{
            res.redirect(`/categoria/${senha}`)
        }
    })
})
    //(crud-categoria) ---- fim

    //carrinho - inicio
        //insert
router.post("/insert_carrinho/:token_user", function(req, res){
    let nome_produto = req.body.nome_produto
    let tamanho = req.body.tamanho
    let preco_produto = req.body.preco_produto
    let id_produto = req.body.id_produto
    let token_user = req.params.token_user
    let produto_quantidade = req.body.produto_quantidade
    let img_produto = req.body.img_produto
    
    database.run(`insert into carrinho (nome_produto, preco_produto, id_produto, token_user, produto_quantidade , img_produto) 
    values("${nome_produto + ' ' + tamanho} ", "${preco_produto}", "${id_produto}", "${token_user}", "${produto_quantidade}", "${img_produto}")`, function(erro){
        if(erro){
            res.send(erro)
            console.log(erro)
        }
        else{
            res.redirect("/minha_conta/" + token_user + "")
        }
    })
})
        //delete
router.get("/delete_produto_car/:id_carrinho/:token_user", function(req, res){
        let id_carrinho= req.params.id_carrinho
        let token_user = req.params.token_user

        database.run(`delete from carrinho where id_carrinho= "${id_carrinho}"`, function(erro){
            if(erro){
                res.send(erro)
            }
            else{
                res.redirect("/minha_conta/" + token_user)
            }
        })
})
    //carrinho - fim
module.exports = router