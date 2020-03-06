const CAMPOS_VALIDOS = ['diasemana', 'data', 'entrada1', 'saida1','entrada2', 'saida2'];

class ValidacaoUtils {
    
    isEntradaValida(entrada) {
        let valido = true;

        CAMPOS_VALIDOS.forEach(campo => {
            if(!entrada.hasOwnProperty(campo)) {
                vlistenalido = false;
            }
        });

        return valido;
    }

    getCamposValidos(entrada) {
        let novo = new Object();

        CAMPOS_VALIDOS.forEach(campo => {
            if(entrada.hasOwnProperty(campo)) {
                novo[campo] = entrada[campo];
            }
        });

        return novo;
    }

}

module.exports = new ValidacaoUtils();
