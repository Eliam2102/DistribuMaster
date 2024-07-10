//Importaciones necesarias
const calculoModel = require('../models/calculoModel');
const authMiddleWare = require('../middleware/authMiddleware');
const jstat = require('jstat');


// Aqui utilizamos jstat ya que soporta calculos mas grandes y avanzados
//BLOQUE PARA EL CALCULO DE LAS DISTRIBUCIONES CONTINUAS
// Función para calcular la distribución normal usando jstat
const calcularNormal = (mean, std, x) => {
    if (isNaN(mean) || isNaN(std) || isNaN(x)) {
        throw new Error("Los parámetros mean, std y x deben ser numéricos");
    }
    return jstat.normal.pdf(x, mean, std);
};

// Función para calcular la distribución exponencial usando jstat
const calcularExponencial = (lambda, x) => {
    if (isNaN(lambda) || isNaN(x)) {
        throw new Error("Los parámetros lambda y x deben ser numéricos");
    }
    return jstat.exponential.pdf(x, lambda);
};

// Función para calcular la distribución uniforme usando jstat
const calcularUniforme = (a, b, x) => {
    if (isNaN(a) || isNaN(b) || isNaN(x)) {
        throw new Error("Los parámetros a, b y x deben ser numéricos");
    }
    return jstat.uniform.pdf(x, a, b);
};

// Función para calcular la distribución t de Student usando jstat
const calcularTStudent = (v, t) => {
    if (isNaN(v) || isNaN(t)) {
        throw new Error("Los parámetros v y t deben ser numéricos");
    }
    return jstat.studentt.pdf(t, v);
};

// Función para calcular la distribución chi-cuadrado usando jstat
const calcularChiCuadrado = (k, x) => {
    if (isNaN(k) || isNaN(x)) {
        throw new Error("Los parámetros k y x deben ser numéricos");
    }
    return jstat.chisquare.pdf(x, k);
};

// Función para calcular la distribución F de Fisher-Snedecor usando jstat
const calcularF = (d1, d2, x) => {
    if (isNaN(d1) || isNaN(d2) || isNaN(x)) {
        throw new Error("Los parámetros d1, d2 y x deben ser numéricos");
    }
    return jstat.centralF.pdf(x, d1, d2);
};
//Finalización del bloque de distribuciones continuas


// Creación de la función para poder calcular la operación según sea el parámetro recibido
async function calcularOperacion(req, res, UsuarioID, tipocalculo, parametro_principal, parametro_secundario, parametro_terciario, parametro_cuaternario, token) {
    try {
        const { tipocalculo, parametro_principal, parametro_secundario, parametro_terciario, parametro_cuaternario, token} = req.body;

        console.log('Datos recibidos:', {UsuarioID, tipocalculo, parametro_principal, parametro_secundario, parametro_terciario, parametro_cuaternario });
        console.log('UsuarioID en controlador:', UsuarioID);
        let resultado;

        switch (tipocalculo) {
            case '6':
                //Aqui primero pasamos lo valores a variables para fromatearlos y que las funciones qeu se ejecutaran reciban los parametros necesarios.
                const mean = parseFloat(parametro_principal);
                const std = parseFloat(parametro_secundario);
                const xNormal = parseFloat(parametro_terciario);
                resultado = calcularNormal(mean, std, xNormal);
                console.log('Cálculo normal:', resultado);
                break;

            case '7':
                const lambdaExp = parseFloat(parametro_principal);
                const xExp = parseFloat(parametro_secundario);
                resultado = calcularExponencial(lambdaExp, xExp);
                console.log('Cálculo exponencial:', resultado);
                break;

            case '8':
                const a = parseFloat(parametro_principal);
                const b = parseFloat(parametro_secundario);
                const xUniforme = parseFloat(parametro_terciario);
                resultado = calcularUniforme(a, b, xUniforme);
                console.log('Cálculo uniforme:', resultado);
                break;

            case '9':
                const v = parseFloat(parametro_principal);
                const t = parseFloat(parametro_secundario);
                resultado = calcularTStudent(v, t);
                console.log('Cálculo t de Student:', resultado);
                break;

            case '10':
                const kChi = parseFloat(parametro_principal);
                const xChi = parseFloat(parametro_secundario);
                resultado = calcularChiCuadrado(kChi, xChi);
                console.log('Cálculo chi-cuadrado:', resultado);
                break;

            case '11':
                const d1 = parseFloat(parametro_principal);
                const d2 = parseFloat(parametro_secundario);
                const xF = parseFloat(parametro_terciario);
                resultado = calcularF(d1, d2, xF);
                console.log('Cálculo F de Fisher-Snedecor:', resultado);
                break;

            default:
            throw new Error('Tipo de cálculo no soportado');
        }

        // Envía los datos calculados a la API utilizando el modelo `calculoModel`
        await calculoModel.registrarCalculo(UsuarioID, tipocalculo, parametro_principal, parametro_secundario, parametro_terciario, parametro_cuaternario, resultado, req.cookies.token);
         // redirigir a la vista
        // Redirección a la vista de resultados con los parámetros y el resultado
        res.render('resultado-continuas', {
            tipocalculo,
            parametro_principal,
            parametro_secundario,
            parametro_terciario,
            parametro_cuaternario,
            resultado
        });
    
    } catch (error) {
        console.error('Error en el cálculo continuo, por favor verifica introducir datos correctos:', error);
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}

module.exports = {
    calcularOperacion
};