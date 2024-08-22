import { useState, useEffect } from "react";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [cityData, setCityData] = useState(null);

  useEffect(() => {
    if (city) {
      const fetchCity = async () => {
        try {
          const url = `https://api.weatherapi.com/v1/current.json?key=7cc88f5358ef4d0ca6760308241005&q=${city}&aqi=no`;
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            console.log("Data >", data.location.name);
            setCityData(data);
          } else {
            console.log("City not found");
            setCityData(null);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setCityData(null);
        }
      };
      fetchCity();
    }
  }, [city]);

  const handleInput = (event) => {
    event.preventDefault();
    setCity(temp);
  };

  console.log(cityData);

  return (
    <>
      <form onSubmit={handleInput}>
        <input
          type="text"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
      {cityData ? (
        <div>
          <h2>{cityData.location.name}</h2>
          <div>
            <div>
              <p>Temperature</p>
              <p>{cityData.current.temp_c}°C</p>
            </div>
            <div>
              <p>Humidity</p>
              <p>{cityData.current.humidity}%</p>
            </div>
            <div>
              <p>Condition</p>
              <p>{cityData.current.condition.text}</p>
            </div>
            <div>
              <p>Wind Speed</p>
              <p>{cityData.current.wind_kph}kph</p>
            </div>
            <div></div>
          </div>
        </div>
      ) : (
        city && <p>Loading data…</p>
      )}
    </>
  );
}

export default WeatherApp;
