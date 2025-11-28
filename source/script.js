function pullWeatherData(response) {
  let tempHeader = document.querySelector("#current-temp-value");
  let temperature = Math.round(response.data.temperature.current);
  let currentCity = document.querySelector("#current-city");
  let condition = document.querySelector("#weather-condition");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");

  tempHeader.innerHTML = temperature;
  currentCity.innerHTML = response.data.city;
  condition.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}mph`;
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
