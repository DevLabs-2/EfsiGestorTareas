var arrayProyectos = [];


function IngresarProyecto(){
    let input = document.getElementById("InputNombreProyecto");
    let nombreProyecto = input.value;
    let proyecto = {
        nombre: nombreProyecto,
        desc: null,
        tareas: []
    }
    AgregarProyecto(proyecto);
}


function AgregarProyecto(proyecto){
    arrayProyectos.push(proyecto);
    let divProyectos = document.getElementById("divProyectos");
    let divProy = document.createElement("div");

    let divLink = document.createElement("div");
    divLink.onclick = function() {window.location.href = "proyecto.html"};
    divProy.appendChild(divLink);

    let nombreProyecto = document.createElement("h3");
    nombreProyecto.innerHTML = `${proyecto.nombre}`;
    divLink.appendChild(nombreProyecto);

    let btnBorrar = document.createElement("button");
    btnBorrar.innerHTML = "a";
    btnBorrar.onclick = function() {EliminarProyecto(proyecto)};
    divProy.appendChild(btnBorrar);

    divProyectos.appendChild(divProy);
}
function EliminarProyecto(proyecto){

}

function PageLoad(){
    arrayProyectos.forEach(element => {
        AgregarProyecto(element);
    });
}