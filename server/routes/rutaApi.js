const express = require("express");
const app = express();

const usuarios = [
    {
        usuario: "Pedro Soto",
        rut: "19520781-k",
        rol: 2,
    },
    {
        usuario: "Maria Paz",
        rut: "19699076-3",
        rol: 1,
    },
    {
        usuario: "Juan Ito",
        rut: "19530692-3",
        rol: 1,
    },
];

app.get("/api/login/usuario", (req, res) => {
    return res.status(200).json({
        ok: true,
        message: "Usuarios",
        usuarios,
    });
});

app.get("/api/login/usuario/:rut", (req, res) => {
    const rut = req.params.rut;
    if (rut == null || rut == undefined) {
        return res.status(400).json({
            ok: false,
            message: "No Existen Datos",
        });
    }

    if (!checkRut(rut)) {
        return res.status(400).json({
            ok: false,
            message: "Rut no valido",
        });
    }

    let respuesta = usuarios.find((usuarios) => usuarios.rut == rut);
    if (respuesta == null || respuesta == undefined || !respuesta) {
        return res.status(401).json({
            ok: false,
            message: "Usuario no encontrado",
        });
    }
    return res.status(200).json({
        ok: true,
        message: "Usuario",
        respuesta,
    });
});

app.post("/api/login/usuario/pass/:rut", (req, res) => {
    let body;
    body = req.body;
    const pass = body.password;
    const rut = req.params.rut;
    console.log(pass);
    console.log(rut);
    if (rut == null || rut == undefined || pass == null || pass == undefined) {
        return res.status(400).json({
            ok: false,
            message: "No Existen Datos",
        });
    }

    if (!checkRut(rut)) {
        return res.status(400).json({
            ok: false,
            message: "Rut no valido",
        });
    }
    if ((pass = "123456")) {
        return res.status(400).json({
            ok: false,
            message: "contrase�a no valida",
        });
    }

    let respuesta = usuarios.find((usuarios) => usuarios.rut == rut);
    if (respuesta == null || respuesta == undefined || !respuesta) {
        return res.status(401).json({
            ok: false,
            message: "Usuario no encontrado",
        });
    }
    return res.status(200).json({
        ok: true,
        message: "Usuario",
        respuesta,
    });
});

function checkRut(rut) {
    // Obtiene el valor ingresado quitando puntos y guión.
    let valor = clean(rut);

    // Divide el valor ingresado en dígito verificador y resto del RUT.
    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();
    // Separa con un Guión el cuerpo del dígito verificador.
    // Si no cumple con el mínimo ej. (n.nnn.nnn)

    if (cuerpo.length < 7) {
        return false;
    }

    // Calcular Dígito Verificador "Método del Módulo 11"
    let suma = 0;
    let multiplo = 2;

    // Para cada dígito del Cuerpo
    for (i = 1; i <= cuerpo.length; i++) {
        // Obtener su Producto con el Múltiplo Correspondiente
        let index = multiplo * valor.charAt(cuerpo.length - i);

        // Sumar al Contador General
        suma = suma + index;
        // Consolidar Múltiplo dentro del rango [2,7]
        if (multiplo < 7) {
            multiplo = multiplo + 1;
        } else {
            multiplo = 2;
        }
    }

    // Calcular Dígito Verificador en base al Módulo 11
    let dvEsperado = 11 - (suma % 11);

    // Casos Especiales (0 y K)
    dv = dv == "K" ? 10 : dv;
    dv = dv == 0 ? 11 : dv;

    // Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvEsperado != dv) {
        return false;
    } else {
        return true;
    }
}

function clean(rut) {
    return typeof rut === "string" ? rut.replace(/^0+|[^0-9kK]+/g, "").toUpperCase() : "";
}
module.exports = app;
