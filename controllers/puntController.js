const jstat = require('jstat');

// Funciones para las distribuciones puntuales
const calcularPuntualBinomial = (n, p, x) => {
    return jstat.binomial.pdf(x, n, p);
};

const calcularPuntualPoisson = (lambda, x) => {
    return jstat.poisson.pdf(x, lambda);
};

const calcularPuntualGeometrica = (p, x) => {
    return jstat.geometric.pdf(x, p);
};

const calcularPuntualHipergeometrica = (N, K, n, x) => {
    return jstat.hypergeometric.pdf(x, N, K, n);
};

const calcularPuntualBernoulli = (p, x) => {
    return jstat.bernoulli.pdf(x, p);
};

const calcularPuntualNormal = (mean, std, x) => {
    return jstat.normal.pdf(x, mean, std);
};

const calcularPuntualExponencial = (lambda, x) => {
    return jstat.exponential.pdf(x, lambda);
};

const calcularPuntualUniforme = (a, b, x) => {
    return jstat.uniform.pdf(x, a, b);
};

const calcularPuntualTStudent = (v, t) => {
    return jstat.studentt.pdf(t, v);
};

const calcularPuntualChiCuadrado = (k, x) => {
    return jstat.chisquare.pdf(x, k);
};

const calcularPuntualF = (d1, d2, x) => {
    return jstat.centralF.pdf(x, d1, d2);
};

// Controlador para la probabilidad puntual
const calcularProbabilidadPuntual = async (req, res) => {
    try {
        const { tipocalculo, parametro_principal, parametro_secundario, parametro_terciario, parametro_cuaternario } = req.body;
        let resultado;

        switch (tipocalculo) {
            case '1':
                resultado = calcularPuntualBinomial(parseFloat(parametro_principal), parseFloat(parametro_secundario), parseFloat(parametro_terciario));
                break;
            case '2':
                resultado = calcularPuntualPoisson(parseFloat(parametro_principal), parseFloat(parametro_secundario));
                break;
            case '3':
                resultado = calcularPuntualGeometrica(parseFloat(parametro_principal), parseFloat(parametro_secundario));
                break;
            case '4':
                resultado = calcularPuntualHipergeometrica(parseFloat(parametro_principal), parseFloat(parametro_secundario), parseFloat(parametro_terciario), parseFloat(parametro_cuaternario));
                break;
            case '5':
                resultado = calcularPuntualBernoulli(parseFloat(parametro_principal), parseFloat(parametro_secundario));
                break;
            case '6':
                resultado = calcularPuntualNormal(parseFloat(parametro_principal), parseFloat(parametro_secundario), parseFloat(parametro_terciario));
                break;
            case '7':
                resultado = calcularPuntualExponencial(parseFloat(parametro_principal), parseFloat(parametro_secundario));
                break;
            case '8':
                resultado = calcularPuntualUniforme(parseFloat(parametro_principal), parseFloat(parametro_secundario), parseFloat(parametro_terciario));
                break;
            case '9':
                resultado = calcularPuntualTStudent(parseFloat(parametro_principal), parseFloat(parametro_secundario));
                break;
            case '10':
                resultado = calcularPuntualChiCuadrado(parseFloat(parametro_principal), parseFloat(parametro_secundario));
                break;
            case '11':
                resultado = calcularPuntualF(parseFloat(parametro_principal), parseFloat(parametro_secundario), parseFloat(parametro_terciario));
                break;
            default:
                throw new Error('Tipo de distribución no soportado');
        }
        // Envía los datos calculados a la API utilizando el modelo `calculoModel`
        await calculoModel.registrarCalculo(UsuarioID, tipocalculo, parametro_principal, parametro_secundario, parametro_terciario, parametro_cuaternario, resultado, req.cookies.token);

        res.render('resultado-punt', {
            tipocalculo,
            parametro_principal,
            parametro_secundario,
            parametro_terciario,
            parametro_cuaternario,
            resultado
        });

    } catch (error) {
        console.error('Error al calcular la probabilidad puntual:', error);
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = {
    calcularProbabilidadPuntual
};
