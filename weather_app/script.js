const searchInput = document.getElementById("searchInput");

async function getWeather(city = "Dhaka") {
  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`,
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      alert("City not found!");
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${latitude}&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
        `&timezone=auto`,
    );

    const data = await weatherRes.json();

    document.getElementById("city").textContent = `${name}, ${country}`;
    document.getElementById("temp").textContent =
      Math.round(data.current.temperature_2m) + "°";
    document.getElementById("condition").textContent = getWeatherDescription(
      data.current.weather_code,
    );

    document.getElementById("wind").textContent =
      data.current.wind_speed_10m + " km/h";
    document.getElementById("humidity").textContent =
      data.current.relative_humidity_2m + "%";
    document.getElementById("visibility").textContent = "N/A";

    const date = new Date();
    document.getElementById("date").textContent = date.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
      },
    );

    updateForecast(data.daily);
  } catch (err) {
    console.error(err);
  }
}

async function updateForecast(daily) {
  const forecastContainer = document.getElementById("forecast");
  forecastContainer.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const date = new Date(daily.time[i]);
    const div = document.createElement("div");
    div.className = "day";
    div.innerHTML = `
      <span>${date.toLocaleDateString("en-US", { weekday: "short" })}</span>
      <span class="icon">${getWeatherIcon(daily.weather_code[i])}</span>
      <span><strong>${Math.round(daily.temperature_2m_max[i])}°</strong> / ${Math.round(daily.temperature_2m_min[i])}°</span>
    `;
    forecastContainer.appendChild(div);
  }
}

function getWeatherDescription(code) {
  const codes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    51: "Light drizzle",
    61: "Rain",
    71: "Snow",
    80: "Rain showers",
    95: "Thunderstorm",
  };
  return codes[code] || "Cloudy";
}

function getWeatherIcon(code) {
  const icons = {
    0: "☀️",
    1: "🌤️",
    2: "⛅",
    3: "☁️",
    45: "🌫️",
    51: "🌦️",
    61: "🌧️",
    71: "❄️",
    80: "🌦️",
    95: "⛈️",
  };
  return icons[code] || "☁️";
}

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeather(searchInput.value.trim());
  }
});

window.onload = () => getWeather();
