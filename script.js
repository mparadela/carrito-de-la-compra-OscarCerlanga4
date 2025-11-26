const nombre = document.getElementById("inputNombre");
const precio = document.getElementById("inputPrecio");

let productos = [];
cargarCarrito();
renderizarCarrito();

function guardarCarrito(){
    localStorage.setItem("carro", JSON.stringify(productos));
}

function cargarCarrito(){
    if(localStorage.getItem("carro")){
        productos = JSON.parse(localStorage.getItem("carro"));
    }
}

function calcularTotal(){
    let total = document.getElementById("total");
    total.innerHTML="";
    if(productos.length === 0){
        return;
    }
    let totalPrecios = productos.reduce((sum, a)=>sum = sum + a.precio, 0);
    total.innerHTML = `Total: ${totalPrecios.toFixed(2)}€`;
}

function renderizarCarrito(){
    let lista = document.getElementById("listaProductos");
    lista.innerHTML="";

    if(productos.length === 0){
        let info = document.querySelector(".info");
        info.textContent = "Aun no hay datos en el carro";
        calcularTotal();
        return;
    }

    productos.forEach(p=>{
        let li = document.createElement("li");
        let eliminar = document.createElement("button");
        eliminar.textContent="eliminar";
        li.append(`ID: ${p.id} || Nombre: ${p.nombre} || Precio: ${p.precio} `);
        li.appendChild(eliminar);
        eliminar.addEventListener("click",e=>{  
            let seguro = confirm("¿Estas seguro de querer borrar el dato de la lista?");
            if (!seguro) return;
            productos = productos.filter(item=> item.id !== p.id);
            guardarCarrito();
            renderizarCarrito();
        });
        lista.append(li);
    })
    calcularTotal();
}

function agregarProducto(nombre, precio){
    let objeto = {
        'id': Date.now() + Math.random(),
        'nombre': nombre,
        'precio': precio
    }
    productos.push(objeto);
    guardarCarrito();
    renderizarCarrito();
}

document.getElementById("btnAgregar").addEventListener("click",e=>{
    if(nombre.value.length === 0 || precio.value.length === 0 || parseFloat(precio.value) < 0){
        alert("Datos no validos");
        return;
    }
    agregarProducto(nombre.value, parseFloat(precio.value));
    nombre.value="";
    precio.value="";
})