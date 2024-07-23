document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    fetchWeather(city);
});

async function fetchWeather(city) {
    const apiKey = '44b404c010d3918a54e4ac2d9b84af3e';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (weatherData.cod === '404') {
            // Clear the weather and hourly forecast sections
            document.getElementById('weather-display').innerHTML = '';
            document.getElementById('hourly-forecast').innerHTML = '';
            document.getElementById('weather-display').innerHTML = `<p>City not found. Please try again.</p>`;
            return;
        }

        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        displayWeather(weatherData);
        displayHourlyForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weather-display');
    const weatherHtml = `
        <h2>${data.name}</h2>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
        <h3>${data.main.temp}°C</h3>
        <h4>${data.weather[0].description}</h4>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} km/h</p>
    `;
    weatherDisplay.innerHTML = weatherHtml;
}

function displayHourlyForecast(data) {
    const hourlyForecast = document.getElementById('hourly-forecast');
    let forecastHtml = '<h3>Hourly Forecast</h3>';

    for (let i = 0; i < 8; i++) {
        const hourData = data.list[i];
        const time = new Date(hourData.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        forecastHtml += `  
            <div class="hour">
                <p>${time}</p>
                <img src="http://openweathermap.org/img/wn/${hourData.weather[0].icon}.png" alt="${hourData.weather[0].description}">
                <p>${hourData.main.temp}°C</p>
            </div>
        `;
    }

    hourlyForecast.innerHTML = forecastHtml;
}

 

 