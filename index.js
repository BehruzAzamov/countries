const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
const themeChanger = document.querySelector('.theme-changer')

let allCountriesData

fetch('https://restcountries.com/v3.1/all')
.then((res) => res.json())
.then((data) => {
    renderCountries(data)
    allCountriesData = data
    console.log(data);
})


let renderCountries = (countries) => {
    countriesContainer.innerHTML = ''
    countries.forEach((country) => {
        countriesContainer.innerHTML += `
        <div class="card">
        <img src="${country.flags.svg}" alt="" width="267px" height="160px">
        <h3 class="h3">${country.name.common}</h3>
        <div class="info">
        <p>Population:<span>${country.population}</span></p>
        <p>Population:<span>${country.region}</span></p>
        <p>Region:<span>${country.capital}</span></p>
        </div>
        </div>
        `
    })
} 

searchInput.addEventListener('input',  (e) => {
    const searchedCountries = allCountriesData.filter((country) => {
        return country.name.common.toLowerCase().includes(searchInput.value.toLowerCase())
    })
    renderCountries(searchedCountries)
})

themeChanger.addEventListener('click', () => {
    document.body.classList.toggle('dark')
})

filterByRegion.addEventListener('change',() => {
    if (country.region.toLowerCase().includes(filterByRegion.value.toLowerCase())) {
        countriesContainer.innerHTML = ` `
    }
})

filterByRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries)
})