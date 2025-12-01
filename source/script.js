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

function displayForecast() {
  let days = ["Mon", "Tue", "Wed", "Thurs", "Fri"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      ` 
      <div class="forecast-info">
            <div class="forecast-day">${day}</div>
            <div class="forecast-emoji">☀️</div>
            <div class="forecast-temperatures">
              <div class="forecast-temp"><strong>44°</strong></div>
              <div class="forecast-temp">20°</div>
            </div>
       </div>
       `;
  });

  let forecastData = document.querySelector("#forecast");
  forecastData.innerHTML = forecastHtml;
}

searchCity("Lorton");
displayForecast();
