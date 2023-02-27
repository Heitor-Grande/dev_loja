//router
let express= require("express")
let frete = express.Router()

//correios-brasil
const {calcularPrecoPrazo} = require("correios-brasil")


//calcular frete
frete.get("/calc_frete/:cep", function(req, res){
    let cepDestino = req.params.cep 
    let peso = "1"

    let args = {
        sCepOrigem: '18120000',
        sCepDestino: cepDestino,
        nVlPeso: peso,//peso em kg, para envelope max 1kg
        nCdFormato: '3',//tipo embalagem 1 = Formato caixa/pacote 2 = Formato rolo/prisma 3 = Envelope
        nVlComprimento:"5",//comprimento embalagem - decimal
        nVlAltura: "5",//altura embalagem, se envelope = 0 - decimal
        nVlLargura: "5",//largura embalagem - decimal
        nCdServico: ['04014'], //Array com os códigos de serviço
        nVlDiametro: '0', //diamentro caixa - decimal
      }

      calcularPrecoPrazo(args).then(function([response]){
        console.log(response.Valor)
        res.send(response.Valor + "," + response.PrazoEntrega)
      })
})

module.exports = frete