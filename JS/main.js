let inmueblesDiv = document.getElementById("inmuebles")
let guardaInmuebleBtn = document.getElementById("guardarInmueblesBtn")
let guardarRentabilidadBtn = document.getElementById("guardarRentabilidadBtn")
let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")
let modalBodyFavorito = document.getElementById("modal-bodyFavorito")
let botonFavorito = document.getElementById("botonFavorito")
let modalCargarInmueble = document.getElementById("modalCargarInmueble")
let modalRetabilidadInmueble = document.getElementById("modalRentabilidadInmueble")

const DateTime = luxon.DateTime
const fechaHoy = DateTime.now()
let fecha = document.getElementById("fecha")
let fechaMostrar = fechaHoy.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
fecha.innerHTML = `${fechaMostrar}`

function mostrarInmuebles(array){
    inmueblesDiv.innerHTML = ""
    for(let inmueble of array){
        let nuevoInmuebleDiv = document.createElement("div")
        nuevoInmuebleDiv.classList.add("col-12", "col-md-6", "col-lg-4", )
        nuevoInmuebleDiv.innerHTML = `
        <div id="${inmueble.id}" class="card" style="width: 18rem;">
                <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${inmueble.imagen}" alt="${inmueble.tipo} de ${inmueble.precio}">
                <div class="card-body">
                    <h4 class="card-title">${inmueble.tipo}</h4>
                    <p>Operacion: ${inmueble.operacion}</p>
                    <p>Precio: ${inmueble.precio}</p>
                <button id="agregarBtn${inmueble.id}" class="btn btn-dark">Guardar inmueble</button>
                </div>
        </div>
        `
        inmueblesDiv.appendChild(nuevoInmuebleDiv)
        let agregarBtn = document.getElementById(`agregarBtn${inmueble.id}`)
        agregarBtn.addEventListener("click", ()=>{
            agregarAlFavorito(inmueble)
        })
    }
}
let productosEnFavorito
if(localStorage.getItem("favorito")){
    productosEnFavorito = JSON.parse(localStorage.getItem("favorito"))
    console.log(productosEnFavorito)
}else{
    productosEnFavorito = []
    localStorage.setItem("favorito", productosEnFavorito)
}
function cargarProductosFavorito(array){
    modalBodyFavorito.innerHTML = ""
    array.forEach((productoEnFavorito)=>{
        modalBodyFavorito.innerHTML +=
        `
        <div class="card border-primary mb-3" id ="productoFavorito${productoEnFavorito.id}" style="max-width: 540px;">
                 <img class="card-img-top" height="300px" src="assets/${productoEnFavorito.imagen}" alt="">
                 <div class="card-body">
                        <h4 class="card-title">${productoEnFavorito.tipo}</h4>
                        <p class="card-text">${productoEnFavorito.operacion}</p> 
                         <p class="card-text">$${productoEnFavorito.precio}</p> 
                         <button class= "btn btn-danger" id="botonEliminar${productoEnFavorito.id}"><i class="fas fa-trash-alt"></i></button>
                 </div>    
            </div>
        `
    })
    array.forEach((productoEnFavorito) =>
    document.getElementById(`botonEliminar${productoEnFavorito.id}`).addEventListener("click",()=>{
        console.log(`El producto eliminado es ${productoEnFavorito.titulo}`)
        let cardProducto = document.getElementById(`productoFavorito${productoEnFavorito.id}`)
        cardProducto.remove()
        let productoEliminar = array.find((inmueble)=> inmueble.id ==productoEnFavorito.id)
        console.log(productoEliminar)
        let posicion = array.indexOf(productoEliminar)
        console.log(posicion)
        array.splice(posicion,1)
        console.log(array)
        localStorage.setItem("favorito", JSON.stringify(array))
    })
    )
}
function agregarAlFavorito(inmueble){
    let inmuebleAgregado = productosEnFavorito.find((elem)=>elem.id == inmueble.id)
    if(inmuebleAgregado == undefined){
        productosEnFavorito.push(inmueble)
        localStorage.setItem("favorito", JSON.stringify(productosEnFavorito))
        Swal.fire({
            title: 'Se agrego un inmueble',
            text: `El/la ${inmueble.tipo} en ${inmueble.operacion} con el valor de ${inmueble.precio} ha sido agregado a los favoritos`,
            icon: "succes",
            confirmButtonColor: "blue",
            confirmButtonText: "Muchas gracias, esperamos pueda concretar la operación",
            timer: 3000,
            imageUrl: `assets/${inmueble.imagen}`,
            imageHeight: 200
        })
    }else{
        Swal.fire({
            title: 'El inmueble ya esta agregado',
            text: `El/la ${inmueble.tipo} en ${inmueble.operacion} con el valor de ${inmueble.precio} ya existe en favoritos`,
            icon: "error",
            showConfirmButton: false,
            timer: 3000,  
        })
    }
}
function cargarInmueble(array){
        let inputTipo = document.getElementById("tipoInput")
        let inputOperacion = document.getElementById("operacionInput")
        let inputPrecio = document.getElementById("precioInput")
        const inmuebleNuevo = new Inmueble(array.length+1,parseInt(inputPrecio.value), inputTipo.value, inputOperacion.value, "inmuebleNuevo.jpg")
        console.log(inmuebleNuevo)
        array.push(inmuebleNuevo)
        console.log(array)
        localStorage.setItem("inmobiliaria", JSON.stringify(array))
        mostrarInmuebles(array)
        modalCargarInmueble.reset()
        Toastify({
            text: `El inmuble ${inmuebleNuevo.tipo} ha sido incorporado a la web`,
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
              color: "black"
            },
          }).showToast(); 
    }
    function calculadora(primerNumero, segundoNumero, operacion){
        switch (operacion){
            case "*":
                return primerNumero * segundoNumero;
            case "/":
                return primerNumero / segundoNumero;
            default:
                return 0;
        }
    }

    function finalizarCompra(array){
        Swal.fire({
            title: 'Está seguro de realizar la compra',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Sí, seguro',
            cancelButtonText: 'No, no quiero',
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
        }).then((result)=>{
            if(result.isConfirmed){
                //alert es a nivel DOM
                let finalizarTotal = calcularTotal(array)
                console.log(finalizarTotal)
                Swal.fire({
                    title: 'Compra realizada',
                    icon: 'success',
                    confirmButtonColor: 'green',
                    text: `Muchas gracias por su compra ha adquirido nuestros productos el día ${fechaHoy.toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)} a las ${fechaHoy.toLocaleString(DateTime.TIME_SIMPLE)}. El total de su compra es ${finalizarTotal}`,
                    })
                    //nivel arrays
                    productosEnCarrito = []
                    localStorage.removeItem("carrito")
                    
            }else{
                Swal.fire({
                    title: 'Compra no realizada',
                    icon: 'info',
                    text: `La compra no ha sido realizada! Atención sus productos siguen en el carrito :D`,
                    confirmButtonColor: 'green',
                    timer:3500
                })
            }
        })
    }





    function rentabilidad(){
        let tipoDePropiedad = document.getElementById("tipoPropiedad")
        let ingresoMensual = document.getElementById ("ingresoMensual")
        let precioPropiedad = document.getElementById ("precioPropiedad")
        let ingresoAnual = calculadora (ingresoMensual.value,12,"*")
        let rentabilidad = calculadora (ingresoAnual,precioPropiedad.value,"/")
        if(rentabilidad < 0.02){
            Swal.fire({
                title: `Su ${tipoDePropiedad.value} tiene una rentabilidad de ${rentabilidad.toFixed(1)}`,
                text: `Es una rentabilidad más baja de lo esperada para su propiedad`,
                icon: "warning",
                confirmButtonColor: "blue",
                confirmButtonText: "Cerrar",
            })
        }else if(rentabilidad >0.02 && rentabilidad <0.04){
            Swal.fire({
                title: `Su ${tipoDePropiedad.value} tiene una rentabilidad de ${rentabilidad.toFixed(1)}`,
                text: `Es una renatabilidad un poco más baja de la esperada`,
                icon: "success",
                confirmButtonColor: "blue",
                confirmButtonText: "Cerrar",
            }) 
        }else if(rentabilidad >0.04 && rentabilidad <0.06){
            Swal.fire({
                title: `Su ${tipoDePropiedad.value} tiene una rentabilidad de ${rentabilidad.toFixed(1)}`,
                text: `Es una rentabilidad media para su inmueble`,
                icon: "success",
                confirmButtonColor: "blue",
                confirmButtonText: "Cerrar",
            })
        }else if(rentabilidad >0.06){
            Swal.fire({
                title: `Su ${tipoDePropiedad.value} tiene una rentabilidad de ${rentabilidad.toFixed(1)}`,
                text: `Es una rentabilidad más alta de la media para su inmueble`,
                icon: "success",
                confirmButtonColor: "blue",
                confirmButtonText: "Cerrar",
            })
        }else{
            Swal.fire({
                text: `Hay un error en alguno de los datos ingresados`,
                icon: "warning",
                confirmButtonColor: "blue",
                confirmButtonText: "Cerrar",
            })
        }
    }
function ordenarMenorMayor(array){
    //copiamos array original // concat
    const menorMayor = [].concat(array)
    //ordena de menor a mayor
    menorMayor.sort((a,b) => a.precio - b.precio)
    mostrarInmuebles(menorMayor)
}
function ordenarMayorMenor(arr){
    //ordenar de mayor a menor
    const mayorMenor = [].concat(arr)
    mayorMenor.sort((param1, param2)=>{
        return param2.precio - param1.precio
    })
    mostrarInmuebles(mayorMenor)
}
function buscarInfo(buscado, array){
    let busquedaArray = array.filter(
        (inmueble)=> inmueble.tipo.toLowerCase().includes(buscado) || inmueble.operacion.toLowerCase().includes(buscado)
    )
    busquedaArray.length == 0 ?
    (coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda en nuestra base de datos</h3>`, mostrarInmuebles(busquedaArray)) 
    :
    (coincidencia.innerHTML = "", mostrarInmuebles(busquedaArray))
}


guardaInmuebleBtn.addEventListener("click", ()=>{
        cargarInmueble(inmobiliaria)}
    )
guardarRentabilidadBtn.addEventListener("click", ()=>{
    rentabilidad(rentabilidad)}
    )   
buscador.addEventListener("input", ()=>{
    buscarInfo(buscador.value.toLowerCase(), inmobiliaria)
})
selectOrden.addEventListener("change", ()=>{
    console.log(selectOrden.value)
    if(selectOrden.value == 1){
        ordenarMayorMenor(inmobiliaria)
    }else if(selectOrden.value == 2){
        ordenarMenorMayor(inmobiliaria)
    }else if(selectOrden.value == 3){
        ordenarAlfabeticamenteTitulo(inmobiliaria)
    }else{
        mostrarCatalogo(inmobiliaria)
    }
})
botonFavorito.addEventListener("click", () =>{
    cargarProductosFavorito(productosEnFavorito)
})
mostrarInmuebles(inmobiliaria)

