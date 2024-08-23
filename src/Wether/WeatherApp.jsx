import { useState, useEffect } from "react";
import "../App.css";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (city) {
      const fetchCity = async () => {
        setLoading(true);
        setError("");
        try {
          const url = `https://api.weatherapi.com/v1/current.json?key=7cc88f5358ef4d0ca6760308241005&q=${city}&aqi=no`;
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            setCityData(data);
          } else {
            setCityData(null);
            setError("Failed to fetch weather data");
            alert("Failed to fetch weather data");
          }
        } catch (error) {
          setCityData(null);
          setError("Failed to fetch weather data");
          alert("Failed to fetch weather data");
        } finally {
          setLoading(false);
        }
      };
      fetchCity();
    }
  }, [city]);

  const handleInput = (event) => {
    event.preventDefault();
    if (temp.trim()) {
      setCity(temp);
    }
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

      {loading ? (
        <p>Loading data…</p>
      ) : cityData ? (
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
      ) : (
        error && <p>{error}</p>
      )}
    </>
  );
}

export default WeatherApp;
