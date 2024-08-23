import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    const apiKey = '7cc88f5358ef4d0ca6760308241005'; // Replace with your actual API key
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    setLoading(true);
    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
    } catch (error) {
      alert('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city) {
      fetchWeatherData();
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter city name" 
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading data...</p>}

      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <p>Temperature: {weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <p>Humidity: {weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <p>Condition: {weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <p>Wind Speed: {weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
