var arrayProyectos = [];

function IngresarProyecto(){
    let input = document.getElementById("InputNombreProyecto");
    let nombreProyecto = input.value;
    let proyecto = {
        nombre: nombreProyecto,
        desc: null,
        tareas: []
    }
    AgregarProyectoAArray(proyecto);
    MostrarProyecto(proyecto);
}

function AgregarProyectoAArray(proyecto){
    arrayProyectos.push(proyecto);
    SyncStorage(arrayProyectos);
}

function MostrarProyecto(proyecto){
    let divProyectos = document.getElementById("divProyectos");
    let divProy = document.createElement("div");

    let divLink = document.createElement("div");
    divLink.onclick = function() {PaginaProyecto(proyecto);};
    divProy.appendChild(divLink);

    let nombreProyecto = document.createElement("h3");
    nombreProyecto.innerHTML = `${proyecto.nombre}`;
    divLink.appendChild(nombreProyecto);

    let btnBorrar = document.createElement("button");
    btnBorrar.onclick = function() {EliminarProyecto(proyecto)};
    divProy.appendChild(btnBorrar);

    let imgBorrar = document.createElement("img");
    imgBorrar.src = "delete.png";
    imgBorrar.className = "imgborrar";
    btnBorrar.appendChild(imgBorrar);

    divProyectos.appendChild(divProy);
}

function EliminarProyecto(proyecto){
    let array = GetFromStorage('arrayProyectos')
    let index = array.indexOf(proyecto);
    array.splice(index,1)
    SyncStorage(array);
    LimpiarProyectos();
    PageLoad();
}

function PageLoad(){
    let array = GetFromStorage('arrayProyectos');
    array.forEach(element => {
        MostrarProyecto(element);
    });  
}

function PaginaProyecto(proyecto){
    window.location.href = "proyecto.html";
    let titulo = document.getElementById("h1Titulo");
    titulo.textContent = proyecto.nombre;
}

function LimpiarProyectos(){
    document.getElementById("divProyectos").innerHTML = "";
}

function GetFromStorage(str){
    return JSON.parse(sessionStorage.getItem(str)); 
}

function SetToStorage(varName, elem){
    sessionStorage.removeItem(varName);
    sessionStorage.setItem(varName, JSON.stringify(elem));
}

function SyncStorage(array){
    SetToStorage("arrayProyectos", array);
    arrayProyectos = array;
}