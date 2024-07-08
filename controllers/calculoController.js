const calculoModel = require('../models/calculoModel');
const authMiddleWare = require('../middleware/authMiddleware');
const math = require('mathjs');
const jstat = require('jstat');

// Función para calcular la distribución binomial
const calcularBinomial = (n, k, p) => {
    if (isNaN(n) || isNaN(k) || isNaN(p)) {
        throw new Error("Los parámetros n, k y p deben ser numéricos");
    }
    if (k < 0 || k > n || p < 0 || p > 1) {
        throw new Error("Parámetros fuera de rango: 0 ≤ k ≤ n, 0 ≤ p ≤ 1");
    }
    return math.combinations(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
};

// Función para calcular la distribución de Poisson
const calcularPoisson = (lambda, k) => {
    if (isNaN(lambda) || isNaN(k)) {
        throw new Error("Los parámetros lambda y k deben ser numéricos");
    }
    if (k < 0) {
        throw new Error("k debe ser mayor o igual a 0");
    }
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / math.factorial(k);
};

// Función para calcular la distribución geométrica
const calcularGeometrica = (p, k) => {
    if (isNaN(p) || isNaN(k)) {
        throw new Error("Los parámetros p y k deben ser numéricos");
    }
    if (p <= 0 || p > 1) {
        throw new Error("La probabilidad p debe estar entre 0 y 1");
    }
    if (k < 1) {
        throw new Error("El número de ensayos k debe ser mayor o igual a 1");
    }
    return p * Math.pow(1 - p, k - 1);
};

// Función para calcular la distribución hipergeométrica
const calcularHipergeometrica = (N, K, n, k) => {
    if (isNaN(N) || isNaN(K) || isNaN(n) || isNaN(k)) {
        throw new Error("Los parámetros N, K, n y k deben ser numéricos");
    }
    if (N < 0 || K < 0 || n < 0 || k < 0 || K > N || n > N || k > n) {
        throw new Error("Parámetros fuera de rango: 0 ≤ K ≤ N, 0 ≤ n ≤ N, 0 ≤ k ≤ n");
    }
    return (math.combinations(K, k) * math.combinations(N - K, n - k)) / math.combinations(N, n);
};

// Función para calcular la distribución de Bernoulli
const calcularBernoulli = (p, x) => {
    if (isNaN(p) || isNaN(x)) {
        throw new Error("Los parámetros p y x deben ser numéricos");
    }
    if (p < 0 || p > 1 || (x !== 0 && x !== 1)) {
        throw new Error("Parámetros fuera de rango: 0 ≤ p ≤ 1, x ∈ {0, 1}");
    }
    return x === 1 ? p : 1 - p;
};

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

// Creación de la función para poder calcular la operación según sea el parámetro
async function calcularOperacion(req, res, id, tipocalculo, parametro_principal, parametro_secundario, parametro_terciario, parametro_cuaternario, token) {
    try {
        const {userId, tipocalculo, parametro_principal, parametro_secundario, parametro_terciario, parametro_cuaternario, token} = req.body;

        console.log('Datos recibidos:', req.body);

        let resultado;

        switch (tipocalculo) {
            case 'binomial':
                const n = parseInt(parametro_principal);
                const k = parseInt(parametro_secundario);
                const p = parseFloat(parametro_terciario);
                resultado = calcularBinomial(n, k, p);
                console.log('Cálculo binomial:', resultado);
                break;

            case 'poisson':
                const lambda = parseFloat(parametro_principal);
                const kPoisson = parseInt(parametro_secundario);
                resultado = calcularPoisson(lambda, kPoisson);
                console.log('Cálculo Poisson:', resultado);
                break;

            case 'geometrica':
                const pGeometrica = parseFloat(parametro_principal);
                const kGeometrica = parseInt(parametro_secundario);
                resultado = calcularGeometrica(pGeometrica, kGeometrica);
                console.log('Cálculo geométrica:', resultado);
                break;

            case 'hipergeometrica':
                const N = parseInt(parametro_principal);
                const K = parseInt(parametro_secundario);
                const nHiper = parseInt(parametro_terciario);
                const kHiper = parseInt(parametro_cuaternario);
                resultado = calcularHipergeometrica(N, K, nHiper, kHiper);
                console.log('Cálculo hipergeométrica:', resultado);
                break;

            case 'bernoulli':
                const pBernoulli = parseFloat(parametro_principal);
                const xBernoulli = parseInt(parametro_secundario);
                resultado = calcularBernoulli(pBernoulli, xBernoulli);
                console.log('Cálculo Bernoulli:', resultado);
                break;

            case 'normal':
                const mean = parseFloat(parametro_principal);
                const std = parseFloat(parametro_secundario);
                const xNormal = parseFloat(parametro_terciario);
                resultado = calcularNormal(mean, std, xNormal);
                console.log('Cálculo normal:', resultado);
                break;

            case 'exponencial':
                const lambdaExp = parseFloat(parametro_principal);
                const xExp = parseFloat(parametro_secundario);
                resultado = calcularExponencial(lambdaExp, xExp);
                console.log('Cálculo exponencial:', resultado);
                break;

            case 'uniforme':
                const a = parseFloat(parametro_principal);
                const b = parseFloat(parametro_secundario);
                const xUniforme = parseFloat(parametro_terciario);
                resultado = calcularUniforme(a, b, xUniforme);
                console.log('Cálculo uniforme:', resultado);
                break;

            case 'tstudent':
                const v = parseFloat(parametro_principal);
                const t = parseFloat(parametro_secundario);
                resultado = calcularTStudent(v, t);
                console.log('Cálculo t de Student:', resultado);
                break;

            case 'chicuadrado':
                const kChi = parseFloat(parametro_principal);
                const xChi = parseFloat(parametro_secundario);
                resultado = calcularChiCuadrado(kChi, xChi);
                console.log('Cálculo chi-cuadrado:', resultado);
                break;

            case 'f':
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
        await calculoModel.registrarCalculo(req.useId, tipocalculo, parametro_principal, parametro_secundario, parametro_terciario, parametro_cuaternario, resultado, req.cookies.token);

        res.json({
            status: 'success',
            data: {
                resultado
            }
        });
    } catch (error) {
        console.error('Error en el cálculo:', error);
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}

module.exports = {
    calcularOperacion
};
