function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
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
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function displayLocalWeather(response) {
  let cityHeading = document.querySelector(".city");
  let localTemp = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let conditions = document.querySelector("#conditions");
  let icon = document.querySelector("#icon");
  let iconAltText = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.temperature.current);

  cityHeading.innerHTML = `${response.data.city}`;
  localTemp.innerHTML = `${celsiusTemperature}°C`;
  humidity.innerHTML = `${Math.round(response.data.temperature.humidity)}`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  conditions.innerHTML = response.data.condition.description;
  icon.setAttribute("src", response.data.condition.icon_url);
  iconAltText.setAttribute("alt", response.data.condition.description);

  //let date = document.querySelector("#date");
  //date.innerHTML = formatDate(response.data.time * 1000);
}

function defineLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "9a42a03oda7b4ctf1fd41c136ea3644b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayLocalWeather);
}

function displaySearchWeather(response) {
  let searchBar = document.querySelector("#search-bar");
  let temperatureElement = document.querySelector("#temperature");
  let city = searchBar.value;
  let cityHeading = document.querySelector(".city");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let conditions = document.querySelector("#conditions");
  let icon = document.querySelector("#icon");
  let iconAltText = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.temperature.current);

  cityHeading.innerHTML = `${city}`;
  temperatureElement.innerHTML = `${celsiusTemperature}°C`;
  humidity.innerHTML = `${Math.round(response.data.temperature.humidity)}`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  conditions.innerHTML = response.data.condition.description;
  icon.setAttribute("src", response.data.condition.icon_url);
  iconAltText.setAttribute("alt", response.data.condition.description);

  //let date = document.querySelector("#date");
  //date.innerHTML = formatDate(response.data.time * 1000);
}

function updateCity(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#search-bar");
  let city = searchBar.value;
  let apiKey = "9a42a03oda7b4ctf1fd41c136ea3644b";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displaySearchWeather);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheiTemperature)}°F`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

navigator.geolocation.getCurrentPosition(defineLocation);

let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", updateCity);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//alt under her må ryddes opp:
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

let currentConditions = document.querySelector(".last-updated");
currentConditions.innerHTML = `Last updated: ${currentDay} ${currentTime}`;
