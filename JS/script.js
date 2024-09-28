// variaveis e seleção de elementos

const apiKey = "c8550a293af4668a479a0105a82676d0";
const apiCountryURL = 'https://flagcdn.com/w20/ua.png';

const cityinput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const humidityElement = document.querySelector('#humidity span');
const windElement = document.querySelector('#wind span');

//funções
const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  return data;
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  cityElement.innerText = data.name;
  tempElement.innerHTML = parseInt(data.main.temp)
  descElement.innerText = data.weather[0].description;
  weatherIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  humidityElement.innerHTML = `${data.main.humidity} %`;
  windElement.innerHTML = `${data.wind.speed} km/h`;
};

//eventos
searchBtn.addEventListener('click', async (e) => {
  e.preventDefault();

  const city = cityinput.value;

  console.log(city);
  await showWeatherData(city);
});
