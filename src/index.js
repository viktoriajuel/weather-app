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

function updateCity(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#search-bar");
  let city = searchBar.value;
  let cityHeading = document.querySelector(".chosen-city");
  cityHeading.innerHTML = `${city}`;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", updateCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  console.log(response);
  let city = response.data.name;
  let temperatureElement = document.querySelector("#temp-element");
  temperatureElement.innerHTML = `${temperature}°C`;
}
