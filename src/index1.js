import './styles.css';
import debounce from "../webpack/utils/debounce";
import countryTemplate from './tempates/country-templates.hbs'
import CountriesApiService from './js/api/country-service'
const countriesApiService = new CountriesApiService();

const searchForm = document.querySelector('.js-search-form');
const searchRef = document.querySelector('.search-country');
const listRef = document.querySelector('.countries__list');
const ulRef = document.querySelector('.js-countries-container')


// function createCountryRef(country) {
//     const countryRef = document.createElement('h3');
//     countryRef.classList.add('country');
//     countryRef.textContent = country;
//     return countryRef;
// }

function renderfilterCountries(filterCountries) {
    if (filterCountries.length !== 1) {
        const countryRefs = filterCountries.map(elem => createCountryRef(elem.name));
        // clearCountriesContainer();
        listRef.append(...countryRefs);
    }


}

const onSearch = event => {
    event.preventDefault();
    countriesApiService.query = event.target.value;

    if (countriesApiService.query === '') {
        return alert('Вы ничего не ввели')
    }
    countriesApiService.fectchCountry().then(countries => {
        console.log(countries);
        clearCountriesContainer();
        renderfilterCountries(countries);
    })
}

function clearCountriesContainer() {
    countriesRef.innerHTML = '';

}
searchRef.addEventListener('input', debounce(onSearch, 500));
