const jstat = require('jstat');

// Funciones para las distribuciones acumuladas
const calcularAcumuladaBinomial = (n, p, x) => {
    return jstat.binomial.cdf(x, n, p);
};

const calcularAcumuladaPoisson = (lambda, x) => {
    return jstat.poisson.cdf(x, lambda);
};

const calcularAcumuladaGeometrica = (p, x) => {
    return jstat.geometric.cdf(x, p);
};

const calcularAcumuladaHipergeometrica = (N, K, n, x) => {
    return jstat.hypergeometric.cdf(x, N, K, n);
};

const calcularAcumuladaBernoulli = (p, x) => {
    return jstat.bernoulli.cdf(x, p);
};

const calcularAcumuladaNormal = (mean, std, x) => {
    return jstat.normal.cdf(x, mean, std);
};

const calcularAcumuladaExponencial = (lambda, x) => {
    return jstat.exponential.cdf(x, lambda);
};

const calcularAcumuladaUniforme = (a, b, x) => {
    return jstat.uniform.cdf(x, a, b);
};

const calcularAcumuladaTStudent = (v, t) => {
    return jstat.studentt.cdf(t, v);
};

const calcularAcumuladaChiCuadrado = (k, x) => {
    return jstat.chisquare.cdf(x, k);
};

const calcularAcumuladaF = (d1, d2, x) => {
    return jstat.centralF.cdf(x, d1, d2);
};

// Controlador para la probabilidad acumulada
const calcularProbabilidadAcumulada = async (req, res) => {
    try {
        const { tipocalculo, parametro_principal, parametro_secundario, parametro_terciario, parametro_cuaternario } = req.body;
        let resultado;

        switch (tipocalculo) {
            case '1':
                resultado = calcularAcumuladaBinomial(parseFloat(parametro_principal), parseFloat(parametro_secundario), parseFloat(parametro_terciario));
                break;
            case '2':
                resultado = calcularAcumuladaPoisson(parseFloat(parametro_principal), parseFloat(parametro_secundario));
                break;
            case '3':
                resultado = calcularAcumuladaGeometrica(parseFloat(parametro_principal), parseFloat(parametro_secundario));
                break;
            case '4':
                resultado = calcularAcumuladaHipergeometrica(parseFloat(parametro_principal), parseFloat(parametro_secundario), parseFloat(parametro_terciario), parseFloat(parametro_cuaternario));
                break;
            case '5':
                resultado = calcularAcumuladaBernoulli(parseFloat(parametro_principal), parseFloat(parametro_secundario));
                break;
            case '6':
                resultado = calcularAcumuladaNormal(parseFloat(parametro_principal), parseFloat(parametro_secundario), parseFloat(parametro_terciario));
                break;
            case '7':
                resultado = calcularAcumuladaExponencial(parseFloat(parametro_principal), parseFloat(parametro_secundario));
                break;
            case '8':
                resultado = calcularAcumuladaUniforme(parseFloat(parametro_principal), parseFloat(parametro_secundario), parseFloat(parametro_terciario));
                break;
            case '9':
                resultado = calcularAcumuladaTStudent(parseFloat(parametro_principal), parseFloat(parametro_secundario));
                break;
            case '10':
                resultado = calcularAcumuladaChiCuadrado(parseFloat(parametro_principal), parseFloat(parametro_secundario));
                break;
            case '11':
                resultado = calcularAcumuladaF(parseFloat(parametro_principal), parseFloat(parametro_secundario), parseFloat(parametro_terciario));
                break;
            default:
                throw new Error('Tipo de distribución no soportado');
        }
        // ENviar resultados a la API 
        // Envía los datos calculados a la API utilizando el modelo `calculoModel`
        await calculoModel.registrarCalculo(UsuarioID, tipocalculo, parametro_principal, parametro_secundario, parametro_terciario, parametro_cuaternario, resultado, req.cookies.token);

        res.render('resultado-acum', {
            tipocalculo,
            parametro_principal,
            parametro_secundario,
            parametro_terciario,
            parametro_cuaternario,
            resultado
        });

    } catch (error) {
        console.error('Error al calcular la probabilidad acumulada:', error);
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = {
    calcularProbabilidadAcumulada
};
