const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const axios = require("axios");
const cors = require("cors")({ origin: true });
require("dotenv").config();

function formatHour (unformattedTime) {

  let formattedTime = "";

  // do stuff

  return formattedTime;
}

function isCurrentHour(currentHour, hour) {

  return hour.formatted_time === currentHour;
}

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.getDayWeather = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const response = {
      status: 200,
      data: {},
      msg: "Successfully gathered weather data!",
    };

    const { WEATHER_API_KEY } = process.env;

    try {
      const { data } = await axios(
        `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=Miami&days=1&aqi=no&alerts=no`
      );

      const hours = data.forecast.forecastday[0].hour;

      for (let i = 0; i < hours.length; i++) {

        const hour = hours[i];

        hour.formatted_time = hour.time.slice();
        // hour.formatted_time = formatHour(hour.time);
        // const currentFormattedTime = formatHour(data.current.last_updated);
        // hour.now = isCurrentHour(currentFormattedTime, hour)
      }

      response.data = data;
    } catch (e) {
      response.status = 500;
      response.msg = e.message;
    }

    res.status(response.status).send(response);
  });
});
