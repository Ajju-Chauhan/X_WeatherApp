import { useState, useEffect } from "react";
import "../App.css"

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
      {cityData ? (
        
        
          <div className="Outerdiv">
            <div className="InnerDiv">
              <p>Temperature</p>
              <p>{cityData.current.temp_c}°C</p>
            </div>
            <div className="InnerDiv">
              <p>Humidity</p>
              <p>{cityData.current.humidity}%</p>
            </div>
            <div className="InnerDiv">
              <p>Condition</p>
              <p>{cityData.current.condition.text}</p>
            </div>
            <div className="InnerDiv">
              <p>Wind Speed</p>
              <br />
              <p>{cityData.current.wind_kph}kph</p>
            </div>
            
          </div>
        
      ) : (
        city && <p>Loading data…</p>
      )}
    </>
  );
}

export default WeatherApp;
