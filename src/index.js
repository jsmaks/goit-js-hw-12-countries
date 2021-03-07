import './styles.css';

import '../node_modules/@pnotify/core/dist/PNotify.css';
import '../node_modules/@pnotify/core/dist/Material.css';
import '../node_modules/@pnotify/core/dist/BrightTheme.css';


import countryCard from './tempates/country-templates.hbs';
import countyList from './tempates/countries-list.hbs'
import debounce from "../webpack/utils/debounce";
import CountriesApiService from './js/api/country-service';

import { error, alert } from '../node_modules/@pnotify/core/dist/PNotify.js';

const countriesRef = document.querySelector('.countries');
const searchRef = document.querySelector('.search-country');
const countriesApiService = new CountriesApiService();

const countriesAdapter = ({ name, population, capital, languages, flag }) => ({
    imgSrc: flag,
    countryName: name,
    capital: capital,
    population: population,
    lang: languages
})

function renderCountriesList(countries) {

    const countryRefs = countries.map(elem => countyList(countriesAdapter(elem))).join('');
    countriesRef.innerHTML = countryRefs;

}
function renderfilterCountry(filteredCountry) {

    if (filteredCountry.message === 'Not Found') {
        clearCountriesContainer();
        return pNotifyError('Такой страны нет в нашей базе, попробуйте изменить запрос!')
    }
    if (filteredCountry.length !== 1 && filteredCountry.length < 10) {
        return renderCountriesList(filteredCountry);
    }
    if (filteredCountry.length === 1) {
        const countriesData = filteredCountry.map(country => countryCard(countriesAdapter(country))).join('')
        return countriesRef.innerHTML = countriesData;
    }
    pNotifyError("Too many matches found. Please eneter more specific query!");

}


function pNotifyError(text) {
    error({
        text: text
    })
}


const onSearch = event => {
    event.preventDefault();
    countriesApiService.query = event.target.value;

    if (countriesApiService.query === '') {
        clearCountriesContainer();
        return alert('Вы ничего не ввели')
    }
    countriesApiService.fectchCountry().then(countries => {
        clearCountriesContainer();
        renderfilterCountry(countries);
    })
}


function clearCountriesContainer() {
    countriesRef.innerHTML = '';

}
searchRef.addEventListener('input', debounce(onSearch, 500));


// countryApi.fectchCountry().then(result => {
//     // const countriesData = result.map(item => countryCard(countriesAdapter(item)))
//     // console.log(countriesData);
//     ///////////АНАЛОГИЧНАЯ ЗАПИСЬ/////////////////////////////

//     const countriesDataList = result.map(item => countriesAdapter(item))
//     const countriesList = countriesDataList.map(item => countryCard(item)).join('');

//     countriesRef.innerHTML = countriesList;

// });