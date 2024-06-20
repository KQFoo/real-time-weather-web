'use strict';

const express = require("express");
const axios = require("axios"); // Performs automatic transforms of JSON data
const app = express();

app.set("view engine", "ejs"); // Set the view engine to EJS
app.set("views", "./code/frontend"); // Set the views to webpage.ejs
app.use(express.static("./code/frontend")); // Set the folder as static files

// Render the webpage template with default values
app.get("/", (req, res) => {
    res.render("webpage", { weather: null, error: null, iconUrl: null, getTime: null, getDate: null, icons: [], temps: [], dates: [], times: [] });
});

// Handle the /weather route
app.get("/weather", async (req, res) => {

    const city = req.query.city; // Get the city from query parameters in webpage.ejs

    if (!city) {
        console.error("City is required");
    }

    const api_key = "ba8a4fc15777561d5d2a278ea745131d";

    const geo_api_url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`; // To get "latitude" && "longitude"

    let weather;
    let error = null;
    let iconUrl = null;
    let getDate = null;
    let getTime = null;
    let icons = [];
    let temps = [];
    let dates = [];
    let times = [];

    try {
        //const latitude = 51.5073219;
        //const longitude = -0.1276474;

        const geoResponse = await axios.get(geo_api_url);
        const geo = geoResponse.data;

        // Traverse the array
        for (const location of geo) {
            // To fetch weather data from the API
            const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${api_key}`;
            const response = await axios.get(api_url);
            weather = response.data;

            const iconId = weather.weather[0].icon;
            iconUrl = `http://openweathermap.org/img/wn/${iconId}@2x.png`;

            const date = new Date((weather.dt + weather.timezone) * 1000);
            const hours = date.getUTCHours();
            const minutes = date.getUTCMinutes();
            const period = hours >= 12 ? "PM" : "AM";
            const month = months[date.getUTCMonth()];

            getDate = `${month} ${date.getUTCDate()}`;
            getTime = `${hours % 12 || 12}:${minutes} ${period}`;

            // API Call for 3-Hour 5-Day Forecast
            const forecast_api_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${api_key}`;
            const forecastResponse = await axios.get(forecast_api_url);
            const forecast = forecastResponse.data;
            const t = forecast.city.timezone;

            // Traverse the list
            for (const i of forecast.list) {
                // Push the relevant values to the relevant array
                // For retrieval in webpage.ejs

                let forecast_iconId = i.weather[0].icon;
                let forecast_iconUrl = `http://openweathermap.org/img/wn/${forecast_iconId}@2x.png`;
                icons.push(forecast_iconUrl);

                let temp = (i.main.temp - 273.15).toFixed(0); // To degree celsius
                temps.push(temp);

                let f_date = new Date((i.dt + t) * 1000);
                let f_month = months[f_date.getUTCMonth()];

                let f_hours = f_date.getUTCHours();
                let f_period = f_hours >= 12 ? "PM" : "AM";

                dates.push(`${f_month} ${f_date.getUTCDate()}`);
                times.push(`${f_hours % 12 || 12}${f_period}`);
            }
        }
    }
    catch (error) {
        weather = null;
        iconUrl = null;
        getTime = null;
        getDate = null;
        icons = [];
        temps = [];
        dates = [];
        times = [];
        console.error("Error: " + error);
    }

    // Render the webpage with the relevant data
    res.render("webpage", { weather, error, iconUrl, getTime, getDate, icons, temps, dates, times });
});

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

// Start the server and listen on port 3000 or the value of the PORT environment variable
// http://localhost:3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});



