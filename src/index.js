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

function displayWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let city = response.data.city;
  celsiusTemperature = Math.round(response.data.temperature.current);
  let cityHeading = document.querySelector(".city");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let conditions = document.querySelector("#conditions");
  let icon = document.querySelector("#icon");
  let iconAltText = document.querySelector("#icon");
  let date = document.querySelector("#date");

  cityHeading.innerHTML = `${city}`;
  temperatureElement.innerHTML = `${celsiusTemperature}°C`;
  humidity.innerHTML = `${Math.round(response.data.temperature.humidity)}`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  conditions.innerHTML = response.data.condition.description;
  icon.setAttribute("src", response.data.condition.icon_url);
  iconAltText.setAttribute("alt", response.data.condition.description);
  date.innerHTML = formatDate(response.data.time * 1000);
}

function definePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "9a42a03oda7b4ctf1fd41c136ea3644b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function updateCity(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#search-bar");
  let city = searchBar.value;
  let apiKey = "9a42a03oda7b4ctf1fd41c136ea3644b";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

navigator.geolocation.getCurrentPosition(definePosition);

let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", updateCity);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
