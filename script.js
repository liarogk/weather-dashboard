const API_KEY = 'c14a0dbc95a94c3b23f9cb1e96029f41'; // <--- Put your key inside the quotes here
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

async function fetchWeather(city) {
  const weatherDisplay = document.getElementById('weatherDisplay');
  const errorMsg = document.getElementById('errorMsg');
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) throw new Error('City not found');

    const data = await response.json();
    
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temp').textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
    document.getElementById('description').textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;

    weatherDisplay.classList.remove('hidden');
    errorMsg.classList.add('hidden');
  } catch (err) {
    errorMsg.textContent = err.message;
    errorMsg.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
  }
}
/*// Temporary function to test your layout while waiting for the key
async function fetchWeather(city) {
  const weatherDisplay = document.getElementById('weatherDisplay');
  const errorMsg = document.getElementById('errorMsg');

  // Fake data for testing
  document.getElementById('cityName').textContent = `${city}, Test Mode`;
  document.getElementById('temp').textContent = `Temperature: 22°C`;
  document.getElementById('description').textContent = `Condition: clear sky`;
  document.getElementById('humidity').textContent = `Humidity: 45%`;

  weatherDisplay.classList.remove('hidden');
  errorMsg.classList.add('hidden');
}*/