let contenedorIntro = document.getElementById("intro")
let contenedorTarjetas = document.getElementById("departamentos")
let url = "https://api-colombia.com"
let urlColombia = url + "/api/v1/Country/Colombia"
let urlMunicipios = url + "/api/v1/Department"

fetch(urlColombia).then(res => res.json()).then(data => {
    crearIntro(data)
})

fetch(urlMunicipios).then(res => res.json()).then(data => {
    crearTarjetas(data)
    console.log(data)
})

function crearIntro(informacion) {
    let intro = document.createElement("div")
    intro.className = "card mb-3"

    intro.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4 p-3">
                <img src="${informacion.flags[0]}" class="img-fluid rounded-start" alt="Bandera de ${informacion.name}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h2 class="card-title">${informacion.name}</h2>
                    <p class="card-text">${informacion.description}</p>
                    <p class="card-text">Capital: ${informacion.stateCapital}</p>
                    <p class="card-text">Población: ${informacion.population}</p>
                    <p class="card-text">Idiomas: ${informacion.languages.join(", ")}</p>
                    <p class="card-text">Moneda: ${informacion.currency}</p>
            </div>
        </div>
    `
    contenedorIntro.appendChild(intro)
}

function crearTarjetas(informacion) {
    informacion.forEach(departamento => {
    let tarjeta = document.createElement("div")
    tarjeta.className = "col"
    tarjeta.innerHTML = `
    <div class="card h-100">
        <div class="card-body">
            <h5 class="card-title">${departamento.name}</h5>
            <p class="card-text">Municipios: ${departamento.municipalities}</p>
            <p class="card-text">Población: ${departamento.population}</p>
            <p class="card-text">Superficie: ${departamento.surface} km²</p>
            <a href="details.html?id=${departamento.id}" class="btn btn-primary">Detalles</a>
        </div>
    </div>
`
contenedorTarjetas.appendChild(tarjeta)
    }) 
    
}

