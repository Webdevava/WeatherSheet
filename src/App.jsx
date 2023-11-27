import React, { useState, useEffect } from "react";
import "./App.scss";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Weather from "./components/Weather";
import logo from './assets/logo.svg';
import logo2 from './assets/logo2.svg';

const App = () => {
  const [favicon, setFavicon] = useState(logo);
  const [searchedLocation, setSearchedLocation] = useState("");
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [recentLocations, setRecentLocations] = useState([]);
  const [currLocation, setCurrLocation] = useState("");

  const apiKey = "d3d48be238ecb6ee1713db189f686066";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
            )
            .then((response) => {
              const cityName = response.data.name;
              setCurrLocation(cityName);
            })
            .catch((error) => {
              console.error("Error fetching current location:", error);
            });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    const faviconImages = [logo, logo2];
    let currentIndex = 0;

    const switchFavicon = () => {
      currentIndex = (currentIndex + 1) % faviconImages.length;
      const newFavicon = faviconImages[currentIndex];

      setFavicon(newFavicon);

      // Update the favicon in the document's head
      const linkElement = document.querySelector("link[rel*='icon']");
      if (linkElement) {
        linkElement.href = newFavicon;
      }
    };

    // Interval to switch favicon every 500 milliseconds
    const intervalId = setInterval(switchFavicon, 500);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Effect runs only once when the component mounts

  const handleLocationChange = (location) => {
    setSearchedLocation(location);
  };

  const handleSearch = (success) => {
    setSearchSuccess(success);
  };

  const handleRecentLocations = (locations) => {
    setRecentLocations(locations);
  };

  return (
    <div className="App">
    <ToastContainer />
      <Navbar
        onLocationChange={handleLocationChange}
        onSearch={handleSearch}
        onRecentLocations={handleRecentLocations}
        currLocation={currLocation}
      />
      <Weather
        searchedLocation={searchedLocation}
        currLocation={currLocation}
        onSearch={handleSearch}
      />
      <Footer />
    </div>
  );
};

export default App;
