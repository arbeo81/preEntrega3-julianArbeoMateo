class inmueble{
    constructor(id, precio, tipo, operacion, imagen){
        this.id = id,
        this.precio = precio,
        this.tipo = tipo,
        this.operacion = operacion,
        this.imagen = imagen
    }
mostrarInmuebles(){
    console.log(`El ${this.tipo} de/para ${this.operacion} tiene un precio de ${this.precio}`)
}
}
const inmueble1 = new inmueble(1, 100000, "departamento", "alquiler", "depto_1.jpg")
const inmueble2 = new inmueble(2, 150000, "departamento", "alquiler", "depto_2.jpg")
const inmueble3 = new inmueble(3, 200000, "departamento", "alquiler", "depto_3.jpg")
const inmueble4 = new inmueble(4, 200000, "casa", "alquiler", "casa_1.jpg")
const inmueble5 = new inmueble(5, 250000, "casa", "alquiler", "casa_2.jpg")
const inmueble6 = new inmueble(6, 300000, "casa", "alquiler", "casa_3.jpg")
const inmueble7 = new inmueble(7, 1000000, "departamento", "venta", "depto_4.jpg")
const inmueble8 = new inmueble(8, 1500000, "departamento", "venta", "depto_5.jpg")
const inmueble9 = new inmueble(9, 2000000, "departamento", "venta", "depto_6.jpg")
const inmueble10 = new inmueble(10, 2000000, "casa", "venta", "casa_4.jpg")
const inmueble11 = new inmueble(11, 2500000, "casa", "venta", "casa_5.jpg")
const inmueble12 = new inmueble(12, 3000000, "casa", "venta", "casa_6.jpg")
let inmobiliaria = []
if(localStorage.getItem("inmobiliaria")){
    inmobiliaria = JSON.parse(localStorage.getItem("inmobiliaria"))
}else{
    inmobiliaria.push(inmueble1, inmueble2, inmueble3, inmueble4, inmueble5, inmueble6, inmueble7, inmueble8, inmueble9, inmueble10, inmueble11, inmueble12)
    localStorage.setItem("inmobiliaria", JSON.stringify(inmobiliaria))
}
