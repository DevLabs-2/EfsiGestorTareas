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
    let index = FindProyecto(proyecto,array);
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

function VolverAlIndex(proyecto){
    window.location.href = "index.html";  
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
    var divDisplay = document.getElementById("divDisplay");
    DisplayTasks(proyectoActual.taskArray); 
}

function UpdateProyecto(proyecto){
    let arrayProyectos = GetFromStorage("arrayProyectos");
    let index = FindProyecto(proyecto, arrayProyectos);
    arrayProyectos[index] = proyecto;
    SetToStorage("arrayProyectos", arrayProyectos);
}

function FindProyecto(proyecto, array){
    const igualNombre = (element) => element.nombre == proyecto.nombre;
    let index = array.findIndex(igualNombre);
    return index;
}

function FindTarea(proyecto, tarea){
    const igualNombre = (element) => element.title == tarea.title;
    let index = proyecto.taskArray.findIndex(igualNombre);
    return index;
}

//Tareas
function AgregarTarea(){
    let inputTitle = document.getElementById('inputTaskTitle');
    let inputDesc = document.getElementById('inputTaskDesc');
    let inputExpire = document.getElementById('inputTaskExpire');
    if(inputTitle.value != "" && inputDesc.value != ""){
        let displayArray = [];
        var divDisplay = document.getElementById("divDisplay");
        console.log(divDisplay);
        divDisplay.innerHTML = "";
        let task = {title: "", desc: "", crossed: false, expire: "undefined"};
        task.title = inputTitle.value;
        task.desc = inputDesc.value;
        task.expire = inputExpire.value;
        //Input desc y expire
        proyectoActual.taskArray.push(task);
        UpdateProyecto(proyectoActual);
        displayArray = proyectoActual.taskArray;
        inputTitle.value = "";
        inputDesc.value = "";
        DisplayTasks(displayArray)
    }
}
function DisplayTasks(array){
    array.forEach(element => {
        let btnTick = document.createElement("button");
        btnTick.style.borderRadius = "100%";
        btnTick.style.padding = "1em";
        btnTick.onclick = function() {TaskTick(element);};
        let pTaskTitle = document.createElement("p");
        let pTaskDesc = document.createElement("p");
        pTaskTitle.innerHTML = `${element.title}:`;
        if(element.crossed){
            pTaskTitle.style.textDecoration = "line-through";
            pTaskDesc.innerHTML = `${element.desc}`; 
        }
        else{
            pTaskDesc.innerHTML = `${element.desc} <br> Válido hasta: ${element.expire}`;
        }
        
        var divPanel = document.createElement("div");
        var divDisplay = document.getElementById("divDisplay");
        console.log(divDisplay)
        
        divPanel.appendChild(pTaskTitle);
        divPanel.appendChild(pTaskDesc);
        divPanel.appendChild(btnTick);
        divDisplay.appendChild(divPanel);
    });
}

function TaskTick(tarea){
    tarea.crossed = !tarea.crossed;
    let proyecto = GetFromStorage("proyectoActual");
    let arrayProyectos = GetFromStorage("arrayProyectos");
    let indexProyecto = FindProyecto(proyecto, arrayProyectos);
    let indexTarea = FindTarea(proyecto, tarea);
    proyecto.taskArray[indexTarea] = tarea;
    arrayProyectos[indexProyecto] = proyecto;
    SyncStorage("proyectoActual",proyecto);
    SyncStorage("arrayProyectos", arrayProyectos);
}