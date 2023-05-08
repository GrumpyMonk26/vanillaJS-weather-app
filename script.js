require('dotenv').config();

const apiKey = process.env.API_KEY;

const weatherDataEl = document.getElementById('weather-data');
const cityInputEl = document.getElementById('city-input');
const formEl = document.querySelector('form');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const locationValue = cityInputEl.value;
  getWeatherData(locationValue);
});

async function getWeatherData(locationValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${locationValue}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new error('Network Response Was Not Ok');
    }
    const data = await response.json();
    console.log(data);
    const temprature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}℃`,
      `Humidity: ${data.main.humidity}%`,
      `Wind Speed: ${data.wind.speed}`,
    ];
    weatherDataEl.querySelector('.icon').innerHTML = `<img
            src="http://openweathermap.org/img/wn/${icon}.png"
            alt="Weather Icon"
          />`;
    weatherDataEl.querySelector('.temperature').textContent = `${temprature} ℃`;
    weatherDataEl.querySelector('.description').textContent = description;
    weatherDataEl.querySelector('.details').innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join('');
  } catch (error) {
    weatherDataEl.querySelector('.icon').innerHTML = '';
    weatherDataEl.querySelector('.temperature').textContent = '';
    weatherDataEl.querySelector('.description').textContent =
      'There has been an error, check location!';
    weatherDataEl.querySelector('.details').innerHTML = '';
  }
}
