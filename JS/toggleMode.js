let btnToggle = document.getElementById("btnToggle")
if(localStorage.getItem("modoOscuro")){
    if(JSON.parse(localStorage.getItem("modoOscuro")) == true){
        document.body.classList.add("darkMode")
        btnToggle.innerText = `Claro`
        btnToggle.className = ("btn btn-light")
    }
}else{
    localStorage.setItem("modoOscuro", false)
}
btnToggle.addEventListener("click", ()=>{
    document.body.classList.toggle("darkMode")
    if(JSON.parse(localStorage.getItem("modoOscuro")) == false){
        btnToggle.innerText = `Claro`
        btnToggle.className = ("btn btn-light")
        localStorage.setItem("modoOscuro", true)
        console.log(localStorage.getItem("modoOscuro"))
    }else if
    (JSON.parse(localStorage.getItem("modoOscuro")) == true){
        btnToggle.innerText = `Oscuro`
        btnToggle.className = ("btn btn-dark ")
        localStorage.setItem("modoOscuro", false)
        console.log(localStorage.getItem("modoOscuro"))
    }
})