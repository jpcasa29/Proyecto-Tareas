const fs = require('fs');

let archivoTareas = {
    archivo: 'tareas.json',
    leerJSON: function () {
        return JSON.parse(fs.readFileSync(this.archivo, 'utf-8'));
    },
    escribirJSON: function (titulo){
        let tareaNueva = {
            titulo: titulo,
            estado: 'pendiente'
        };
        let tareasFinales = this.leerJSON();
        tareasFinales.push(tareaNueva);
        let nuevoListadoDeTareas = JSON.stringify(tareasFinales);
        fs.writeFileSync('./tareas.json', nuevoListadoDeTareas, 'utf8');
        console.log('Tu tarea fue creada Genio');
    },
    filtrarPorEstado: function(estado){
        let tareas = this.leerJSON();
        let tareasFiltradas = tareas.filter(function(elemento){
            return estado == elemento.estado
        })
        return tareasFiltradas;
    }
}

module.exports = archivoTareas;
