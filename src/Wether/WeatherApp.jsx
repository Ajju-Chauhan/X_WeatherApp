

import { useState, useEffect } from "react";
import "../App.css";  // Ensure you have the appropriate CSS classes defined in this file

function WeatherApp() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "YOUR_API_KEY_HERE";  // Replace with your actual API key

  useEffect(() => {
    if (city) {
      const fetchCity = async () => {
        setLoading(true);
        setError(null);
        try {
          const url = `https://api.weatherapi.com/v1/current.json?key=7cc88f5358ef4d0ca6760308241005&q=${city}&aqi=no`;
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setCityData(data);
          } else {
            setCityData(null);
            setError("Failed to fetch weather data");
          }
        } catch (error) {
          setCityData(null);
          setError("Failed to fetch weather data");
        } finally {
          setLoading(false);
        }
      };
      fetchCity();
    }
  }, [city]);

  const handleInput = (event) => {
    event.preventDefault();
    setCity(temp);
  };

  return (
    <>
      <form onSubmit={handleInput} className="form">
        <input
          className="inp"
          type="text"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit" className="btn">Search</button>
      </form>

      {loading && <p>Loading data…</p>}
      {error && <p>{error}</p>}

      {cityData && !loading && !error && (
        <div className="weather-cards">
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
      )}
    </>
  );
}

export default WeatherApp;
