const statusPedido = document.querySelectorAll(".statusPedido")


if(statusPedido.length > 1){
    for(let i = 0; i < statusPedido.length; i = i + 1){
        if(statusPedido[i].textContent == "Aguardando liberação"){
            statusPedido[i].style.cssText = "color: red;" + "background-color: grey"
        }
        else if(statusPedido[i].textContent == "Aguardando envio"){
            statusPedido[i].style.cssText = "color: yellow;" + "background-color: grey"
        }
        else if(statusPedido[i].textContent == "A caminho"){
            statusPedido[i].style.cssText = "color: green;" + "background-color: grey"
        }
        else if(statusPedido[i].textContent == "Entregue"){
            statusPedido[i].style.cssText = "color: blue;" + "background-color: grey"
        }
        else if(statusPedido[i].textContent == "Cancelado"){
            statusPedido[i].style.cssText = "color: blue;" + "background-color: grey"
        }
        else if(statusPedido[i].textContent == "Reembolsado"){
            statusPedido[i].style.cssText = "color: blue;" + "background-color: grey"
        }
    }
}
else{
    if(statusPedido[0].textContent == "Aguardando liberação"){
        statusPedido[0].style.cssText = "color: red;" + "background-color: grey"
    }
    else if(statusPedido[0].textContent == "Aguardando envio"){
        statusPedido[0].style.cssText = "color: yellow;" + "background-color: grey"
    }
    else if(statusPedido[0].textContent == "A caminho"){
        statusPedido[0].style.cssText = "color: green;" + "background-color: grey"
    }
    else if(statusPedido[0].textContent == "Entregue"){
        statusPedido[0].style.cssText = "color: blue;" + "background-color: grey"
    }
    else if(statusPedido[0].textContent == "Cancelado"){
        statusPedido[0].style.cssText = "color: blue;" + "background-color: grey"
    }
    else if(statusPedido[0].textContent == "Reembolsado"){
        statusPedido[0].style.cssText = "color: blue;" + "background-color: grey"
    }
}