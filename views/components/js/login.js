let btn = document.querySelector("#btn")
let aviso = document.querySelector("#aviso")
btn.addEventListener("click", function(evento){
    setTimeout(function(){
        evento.preventDefault()
        aviso.style.cssText = "display: block"
    }, 3000)   
})