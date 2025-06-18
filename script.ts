const API_KEY = "c994d7a7ca514d44812191057253105";
const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const output = document.getElementById("output");
const errorDiv = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;
  output.innerHTML = "<p>Loading...</p>";
  errorDiv.textContent = "";

  try {
    const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`);
    if (!res.ok) {
      throw new Error("Unable to fetch weather. Check city name or API key.");
    }
    const data = await res.json();
    const tempC = data.current.temp_c;
    const tempF = data.current.temp_f;
    const icon = data.current.condition.icon;
    const text = data.current.condition.text;
    const humidity = data.current.humidity;
    const wind = data.current.wind_kph;

    output.innerHTML = `
      <div class="weather-info">
        <h2>${data.location.name}, ${data.location.country}</h2>
        <img class="weather-icon" src="https:${icon}" alt="weather icon">
        <p><strong>${text}</strong></p>
        <p>🌡️ ${tempC} °C / ${tempF} °F</p>
        <p>💧 Humidity: ${humidity}%</p>
        <p>🌬️ Wind: ${wind} kph</p>
      </div>
    `;
  } catch (err) {
    output.textContent = "";
    errorDiv.textContent = err.message;
  }
});
