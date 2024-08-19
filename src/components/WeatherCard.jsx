import React, { useState } from "react";

const WeatherCard = ({ weather, onSearch }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const [city, setCity] = useState("");

  const temperatureCelsius = weather?.main?.temp - 273.15;
  const temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32;

  const changeTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    onSearch(city);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="weather-card">
      <input
        className="search-input"
        type="text"
        value={city}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} 
        placeholder="Buscar por Ciudad"
      />
      <button className="search-button" onClick={handleSearch}>
        Buscar
      </button>
      {weather && (
        <>
          <h2>
            {weather?.name}, {weather?.sys.country}
          </h2>
          <p>"{weather.weather[0].description}"</p>
          <div className="weather-details">
            <div className="weather-icon">
              <img
                src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
            </div>
            <div className="weather-info">
              <p>
                <strong>Wind Speed:</strong> {weather?.wind.speed} m/s
              </p>
              <p>
                <strong>Clouds:</strong> {weather?.clouds.all}%
              </p>
              <p>
                <strong>Pressure:</strong> {weather?.main.pressure} hPa
              </p>
              <p className="temperature">
                {isCelsius
                  ? `${temperatureCelsius?.toFixed(1)} °C`
                  : `${temperatureFahrenheit?.toFixed(1)} °F`}
              </p>
            </div>
          </div>
          <button onClick={changeTemperatureUnit}>
            Cambiar a {isCelsius ? "°F" : "°C"}
          </button>
        </>
      )}
    </div>
  );
};

export default WeatherCard;
