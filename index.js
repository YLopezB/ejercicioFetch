import * as main from "./main.js"
let url = "https://api-colombia.com"
let urlColombia = url + "/api/v1/Country/Colombia"
let urlDepartamentos = url + "/api/v1/Department"
let urlCiudades = url + "/api/v1/City/"

main.introduccion(urlColombia)
main.tarjetas(urlDepartamentos, urlCiudades)

