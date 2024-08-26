import * as main from "./main.js"
let idDepartamento = new URLSearchParams(window.location.search).get("id")
let url = "https://api-colombia.com"
let urlDep = url + "/api/v1/Department/"+idDepartamento+""
let urlCities = url + "/api/v1/Department/" + idDepartamento + "/cities"
let urlNaturalAreas = url + "/api/v1/Department/" + idDepartamento + "/naturalareas"

main.introduccion(urlDep)
main.tarjetas(urlCities, urlNaturalAreas)
