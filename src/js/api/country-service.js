const BASE_URL = 'https://restcountries.eu/rest/v2/'
export default class CountriesApiService {
    constructor() {
        this.searchQuery = '';
    }
    fectchCountry() {

        const url = `${BASE_URL}name/${this.searchQuery}`;

        return fetch(url)
            .then(result => result.json())
            .then(data => {
                return data;
            });
    }
    get query() {
        return this.searchQuery
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}