// fetch = Function used for making HTTP requests to fetch resources.
//              (JSON style data, images, files)
//              Simplifies asynchronous data fetching in JavaScript and
//              used for interacting with APIs to retrieve and send
//              data asynchronously over the web.
//              fetch(url, {options})

'use strict';

const api_key = "ba8a4fc15777561d5d2a278ea745131d";

/**
 * Fetch data from server
 * @param {string} URL API url 
 * @param {function} callback callback
 */
export const fetchData = function (URL, callback) {
    fetch(`${URL}&appid=${api_key}`)
        .then(response => response.json())
        .then(data => callback(data));
}

export const url = {
    currentWeather(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`;
    },

    forecast(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}`;
    },

    /**
    * @param {string} location Search location e.g.: "Miri" "London" "New York" 
    */
    geo(location) {
        return `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5`;
    }
}