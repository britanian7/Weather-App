import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import Modal from "./components/Modal";

function App() {
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const success = (position) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    };
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const API_KEY = "6bb96a1b66ec9b93abad2b150f67bd1d";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`;

      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          setErrorMessage("");
        })
        .catch((err) => {
          console.error(err);
          setErrorMessage("Error al obtener los datos del clima.");
          setModalOpen(true);
        });
    }
  }, [coords]);

  useEffect(() => {
    if (weather) {
      const weatherDescription = weather.weather[0].description.toLowerCase();
      if (weatherDescription.includes("clear")) {
        document.body.className = "clear";
      } else if (weatherDescription.includes("clouds")) {
        document.body.className = "clouds";
      } else if (
        weatherDescription.includes("rain") ||
        weatherDescription.includes("drizzle")
      ) {
        document.body.className = "rain";
      } else if (weatherDescription.includes("snow")) {
        document.body.className = "snow";
      } else if (weatherDescription.includes("thunderstorm")) {
        document.body.className = "storm";
      } else {
        document.body.className = "";
      }
    }
  }, [weather]);

  const fetchWeatherByCity = (cityName) => {
    const API_KEY = "6bb96a1b66ec9b93abad2b150f67bd1d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

    axios
      .get(url)
      .then((res) => {
        setWeather(res.data);
        setErrorMessage("");
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Esta ciudad no existe.");
        setModalOpen(true);
      });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <h1 className="title1">Weather App</h1>
      <div className="app-container">
        {weather ? (
          <WeatherCard weather={weather} onSearch={fetchWeatherByCity} />
        ) : (
          <p>Cargando...</p>
        )}
      </div>
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <p>{errorMessage}</p>
      </Modal>
    </div>
  );
}

export default App;
