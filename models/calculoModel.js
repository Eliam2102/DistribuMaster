const axios = require('axios');

class Calculos {
    constructor( userId , tipocalculo, parametro_principal, parametro_secundario, parametro_terciario, parametro_cuaternario, resultado) {
        this.userId = userId;
        this.tipocalculo = tipocalculo;
        this.parametro_principal = parametro_principal;
        this.parametro_secundario = parametro_secundario;
        this.parametro_terciario = parametro_terciario;
        this.parametro_cuaternario = parametro_cuaternario;
        this.resultado = resultado;
    }
}

// BLOQUE CON FUNCIÓN PARA PODER ALMACENAR EL CALCULO EFECTUADO
async function registrarCalculo(userId, tipocalculo, parametro_principal, parametro_secundario, parametro_terciario, parametro_cuaternario, resultado, token) {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    try {
        const response = await axios.post(`${process.env.BASE_URL}/calculo/registrar-operacion`, {
            userId,
            tipocalculo,
            parametro_principal,
            parametro_secundario,
            parametro_terciario,
            parametro_cuaternario,
            resultado
        }, axiosConfig);
        console.log('Información a enviar:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al registrar el calculo efectuado', error);
        throw error;
    }
}

// Función para poder obtener los calculos (historial)
async function obtenerHistorial(userId, token) {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    try {
        const response = await axios.post(`${process.env.BASE_URL}/calculo/historial/`, { userId }, axiosConfig);
        return response.data.map(calculo => {
            return new Calculos(
                calculo.userId,
                calculo.tipocalculo,
                calculo.parametro_principal,
                calculo.parametro_secundario,
                calculo.parametro_terciario,
                calculo.parametro_cuaternario,
                calculo.resultado
            );
        });
    } catch (error) {
        console.error('Error al obtener los calculos efectuados por el usuario:', error);
        throw error;
    }
}

module.exports = {
    registrarCalculo,
    obtenerHistorial
};