const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

const { API_WEATHER_URL, PORT } = require("./config");

const port = process.env.PORT || PORT;
app.use(cors());

app.get("/api/location/search/:query", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  const { query } = req.params;

  if (!query) {
    res.json([]);
  }

  const requestUrl = `${API_WEATHER_URL}/location/search/?query=${query}`;

  axios
    .get(requestUrl)
    .then(function (response) {
      console.log('Function response.data, ==> params({ : response.data }) Line 25', {asas : response.data, requestUrl });
      res.json(response.data);
    })
    .catch(function (error) {
      res.json(error);
    });
});

app.get("/api/location/get/:id/:limit", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);

  const { id, limit = 10 } = req.params;

  if (!id) {
    res.json({
      consolidated_weather: [],
    });
  }

  const requestUrl = `${API_WEATHER_URL}/location/${id}`;

  axios
    .get(requestUrl)
    .then(function (response) {
      response.data.consolidated_weather.length = limit;
      res.json(response.data);
    })
    .catch(function (error) {
      res.json(error);
    });
});

app.listen(port, function () {
  console.log(`Backend middleware weather app listening at port ${port}`);
});
