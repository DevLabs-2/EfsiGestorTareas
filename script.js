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
    SetToStorage('arrayProyectos', arrayProyectos);
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
    console.log("Eliminar Proyecto");
    let array = GetFromStorage('arrayProyectos')
    let encontrado = false;
    let i = 0;
    
    while(!encontrado){
        console.log(array[i].nombre, proyecto.nombre)
        if(array[i].nombre == proyecto.nombre){
            encontrado = true;
            array = array.pop();
        }
        i++;
    }
    SetToStorage('arrayProyectos',array)
    LimpiarProyectos();
    PageLoad();
}

function PageLoad(){
    let array = GetFromStorage('arrayProyectos');
    array.forEach(element => {
        AgregarProyecto(element);
    });
    
}

function PaginaProyecto(proyecto){
    window.location.href = "proyecto.html";
    let titulo = document.getElementById("h1Titulo");
    titulo.textContent = proyecto.nombre;
    console.log(`nombre: ${proyecto.nombre}`);
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