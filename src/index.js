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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row justify-content-between">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2 forecast-element">
                <div class="forecast-day">${formatDay(forecastDay.time)}</div>
                <div>
                  <span class="forecast-temp-max">${Math.round(
                    forecastDay.temperature.maximum
                  )}° </span>
                  <span class="forecast-temp-min">${Math.round(
                    forecastDay.temperature.minimum
                  )}° </span>
                </div>
              </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
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
  humidity.innerHTML = `Humidity: ${Math.round(
    response.data.temperature.humidity
  )}%`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} m/h`;
  conditions.innerHTML = response.data.condition.description;
  icon.setAttribute("src", response.data.condition.icon_url);
  iconAltText.setAttribute("alt", response.data.condition.description);
  date.innerHTML = `Last updated: ${formatDate(response.data.time * 1000)}`;
}

function definePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "9a42a03oda7b4ctf1fd41c136ea3644b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=${apiKey}&units=${units}`;
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
  axios.get(apiUrlForecast).then(displayForecast);
}

function updateCity(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#search-bar");
  let city = searchBar.value;
  let apiKey = "9a42a03oda7b4ctf1fd41c136ea3644b";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
  axios.get(apiUrlForecast).then(displayForecast);
}

navigator.geolocation.getCurrentPosition(definePosition);

let searchBar = document.querySelector("#search-form");
searchBar.addEventListener("submit", updateCity);
