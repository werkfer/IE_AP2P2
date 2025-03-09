const axios = require('axios');
require('dotenv').config();
class WeatherService {
static async getWeather(city) {
const response = await
axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&a
ppid=${process.env.WEATHER_API_KEY}`);
return response.data;
}
}
module.exports = WeatherService;