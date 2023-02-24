class Inmueble{
    constructor(id, precio, tipo, operacion, imagen){
        this.id = id,
        this.precio = precio,
        this.tipo = tipo,
        this.operacion = operacion,
        this.imagen = imagen
    }

}

let inmobiliaria = []
const cargarInmobiliaria = async () => {
    const response = await fetch("inmuebles.json")
    const data = await response.json()

    for(let inmueble of data){
        let inmuebleNuevo = new Inmueble(inmueble.id, inmueble.precio, inmueble.tipo, inmueble.operacion, inmueble.imagen)
        inmobiliaria.push(inmuebleNuevo)
    }
    localStorage.setItem("inmobiliaria", JSON.stringify(inmobiliaria))
}


if(localStorage.getItem("inmobiliaria")){
    for(let inmueble of JSON.parse(localStorage.getItem("inmobiliaria"))){
        let inmuebleNuevo = new Inmueble(inmueble.id, inmueble.precio, inmueble.tipo, inmueble.operacion, inmueble.imagen)
        inmobiliaria.push(inmuebleNuevo)
    }
}else{
    console.log("es la primera vez que entra")
    cargarInmobiliaria()
}
console.log(inmobiliaria)





