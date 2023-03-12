let now = new Date();

let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[day];

let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
let currentTime = hours + ":" + minutes;

let currentConditions = document.querySelector("#current-conditions");
currentConditions.innerHTML = `Current conditions (${currentDay} ${currentTime})`;

function showTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#temp-element");
  temperatureElement.innerHTML = `${temperature}°C`;
}

function updateCity(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#search-bar");
  let city = searchBar.value;
  let cityHeading = document.querySelector(".chosen-city");
  cityHeading.innerHTML = `${city}`;
  let apiKey = "9a42a03oda7b4ctf1fd41c136ea3644b";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", updateCity);
