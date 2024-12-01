import React, { useEffect, useRef, useState } from "react";
import "../Weather/Weather.css";
import serch from "../../assets/search.png";
import clear from "../../assets/clear.png";
import cloud from "../../assets/cloud.png";
import drizzle from "../../assets/drizzle.png";
import humidity from "../../assets/humidity.png";
import rain from "../../assets/rain.png";
import snow from "../../assets/snow.png";
import wind from "../../assets/wind.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inputRef = useRef();
  const allicons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=ff52142c100799a8f14d98a0594801ed`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allicons[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.log(error);
    }
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  return (
    <div className="weather container">
      <div className="search-box">
        <input type="text" placeholder="Enter City" ref={inputRef} />
        <img
          src={serch}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature">{weatherData.temp}</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="" />
              <div>
                <p>{weatherData.windspeed} km/hr</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Weather;
