const axios = require('axios');

class Calculos {
    constructor( UsuarioID , tipocalculo, parametro_principal, parametro_secundario, parametro_terciario, parametro_cuaternario, resultado) {
        this.UsuarioID = UsuarioID;
        this.tipocalculo = tipocalculo;
        this.parametro_principal = parametro_principal;
        this.parametro_secundario = parametro_secundario;
        this.parametro_terciario = parametro_terciario;
        this.parametro_cuaternario = parametro_cuaternario;
        this.resultado = resultado;
    }
}

// BLOQUE CON FUNCIÓN PARA PODER ALMACENAR EL CALCULO EFECTUADO
async function registrarCalculo(UsuarioID, tipocalculo, parametro_principal, parametro_secundario, parametro_terciario, parametro_cuaternario, resultado, token) {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    try {
        const response = await axios.post(`${process.env.BASE_URL}/calculo/registrar-operacion`, {
            UsuarioID,
            tipocalculo,
            parametro_principal,
            parametro_secundario,
            parametro_terciario,
            parametro_cuaternario,
            resultado
        }, axiosConfig);
        console.log('Información a enviar:', response.data);
        //Regresar la data que espera de la API
        return response.data;
    } catch (error) {
        console.error('Error al registrar el calculo efectuado', error);
        throw error;
    }
}

// Función para poder obtener los calculos (historial)
async function obtenerHistorial(UsuarioID, token) {
    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    try {
        const response = await axios.post(`${process.env.BASE_URL}/calculo/historial`, { UsuarioID }, axiosConfig);
        return response.data.map( calculo => {
            return new Calculos(
                calculo.UsuarioID,
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
