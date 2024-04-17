var arrayProyectos = [];
console.log(arrayProyectos);
var proyectoActual;


function IngresarProyecto(){
    let input = document.getElementById("InputNombreProyecto");
    let nombreProyecto = input.value;
    let proyecto = {
        nombre: nombreProyecto,
        desc: null,
        taskArray: []
    }
    console.log(proyecto);
    AgregarProyectoAArray(proyecto);
    MostrarProyecto(proyecto);
}

function AgregarProyectoAArray(proyecto){
    console.log(arrayProyectos);
    console.log(proyecto)
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
    if(array!=null){
        SyncStorage("arrayProyectos", array);
        array.forEach(element => {
            MostrarProyecto(element);
        });  
    }
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
    titulo.innerHTML = proyectoActual.nombre;   
}


//Tareas
function AgregarTarea(){
    // addEventListener(DOMContent)
    let tagInput = document.getElementById("inputTaskTitle");
    if(tagInput.value != ""){
        let displayArray = [];
        var divDisplay = document.getElementById("divDisplay");
        divDisplay.innerHTML = "";
        let task = {title: "", desc: "", crossed: false, expire: "undefined"};
        task.title = tagInput.value;
        //Input desc y expire
        proyectoActual.taskArray.push(task);
        displayArray = proyectoActual.taskArray;
        tagInput.value = "";

        displayArray.forEach(element => {
            let pTaskTitle = document.createElement("p");
            let pExpire = document.createElement("p");
            pTaskTitle.innerHTML = `${element.title}:`;
            var divPanel = document.createElement("div");
            console.log(divDisplay)
            divPanel.appendChild(pTaskTitle);
            divPanel.appendChild(pExpire);
            divDisplay.appendChild(divPanel);
        });
    }
}