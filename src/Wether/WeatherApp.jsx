import { useState, useEffect } from "react";
import "../App.css";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (city) {
      const fetchCity = async () => {
        setLoading(true);
        setError("");
        setCityData(null);

        try {
          const url = `https://api.weatherapi.com/v1/current.json?key=7cc88f5358ef4d0ca6760308241005&q=${city}&aqi=no`;
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setCityData(data);
          } else {
            throw new Error("City not found or unable to fetch data");
          }
        } catch (error) {
          setError("Failed to fetch weather data. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      fetchCity();
    }
  }, [city]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      setCity(inputValue.trim());
    } else {
      setError("Please enter a valid city name.");
    }
  };

  return (
    <div className="weather-app">
      <form onSubmit={handleSearch} className="form">
        <input
          className="inp"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter city name"
        />
        <button type="submit" className="btn">Search</button>
      </form>

      {loading ? (
        <p>Loading data…</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : cityData ? (
        <div className="weather-cards">
          <div className="weather-card">
            <p>City</p>
            <p>{cityData.location.name}</p>
          </div>
          <div className="weather-card">
            <p>Temperature</p>
            <p>{cityData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <p>Humidity</p>
            <p>{cityData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <p>Condition</p>
            <p>{cityData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <p>Wind Speed</p>
            <p>{cityData.current.wind_kph} kph</p>
          </div>
        </div>
      ) : (
        <p>Enter a city to see the weather information.</p>
      )}
    </div>
  );
}

export default WeatherApp;
