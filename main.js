let contenedorIntro = document.getElementById("intro")
let contenedorTarjetas = document.getElementById("tarjetas")
let tablaEspecies = document.getElementById("especies")
let busquedaTexto = document.getElementById("busquedaTexto")

export function introduccion(url){
    fetch(url).then(res => res.json()).then(datos => {
        if (url == "https://api-colombia.com/api/v1/Country/Colombia") {
        crearIntro(datos)
        }else {
        crearDep(datos)
        }
    })
}

export function tarjetas(url1, url2){
    if (url1 == "https://api-colombia.com/api/v1/Department") {
        fetch(url1).then(res => res.json()).then(dataDepartamento => {
            dataDepartamento.forEach(departamento => {
                let urlIdCuidad = url2 + departamento.cityCapitalId
                fetch(urlIdCuidad).then(res => res.json()).then(dataCiudad => {
                    let cuidad = dataCiudad.name
                    crearTarjetas(departamento, cuidad)
                })
            })
        })
    }else {
        fetch(url1).then(res => res.json()).then(dataCiudad => {
            dataCiudad.forEach(ciudad => {
                crearCuidad(ciudad)
            })
        })
        fetch(url2).then(res => res.json()).then(dataArea => {
            let areaNatural = dataArea[0].naturalAreas
            areaNatural.forEach(area => {
                crearArea(area)
            })
        })
    }
}

export function especiesInvasoras(url){
    fetch(url).then(res => res.json()).then(data => {
        thead()
        let riesgo = ""
        data.forEach(especie => {
            if (especie.riskLevel == 1) {
                riesgo = "table-info"
            }else if (especie.riskLevel == 2) {
                riesgo = "table-success"
            }
            crearEspecie(especie, riesgo)
        })
    })
}   

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

function crearTarjetas(departamento, cuidad) {
    let tarjeta = document.createElement("div")
    tarjeta.className = "col"
    tarjeta.innerHTML = `
    <div class="card h-100">
        <div class="card-body">
            <h4 class="card-title">${departamento.name}</h4>
            <p class="card-text">Capital: ${cuidad}</p>
            <p class="card-text">Municipios: ${departamento.municipalities}</p>
            <p class="card-text">Población: ${departamento.population}</p>
            <p class="card-text">Superficie: ${departamento.surface} km²</p>
            <a href="details.html?id=${departamento.id}" class="btn btn-primary">Detalles</a>
        </div>
    </div>
`
contenedorTarjetas.appendChild(tarjeta)
}

function crearDep(departamento){
    let intro = document.createElement("div")
    intro.className = "card mb-3"
    intro.innerHTML = `
            <div class="card-body">
                <h2 class="card-title">Departamento: ${departamento.name}</h2>
                <p class="card-text">${departamento.description}</p>
                <p class="card-text">Capital: ${departamento.cityCapital.name}</p>
                <p class="card-text">Municipios: ${departamento.municipalities}</p>
                <p class="card-text">Superficie: ${departamento.surface} km²</p>
                <p class="card-text">Población: ${departamento.population}</p>
    `
    contenedorIntro.appendChild(intro)
}

function crearCuidad(ciudad){
    let tarjeta = document.createElement("div")
    tarjeta.className = "col"
    tarjeta.innerHTML = `
        <div class="card h-100">
            <div class="card-body">
                <p class="card-text">Cuidad/Municipio</p>
                <h4 class="card-title">${ciudad.name}</h4>
            </div>  
        </div>      
    `
    contenedorTarjetas.appendChild(tarjeta)
}

function crearArea(areaNatural){
    let tarjeta = document.createElement("div")
    tarjeta.className = "col"
    tarjeta.innerHTML = `
        <div class="card h-100">
            <div class="card-body">
                <p class="card-text">Area Natural</p>
                <h4 class="card-title">${areaNatural.name}</h4>
            </div>
        </div>        
    `
    contenedorTarjetas.appendChild(tarjeta)
}

function thead(){
    let cabecera = document.createElement("thead")
    cabecera.innerHTML = `
        <tr class="table-dark text-center">
            <th scope="col" class="align-middle">Nombre</th>
            <th scope="col" class="align-middle">Nombre Cientifico</th>
            <th scope="col" class="align-middle">Impacto</th>
            <th scope="col" class="align-middle">Manejo</th>
            <th scope="col" class="align-middle">Nivel de riesgo</th>
            <th scope="col" class="align-middle">Imagen</th>
        </tr>
    `
    tablaEspecies.appendChild(cabecera)
}

function crearEspecie(especie, clase){
    let tablaInfo = document.createElement("tbody")
    tablaInfo.className = "table table-striped"
    tablaInfo.innerHTML = `
                    <tr class="${clase} border-secondary">
                        <td class="align-middle">${especie.name}</td>
                        <td class="align-middle">${especie.scientificName}</td>
                        <td class="align-middle">${especie.impact}</td>
                        <td class="align-middle">${especie.manage}</td>
                        <td class="align-middle text-center">${especie.riskLevel}</td>
                        <td class="align-middle"><img src="${especie.urlImage}" alt="${especie.name}" width="150"></td>
                    </tr>
    `
    tablaEspecies.appendChild(tablaInfo)
}


