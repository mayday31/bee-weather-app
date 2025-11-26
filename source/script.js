function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = searchInput.value;
}

let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", searchCity);

console.log(searchForm);
