let menos = document.querySelector("#menos")
let mais = document.querySelector("#mais")
let num_itens = document.querySelector("#num_itens")
let item_quantidade = document.querySelector("#item_quantidade")
let produto_quantidade = document.querySelector("#produto_quantidade")

let num = 1

menos.addEventListener("click", function(){
    num = num - 1
    if(num <= 1){
        num = 1
        num_itens.value = num
        item_quantidade.value = num
        produto_quantidade.value = num
    }
    else{
        num_itens.value = num
        item_quantidade.value = num
        produto_quantidade.value = num
    }
})

mais.addEventListener("click", function(){
    num = num + 1
    if(num <= 1){
        num = 1
        num_itens.value = num
        item_quantidade.value = num
        produto_quantidade.value = num
    }
    else{
        num_itens.value = num
        item_quantidade.value = num
        produto_quantidade.value = num
    }
})