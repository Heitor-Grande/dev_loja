//gerar reference
let reference = document.querySelector("#cod_pedido")
reference.value = parseInt(Math.random() * 999999)

//att status pedido
let status_pedido = document.querySelectorAll(".status_pedido")
for(let i = 0; i < status_pedido.length; i = i + 1){
    status_pedido[i].textContent
    if(status_pedido[i].textContent == "1"){
        status_pedido[i].textContent = "Aguardando pagamento"
    }
    if(status_pedido[i].textContent == "2"){
        status_pedido[i].textContent = "Em análise"
    }
    if(status_pedido[i].textContent == "3"){
        status_pedido[i].textContent = "Pagamento aprovado"
    }
    if(status_pedido[i].textContent == "4"){
        status_pedido[i].textContent = "Disponível, a caminho"
    }
    if(status_pedido[i].textContent == "5"){
        status_pedido[i].textContent = "Em disputa"
    }
    if(status_pedido[i].textContent == "6"){
        status_pedido[i].textContent = "Valor devolvido para o comprador"
    }
    if(status_pedido[i].textContent == "7"){
        status_pedido[i].textContent = "Pedido cancelado"
    }
}

//campos carrinho
let item_id = document.querySelectorAll(".item_id")
let nome_produto = document.querySelectorAll(".nome_produto")
let preco_produto = document.querySelectorAll(".preco_produto")
let itemQuantity = document.querySelectorAll(".itemQuantity")

//btn carrinho
let comprar = document.querySelector("#comprar")

//validar itens carrinho
let id_itens_inicial = []
let nome_produto_inicial = []
let preco_produto_inicial = []
let itemQuantity_inicial = []

        //--- para os id
for(let i = 0; i < item_id.length; i = i + 1){
    item_id[i].value //pegar valor do campo
    id_itens_inicial.push(item_id[i].value)
}
        //--- para os nomes
for(let i = 0; i < nome_produto.length; i = i + 1){
    nome_produto[i].value
    nome_produto_inicial.push(nome_produto[i].value)
}
        //-- para os preços
for(let i = 0; i < preco_produto.length; i = i + 1){
    preco_produto[i].value
    preco_produto_inicial.push(preco_produto[i].value)
}

    //-- para a quantidade dos itens
for(let i = 0; i < itemQuantity.length; i = i + 1){
    itemQuantity[i].value
    itemQuantity_inicial.push(itemQuantity[i].value)
}

comprar.addEventListener("click", function(evento){
    let id_itens_final = []
    let nome_produto_final = []
    let preco_produto_final = []
    let itemQuantity_final = []

    //pegar frete
    let frete = document.querySelector("#valor_frete").value

    let classProduto = document.querySelectorAll(".produto")

    //-- para a quantidade dos itens
    for(let i = 0;  i < itemQuantity.length; i = i + 1){
        itemQuantity[i].value
        itemQuantity_final.push(itemQuantity[i].value)
    }

    for(let i = 0; i < itemQuantity.length; i = i + 1){
        if(itemQuantity_final[i] == itemQuantity_inicial[i]){
            console.log("quantidade está batendo para cada produto")
        }
        else{
            i = 99
            evento.preventDefault()
            alert("não altere a quantidade original dos produtos")
        }
    }

    //--- para os preços
    for(let i = 0; i < preco_produto.length; i = i + 1){
        preco_produto[i].value
        preco_produto_final.push(preco_produto[i].value)
    }

    for(let i = 0; i < preco_produto.length; i = i + 1){
        if(preco_produto_final[i] == preco_produto_inicial[i]){
            console.log("preço dos produtos originais: " + preco_produto_final[i])
        }
        else{
            i = 99
            evento.preventDefault()
            alert("não altere o preço original do produto")
        }
    }

    //--- para os nomes
    for(let i = 0; i < nome_produto.length; i = i + 1){
        nome_produto[i].value
        nome_produto_final.push(nome_produto[i].value)
    }

    for(let i = 0; i < nome_produto_final.length; i = i + 1){
        if(nome_produto_final[i] == nome_produto_inicial[i]){
            console.log("nome: " + nome_produto_final[i].value + " passou")
        }
        else{
            i = 99
            evento.preventDefault()
            alert("não altere o nome dos produtos")
        }
    }

        //--- para os ids
    for(let i = 0 ; i < item_id.length; i = i + 1){
        item_id[i].value
        id_itens_final.push(item_id[i].value)
    }

    for(let i = 0; i < item_id.length; i = i + 1){
        if(id_itens_final[i] == id_itens_inicial[i]){
            console.log("id: " + id_itens_final[i].value + " passou")
        }
        else{
            i = 99
            evento.preventDefault()
            alert("não altere os id's do formulario")
        }
    }   

    if(classProduto.length <= 0){
        alert("O carrinho está vazio, impossível realizar a compra")
        evento.preventDefault()
    }
    if(frete < 10){
        alert("calcule o frete para o seu pedido")
        evento.preventDefault()
    }
    else{
        setTimeout(function(){
            let form = document.querySelector("#myform")
            //form.action = "/insert_pedido"
            //HTMLFormElement.prototype.submit.call(form)
            form.action = "https://pagseguro.uol.com.br/v2/checkout/payment.html"
            HTMLFormElement.prototype.submit.call(form)
        }, 500)
    }
})

//validar campos names do form do pagseguro
    for(let i = 1; i < item_id.length; i = i + 1){
        let id = i + 1
        item_id[i].name = "itemId" + id
    }

    for(let i = 1; i < nome_produto.length; i = i + 1){
        let id = i + 1
        nome_produto[i].name = "itemDescription" + id
    }

    for(let i = 1; i < preco_produto.length; i = i + 1){
        let id = i + 1
        preco_produto[i].name = "itemAmount" + id
    }

    for(let i = 1; i < preco_produto.length; i = i + 1){
        let id = i + 1
        itemQuantity[i].name = "itemQuantity" + id
    }


//habilitar edição formulario user
const habilitar = document.querySelector("#habilitar")
habilitar.addEventListener("click", function(){
    let editavel = document.querySelectorAll(".editavel")
    let bttnRegistrar = document.querySelector("#bttnRegistrar")

    for(let i = 0; i < editavel.length; i = i + 1){
        if(editavel[i].disabled == true){
            editavel[i].disabled = false
            bttnRegistrar.disabled = false //variavel.atributo = false/true

            habilitar.innerHTML = "Cancelar Edição"
        }
        else if(editavel[i].disabled == false){
            editavel[i].disabled = true
            bttnRegistrar.disabled = true //variavel.atributo = false/true

            habilitar.innerHTML = "Habilitar Edição"
            console.log(habilitar.innerHTML)
        }
    }
})