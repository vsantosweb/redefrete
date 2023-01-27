export default function licencePlateValidator(placa) {
    var resposta = false;
    const regexPlaca = /^[a-zA-Z]{3}[0-9]{4}$/;
    const regexPlacaMercosulCarro = /^[a-zA-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}$/;
    const regexPlacaMercosulMoto = /^[a-zA-Z]{3}[0-9]{2}[a-zA-Z]{1}[0-9]{1}$/;
    if(regexPlaca.test(placa) || regexPlacaMercosulCarro.test(placa) || regexPlacaMercosulMoto.test(placa)) return true;

    return resposta;
}