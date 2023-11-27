// Weather.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/weather.scss";

//images
import temp from '../assets/thermometer.svg'
import temp_min from '../assets/therm_loss.svg'
import temp_max from '../assets/therm_add.svg'
import wind from '../assets/wind.svg'
import speed from '../assets/speed.svg'
import direction from '../assets/direction.svg'
import humidity from '../assets/humidity.svg'
import pressure from '../assets/pressure.svg'

const Weather = ({ searchedLocation, currLocation, onSearch }) => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "d3d48be238ecb6ee1713db189f686066";

  useEffect(() => {

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchedLocation || currLocation}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setWeatherData(response.data);
        onSearch(true); // Notify the parent about successful search
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        onSearch(false); // Notify the parent about failed search
      })
  }, [searchedLocation, currLocation, apiKey, onSearch]);



  if (searchedLocation || currLocation) {
    return (
      <div className="weather-container centered">
        {weatherData && (
          <div className="weather-card centered">
            {searchedLocation ? (
              <p className="myLocation">{searchedLocation}</p>
            ) : (
              <p className="myLocation">{currLocation}</p>
            )}
            <p className="desc">{weatherData.weather[0].description}</p>
            <p className="temp"> <img src={temp} alt="" /> {weatherData.main.temp}°C</p>
            <p className="feel">Feels like: {weatherData.main.feels_like}°C</p>
            <p className="min">temp_min <img src={temp_min} alt="" />{weatherData.main.temp_min}°C</p>
            <p className="max">temp_max <img src={temp_max} alt="" />{weatherData.main.temp_max}°C</p>
            <p className="pressure">pressure<img src={pressure} alt="" /> {weatherData.main.pressure} hPa</p>
            <p className="humid">humidity <img src={humidity} alt="" /> {weatherData.main.humidity}%</p>
            <p className="wind_speed">wind_speed <img src={speed} alt="" /> {weatherData.wind.speed} m/s</p>
            <p className="wind_dir">wind_direction <img src={direction} alt="" />{weatherData.wind.deg}°</p>
            <p className="cloud">Cloudiness: {weatherData.clouds.all}%</p>
            <p className="sunrise">
              Sunrise:
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p className="sunset">
              Sunset:
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </p>
            <p className="visible">Visibility: {weatherData.visibility / 1000} km</p>
          
            <img
            className="weatherImg"
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt="weather-icon"
            />
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="weather-container centered">
        <div className="weather-card centered">
          <p className="noLocation">
            Allow Location access or search for a location
          </p>
        </div>
      </div>
    );
  }
};

export default Weather;
