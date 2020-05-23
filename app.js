// requerir un modulo nativo de NODE para recuperar datos de un archivo
let fs = require('fs');

// requerir funciones de otro .js
let funcionTareas = require("./tareas");

// requerir un modulo nativo de NODE
let process = require('process');

let comando = process.argv[2];

// readFileSync, es para recuperar datos de un archivo/url
let listaDeTareas = fs.readFileSync('./tareas.json', 'utf8');
let tareasFinales = JSON.parse(listaDeTareas);

switch(comando){
    case '?':
        console.log('Hola :) !!! en este archivo podes hacer alguna de las siguientes tareas:');
        console.log('- Listar');
        console.log('- Crear');
        console.log('  (al utilizar "Crear", después debes dejar un espacio y entre comillas poner el título de la tarea)');
        console.log('- ModificarEstado');
        console.log('  (al utilizar "ModificarEstado", después debes dejar un espacio y entre comillas poner el nuevo estado)');
        console.log('  Los estados posibles son: pendiente, en progreso, terminada');
        console.log('- ModificarTitulo');
        console.log('  (al utilizar "ModificarTitulo", después debes dejar un espacio, poner el numero de tarea, un espacio y entre comillas poner el nuevo Titulo)');
        console.log('- FiltrarEstados');
        console.log('  (al utilizar "FiltrarEstados", después debes dejar un espacio, poner el estado a filtrar)');
        break;
    case 'Listar':
        console.log(' ');
        console.log('Este es tu listado de tareas');
        console.log('----------------------------');

        tareasFinales.forEach(function(elemento, indice) {
            console.log(indice + ' - ' + tareasFinales[indice].titulo + ' - ' + tareasFinales[indice].estado);    
        });

        // for (let i=0; i < tareasFinales.length; i++){
        // console.log(i + ' - ' + tareasFinales[i].titulo + ' - ' + tareasFinales[i].estado);
        // }
        console.log(' ');
        break;
    case 'Crear':
        let tituloDeLaTarea = process.argv[3];
        let crearTareas = funcionTareas.escribirJSON(tituloDeLaTarea);
        break;
    case 'ModificarEstado':
        let codigoDeTarea = process.argv[3];
        let nuevoEstado = process.argv[4];
        if (tareasFinales.length >= codigoDeTarea){
            for (let i = 0; i < tareasFinales.length; i++){
                if ( i == codigoDeTarea){
                    tareasFinales[i].estado = nuevoEstado;
                    let nuevoListadoDeTareasModificadasEstado = JSON.stringify(tareasFinales);
                    fs.writeFileSync('./tareas.json', nuevoListadoDeTareasModificadasEstado, 'utf8');
                    console.log('El estado de la tarea "' + tareasFinales[codigoDeTarea].titulo + '" fue modificado a "' + nuevoEstado + '"');
                };
            };
        } else {
        console.log('Ese número de tarea no existe');
        };
    break;
    case 'ModificarTitulo':
        let codigoDeTareaTitulo = process.argv[3];
        let nuevoTitulo = process.argv[4];
        if (tareasFinales.length >= codigoDeTareaTitulo){
            for (let i = 0; i < tareasFinales.length; i++){
                if ( i == codigoDeTareaTitulo){
                    tareasFinales[i].titulo = nuevoTitulo;
                    let nuevoListadoDeTareasModificadasTitulos = JSON.stringify(tareasFinales);
                    fs.writeFileSync('./tareas.json', nuevoListadoDeTareasModificadasTitulos, 'utf8');
                    console.log('El título de la tarea fue a modificado a "' + tareasFinales[codigoDeTareaTitulo].titulo + '"');
                };
            };
        } else {
        console.log('Ese número de tarea no existe');
        };
        break;
    case 'FiltrarEstados':
        let estadoFiltrar = process.argv[3];
        let tareasFiltradas = funcionTareas.filtrarPorEstado(estadoFiltrar);
        for (let i=0; i < tareasFiltradas.length; i++){
            console.log('Tarea ' + tareasFiltradas[i].titulo);
        }


    break;
    case undefined:
        console.log(' ');
        console.log('Hey! no me enviaste ningún comando');
        console.log(' ');
        console.log('Podes consultar los comandos con "?"');
        console.log(' ');
        break;
    default:
        console.log(' ');
        console.log('Consulta los comandos con "?"');
        console.log(' ');
        }

/*
console.log('hola mundo');

f

*/