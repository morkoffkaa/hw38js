const form = document.querySelector('form');
const cityInput = document.querySelector('#city');
const submitBtn = document.querySelector('#submitBtn');
const weatherData = document.querySelector('#weatherData');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city) {
    const API_KEY = '5d066958a60d315387d9492393935c19';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Unable to fetch weather data.');
        }
      })
      .then((data) => {
        const temp = data.main.temp;
        const pressure = data.main.pressure;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const speed = data.wind.speed;
        const deg = data.wind.deg;
        const icon = data.weather[0].icon;

        const html = `
              <h2>Weather for ${city}</h2>
              <p>Temperature: ${temp} &deg;C</p>
              <p>Pressure: ${pressure} hPa</p>
              <p>Description: ${description}</p>
              <p>Humidity: ${humidity}%</p>
              <p>Wind Speed: ${speed} m/s</p>
              <p>Wind Direction: ${deg} &deg;</p>
              <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
              `;

        weatherData.innerHTML = html;
      })
      .catch((error) => {
        console.error(error);
        weatherData.innerHTML = '<p>Unable to fetch weather data.</p>';
      });
  }
});
