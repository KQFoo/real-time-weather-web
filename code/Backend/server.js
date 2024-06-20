'use strict';

const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("frontend"));

// Default values
app.get("/", (req, res) => {
    res.render("webpage", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const api_key = "ba8a4fc15777561d5d2a278ea745131d";

    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    let weather;
    let error = null;

    try {
        // axios is clarified to use GET method
        const response = await axios.get(api_url);
        weather = response.data;
    }
    catch (error) {
        weather = null;
        console.error("Error: " + error);
    }

    res.render("webpage", { weather, error });
});

// http://localhost:3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});



