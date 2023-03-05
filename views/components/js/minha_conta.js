//gerar reference
let reference = document.querySelector("#cod_pedido")
reference.value = parseInt(Math.random() * 999999)

//campos carrinho
let item_id = document.querySelectorAll(".item_id")
let nome_produto = document.querySelectorAll(".nome_produto")
let preco_produto = document.querySelectorAll(".preco_produto")
let itemQuantity = document.querySelectorAll(".itemQuantity")

//valor total carrinho
let valor_total = 0
for(let i = 1; i < preco_produto.length; i = i + 1){
    let valor_item = parseFloat(preco_produto[i].value) * parseInt(itemQuantity[i].value)
    valor_total = valor_total + valor_item
    document.querySelector("#valor_total").value = "R$" + valor_total
}

//quantidade de itens no carrinho
let itens_carrinho = nome_produto.length - 1
document.querySelector("#quantidade_total_itens").value = itens_carrinho

//btn carrinho
let comprar = document.querySelector("#comprar")

comprar.addEventListener("click", function(evento){

    //pegar frete
    let frete = document.querySelector("#valor_frete").value

    //se existe item carrinho
    let classProduto = document.querySelectorAll(".produto")

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
        nome_produto[i].name = "itemDescription" + id
        preco_produto[i].name = "itemAmount" + id 
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


//calc frete att preco total
const btn= document.querySelector("#btnFrete")
btn.addEventListener("click", function(){

    setTimeout(function(){
        //pegar frete
        let frete = document.querySelector("#valor_frete").value

        //att preco total 
        valor_total = valor_total + parseFloat(frete)
        document.querySelector("#valor_total").value = "R$" + valor_total
        document.querySelector("#valor_total_back").value = valor_total
    }, 1000)
})