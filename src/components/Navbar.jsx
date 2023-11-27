import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/navbar.scss";
import RecentLocationCard from "./RecentLocationCard";
import logo from "../assets/logo.svg";
import locationImg from "../assets/location.svg";
import nolocationImg from "../assets/no_location.svg";
import search from "../assets/search.svg";

const Navbar = ({ onLocationChange, onSearch, currLocation }) => {
  const weatherRef = useRef(null);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [recentLocations, setRecentLocations] = useState([]);

  const apiKey = "d3d48be238ecb6ee1713db189f686066";

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const scrollToWeather = () => {
    if (weatherRef.current) {
      weatherRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    axios
      .get("https://api.unsplash.com/photos/random", {
        params: {
          client_id: "tzzyc18AiUdOx62iVoHSvbp0HPjHQCZRY2UHFCcGcs0",
          query: "nature",
        },
      })
      .then((response) => {
        setBackgroundImageUrl(response.data.urls.regular);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, []);

  useEffect(() => {
    if (searchClicked && location) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
        )
        .then((response) => {
          onLocationChange(location);
          setRecentLocations((prevLocations) => [
            {
              location,
              country: response.data.sys.country,
              temp: response.data.main.temp,
              feelsLike: response.data.main.feels_like,
              icon: response.data.weather[0].icon,
            },
            ...prevLocations
              .filter((prevLocation) => prevLocation.location !== location)
              .slice(0, 2),
          ]);
          onSearch(true);
          scrollToWeather();
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          onSearch(false); // Notify the parent component about the search failure
      
          // Display an error toast only if the search was initiated by the user
          if (searchClicked) {
            toast.error(`Error: Location '${location}' not found`);
          }
        })
        .finally(() => {
          setSearchClicked(false);
        });
    }
  }, [location, apiKey, searchClicked, onLocationChange, onSearch, scrollToWeather]);

  const handleSearchClick = () => {
    setSearchClicked(true);
  };

  return (
    <header className="centered" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <nav className="centered">
        <div className="logo centered">
          <img src={logo} alt="" />
          <span>WeatherSheet</span>
        </div>

        <div className="local centered">
          {currLocation ? (
            <>
              <img src={locationImg} alt="" />
              <span>{currLocation}</span>
            </>
          ) : (
            <>
              <img src={nolocationImg} alt="" />
              <span>No location available</span>
            </>
          )}
        </div>
      </nav>
      <div className="inputLocation centered">
        <div className="input centered">
          <input
            type="text"
            placeholder="Enter a location"
            value={location}
            onKeyPress={handleSearchKeyDown}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={handleSearchClick}>
            <img src={search} alt="search" />
          </button>
        </div>

        <div className="prevLocations centered">
          {recentLocations.length > 0 && (
            <div>
              <p>Recent locations</p>
              <div className="locations centered">
                {recentLocations.map((recentLocation, index) => (
                  <RecentLocationCard
                    key={index}
                    location={recentLocation.location}
                    country={recentLocation.country}
                    temp={recentLocation.temp}
                    feelsLike={recentLocation.feelsLike}
                    icon={recentLocation.icon}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div ref={weatherRef}></div>

      {/* Toast container for displaying error messages */}
      <ToastContainer />
    </header>
  );
};

export default Navbar;
