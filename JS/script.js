// Variáveis e seleção de elementos
const apiKey = "Insira sua chave API";

const cityinput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');

const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const humidityElement = document.querySelector('#humidity span');
const windElement = document.querySelector('#wind span');

const weathercontainer = document.querySelector('#weather-data'); // Corrigido

// Funções
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    try {
        const res = await fetch(apiWeatherURL);
        if (!res.ok) throw new Error('Cidade não encontrada');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        alert('Erro ao buscar os dados do tempo. Verifique o nome da cidade.');
        return null; // Retorna null em caso de erro
    }
};

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);
    if (!data) return; // Evita erro se os dados forem nulos

    cityElement.innerText = data.name;
    tempElement.innerHTML = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    humidityElement.innerHTML = `${data.main.humidity} %`;
    windElement.innerHTML = `${data.wind.speed} km/h`;

    weathercontainer.classList.remove('hide'); // Corrigido para string
};

// Eventos
searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const city = cityinput.value.trim(); // Remove espaços em branco

    if (city) {
        console.log(city);
        await showWeatherData(city);
    } else {
        alert('Por favor, insira um nome de cidade.');
    }
});

// Evento para o botão Enter
cityinput.addEventListener("keyup", async (e) => {
    if (e.code === "Enter") {
        const city = e.target.value.trim(); // Remove espaços em branco
        if (city) {
            console.log(city);
            await showWeatherData(city);
        } else {
            alert('Por favor, insira um nome de cidade.');
        }
    }
});

