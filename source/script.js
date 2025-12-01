function pullWeatherData(response) {
  let tempHeader = document.querySelector("#current-temp-value");
  let temperature = Math.round(response.data.temperature.current);
  let currentCity = document.querySelector("#current-city");
  let condition = document.querySelector("#weather-condition");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let emoji = document.querySelector("#emoji");

  tempHeader.innerHTML = temperature;
  currentCity.innerHTML = response.data.city;
  condition.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}mph`;
  emoji.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon">`;

  pullForecastData(response.data.city);
}

function searchCity(city) {
  let apiKey = "86d11b15bf79a84309ce4be6o80tad43";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(pullWeatherData);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let currentDate = document.querySelector("#day-time");
let realTime = new Date();
let hours = realTime.getHours();
let minutes = realTime.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[realTime.getDay()];

currentDate.innerHTML = `${day} ${hours}:${minutes}`;

let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", searchSubmit);

function pullForecastData(city) {
  let apiKey = "86d11b15bf79a84309ce4be6o80tad43";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        ` 
      <div class="forecast-info">
            <div class="forecast-day">${formatForecastDay(day.time)}</div>
                <img src="${day.condition.icon_url}" class="forecast-emoji"/> 
            <div class="forecast-temperatures">
              <div class="forecast-temp"><strong>${Math.round(
                day.temperature.maximum
              )}°</strong></div> /
              <div class="forecast-temp">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
       </div>
       `;
    }
  });

  let forecastData = document.querySelector("#forecast");
  forecastData.innerHTML = forecastHtml;
}

searchCity("Lorton");
