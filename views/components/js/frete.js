let xhr = new XMLHttpRequest()


let btnFrete = document.querySelector("#btnFrete")
btnFrete.addEventListener("click", function(){

    let cep = document.querySelector("#cepDest").value

    xhr.open("GET", `/calc_frete/${cep}`, true)

    xhr.onreadystatechange = function(){
        let response = xhr.responseText
        let response_frete_detalhe = response.split(",")
        document.querySelector("#frete_preco").textContent = 
        "Valor do frete: R$" + response_frete_detalhe[0] + "." + response_frete_detalhe[1]
        //
        document.querySelector("#valor_frete").value = response_frete_detalhe[0] + "." + response_frete_detalhe[1]
        document.querySelector("#prazo").textContent = "Prazo estimado para entrega em até: " + response_frete_detalhe[2] + " dias úteis"
    }
    xhr.send()
})
