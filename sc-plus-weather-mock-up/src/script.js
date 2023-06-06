//local
// time and date
function formatDate (timestamp) {
    let date = new Date(timestamp);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    let day = days[date.getDay()];
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    return `${day} ${hour}:${minute},`;
}

// info for weather
function showCurrentTemp (response) {
    console.log(response.data);
    let city = document.querySelector("#city");
    city.innerHTML = response.data.city;

    let description = document.querySelector("#description");
    description.innerHTML = response.data.condition.description;

    let currentTemp = document.querySelector("#current-temperature");
    currentTemp.innerHTML = Math.round(response.data.temperature.current);

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.temperature.humidity}%`;

    let wind = document.querySelector("#wind");
    wind.innerHTML = `${response.data.wind.speed}km/h`;

    let date = document.querySelector("#date");
    date.innerHTML = formatDate(response.data.time * 1000);

    let icon = document.querySelector("#current-icon");
    icon.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);

    celsiusTemp = response.data.temperature.current;
}

function showForecast(response) {
    console.log(response.data);

    let icon1= document.querySelector("#current-icon-1");
    icon1.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[1].condition.icon}.png`);

    let fiveDay1 = document.querySelector("#five-day-1");
    fiveDay1.innerHTML = `${Math.round(response.data.daily[1].temperature.maximum)}° / ${Math.round(response.data.daily[1].temperature.minimum)}°`;

    let icon2 = document.querySelector("#current-icon-2");
    icon2.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[2].condition.icon}.png`);

    let fiveDay2 = document.querySelector("#five-day-2");
    fiveDay2.innerHTML = `${Math.round(response.data.daily[2].temperature.maximum)}° / ${Math.round(response.data.daily[2].temperature.minimum)}°`;

    let icon3 = document.querySelector("#current-icon-3");
    icon3.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[3].condition.icon}.png`);

    let fiveDay3 = document.querySelector("#five-day-3");
    fiveDay3.innerHTML = `${Math.round(response.data.daily[3].temperature.maximum)}° / ${Math.round(response.data.daily[3].temperature.minimum)}°`; 

    let icon4 = document.querySelector("#current-icon-4");
    icon4.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[4].condition.iconn}.png`);

    let fiveDay4 = document.querySelector("#five-day-4");
    fiveDay4.innerHTML = `${Math.round(response.data.daily[4].temperature.maximum)}° / ${Math.round(response.data.daily[4].temperature.minimum)}°`;

    let icon5 = document.querySelector("#current-icon-5");
    icon5.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[5].condition.icon}.png`);

    let fiveDay5 = document.querySelector("#five-day-5");
    fiveDay5.innerHTML = `${Math.round(response.data.daily[5].temperature.maximum)}° / ${Math.round(response.data.daily[5].temperature.minimum)}°`;
}

//search engine
function searchCity(city) {
    let apiKey = `9a96e3865c186c9fbo4aaef0cdb0e0dt`;

    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showCurrentTemp);
    
    let apiUrl2 = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl2).then(showForecast);
}

function manageSubmit(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input").value;
    searchCity(cityInput);
}

//celsius to fahrenheit
function showFahrenheit(event) {
    event.preventDefault();
        //possible sol for unit conversion
        //remove the "active" class from the celsius
        //celsius.classList.remove("active");
        //add the "active" class to fahrenheit
        //fahrenheit.classList.add("active");
    let temperature = document.querySelector("#current-temperature");
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    temperature.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsius(event) {
    event.preventDefault();
    let temperature = document.querySelector("#current-temperature");
    temperature.innerHTML = Math.round(celsiusTemp);
}
//global 
//fahrenheit to celsius
let celsiusTemp = null;

//for search engine
let form = document.querySelector("#search-form");
form.addEventListener("submit", manageSubmit);

//celsius to fahrenheit
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

//fahrenheit to celsius
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

// default city
searchCity("Johannesburg");