function pullWeatherData(response) {
  let tempHeader = document.querySelector("#current-temp-value");
  let temperature = Math.round(response.data.temperature.current);
  let currentCity = document.querySelector("#current-city");

  currentCity.innerHTML = response.data.city;
  tempHeader.innerHTML = temperature;
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

let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", searchSubmit);
