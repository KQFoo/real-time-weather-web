'use strict';

const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.static(__dirname + "/frontend/webpage.html"));

// Default values
app.get("/", (req, res) => {
    //res.sendFile(__dirname + "/frontend/webpage.html");
    //res.render("webpage", { weather: null, error: null });
});

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
    catch {
        weather = null;
        error = "Error, please try again";
    }

    res.render("webpage", { weather, error });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});



