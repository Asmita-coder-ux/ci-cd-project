const apiKey = '2f5da59c46a7eea14a8062d183c9660a';

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod === '404') {
            alert('City not found!');
            return;
        }

        document.getElementById('cityName').innerText = data.name;
        document.getElementById('temperature').innerText = `${data.main.temp}°C`;
        document.getElementById('description').innerText = data.weather[0].description;
        document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
        document.getElementById('wind').innerText = `Wind Speed: ${data.wind.speed} m/s`;

        const icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        console.log('Weather Icon URL:', iconUrl); 
        document.getElementById('weatherIcon').src = iconUrl;

        changeBackground(data.weather[0].main);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch weather data. Please try again later.');
    }
}

function changeBackground(condition) {
    if (condition.includes('Clear')) {
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?sunny')";
    } else if (condition.includes('Clouds')) {
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?cloudy')";
    } else if (condition.includes('Rain')) {
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?rain')";
    } else if (condition.includes('Snow')) {
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?snow')";
    } else {
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?weather')";
    }
}
