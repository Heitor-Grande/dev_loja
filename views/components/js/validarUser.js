const bttnRegistrar = document.querySelector("#bttnRegistrar")

bttnRegistrar.addEventListener("click", function(evento){
    //nome
    const senderName = document.querySelector("#senderName").value

    if(senderName.length > 1){
        console.log("nome: " + senderName)

        const cep = document.querySelector("#cep").value
        if(cep.length == 8){
            console.log("cep: " + cep)

            const telefone = document.querySelector("#telefone").value
            const email = document.querySelector("#email").value
            const pass = document.querySelector("#pass").value
            const pass_confirm = document.querySelector("#pass_confirm").value
            const rua = document.querySelector("#rua").value
            const numero = document.querySelector("#numero").value
            const complemento = document.querySelector("#complemento").value
            const bairro = document.querySelector("#bairro").value
            const cidade = document.querySelector("#cidade").value
            const estado = document.querySelector("#estado").value
            if(pass_confirm == pass){
                if(telefone.length && email.length && rua.length && numero.length 
                    && complemento.length && bairro.length && cidade.length && estado.length >= 2){
                    
                }
                else{
                    evento.preventDefault()
                    alert("Existe algum(s) campo(s) preenchido(s) incorretamente")
                }
            }
            else{
                evento.preventDefault()
                alert("As senhas não são iguais.")
            }
        }
        else{
            evento.preventDefault()
            alert("Cep incorreto")
        }
    }
    else{
        evento.preventDefault()
        alert("Nome em branco não é permitido")
    }
})