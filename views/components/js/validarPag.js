//gerar reference
let reference = document.querySelector("#cod_pedido")
reference.value = parseInt(Math.random() * 999999)

//campos para validação
const email_loja = document.querySelector("#email_loja").value
const moeda = document.querySelector("#moeda").value
const item_id = document.querySelector("#item_id").value
const preco_produto = document.querySelector("#preco_produto").value

//atualizar nome do produto
let nome_produto = document.querySelector("#nome_produto").value

//validar
const comprar = document.querySelector("#comprar")
comprar.addEventListener("click", function(evento){

    //validação de quantidade
    const quantidade_estoque_string = document.querySelector("#quant").value
    const item_quantidade_string = document.querySelector("#num_itens").value
    const quantidade_estoque_number = parseInt(quantidade_estoque_string)
    const item_quantidade_number = parseInt(item_quantidade_string)

    //att nome produto
    let tamanho = document.querySelector("#tamanho").value
    nome_produto = nome_produto + " " + tamanho
    document.querySelector("#nome_produto").value = nome_produto
    //fim nome produto

    //pegar frete
    let frete = document.querySelector("#valor_frete").value

    //quantidade total
    document.querySelector("#quantidade_total_itens").value = item_quantidade_number

    //valor total
    document.querySelector("#valor_total_back").value = (item_quantidade_number * preco_produto) + parseFloat(frete)

    //dados form
    const email_loja_v = document.querySelector("#email_loja").value
    const moeda_v = document.querySelector("#moeda").value
    const item_id_v = document.querySelector("#item_id").value
    const preco_produto_v = document.querySelector("#preco_produto").value

    if(frete <= 10){
        alert("calcule o frete para realizar a compra")
        evento.preventDefault()
    }
    else if(frete > 10){
        if(email_loja_v === email_loja && moeda_v === moeda && item_id_v === item_id 
            && preco_produto_v === preco_produto){

            if(quantidade_estoque_number >= item_quantidade_number){
                    setTimeout(function(){
                        let form = document.querySelector("#myform")
                        //form.action = "/insert_pedido"
                        //HTMLFormElement.prototype.submit.call(form)
                        form.action = "https://pagseguro.uol.com.br/v2/checkout/payment.html"
                        HTMLFormElement.prototype.submit.call(form)
                    }, 500)
            }
            else{
                evento.preventDefault()
                alert("quantidade não existente no estoque atual.")
            }
        }
        else{
            evento.preventDefault()
            alert("Dados de produto incorretos, não altere seus valores padrões.")
        }
    }
})

const add_carrinho = document.querySelector("#add_carrinho")
add_carrinho.addEventListener("click", function(evento){

    const email_loja_v = document.querySelector("#email_loja").value
    const moeda_v = document.querySelector("#moeda").value
    const item_id_v = document.querySelector("#i_p").value
    const preco_produto_v = document.querySelector("#p_p").value

    if(email_loja_v === email_loja && moeda_v === moeda && item_id_v === item_id
        && preco_produto_v === preco_produto){


    }
    else{
        evento.preventDefault()
        alert("Dados de produto incorretos, não altere seus valores padrões.")
    }
})


//para venda detalhes
