var arrayProyectos = [];
var proyectoActual;

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
    SyncStorage("arrayProyectos", arrayProyectos);
}

function MostrarProyecto(proyecto){
    let divProyectos = document.getElementById("divProyectos");
    let divProy = document.createElement("div");

    let divLink = document.createElement("div");
    divLink.onclick = function() {IrAPaginaProyecto(proyecto);};
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
    let array = GetFromStorage('arrayProyectos');
    const igualNombre = (element) => element.nombre == proyecto.nombre;
    let index = array.findIndex(igualNombre);
    array.splice(index,1);
    SyncStorage("arrayProyectos",array);
    LimpiarProyectos();
    PageLoad();
}

function PageLoad(){
    let array = GetFromStorage('arrayProyectos');
    SyncStorage("arrayProyectos", array);
    array.forEach(element => {
        MostrarProyecto(element);
    });  
}

function IrAPaginaProyecto(proyecto){
    SyncStorage("proyectoActual", proyecto)
    window.location.href = "proyecto.html";
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

function SyncStorage(varName, elem){
    SetToStorage(varName, elem);
    switch (varName) {
        case "arrayProyectos":
            arrayProyectos = elem;
            break;
        case "proyectoActual":
            proyectoActual = elem;
            break;
        default:
            console.log("Error 404")
            break;
    }
    
}

function CargarProyecto(){
    proyectoActual = GetFromStorage("proyectoActual");
    console.log(proyectoActual);
    let titulo = document.getElementById("h1Titulo");
    let p = document.getElementById("pDesc");
    p.innerHTML = "AAAA";
    titulo.innerHTML = proyectoActual.nombre;   
}