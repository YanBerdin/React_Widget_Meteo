import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MeteoWidget.scss";
import { PropTypes } from "prop-types";

function MeteoWidget3() {
  const [temperature, setTemperature] = useState(null);
  const [iconUrl, setIconUrl] = useState(null);
  const [description, setDescription] = useState(null);
  const [cityName, setCityName] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { longitude, latitude } = position.coords;

      console.log("lat et long", latitude, longitude); //TODO: remove
      console.log("Latitude:", position.coords.latitude); //TODO: remove
      //console.log("Longitude:", position.coords.longitude); //TODO: remove
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric&lang=fr`
        )
        .then((response) => {
          console.log("response.data.coord", response.data.coord);
          console.log("response.data", response.data); //TODO: remove
          console.log("position.coords", position.coords); //TODO: remove
          setCityName(response.data.name);
          setTemperature(response.data.main.temp);
          setIconUrl(
            `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
          );
          setDescription(response.data.weather[0].description);
        })
        .catch((err) => {
          alert("Erreur API openweather !");
        });
    });
  }, []);

  return (
    <div className="MeteoWidget">
      <div className="MeteoWidget-container">
        <div className="MeteoWidget-infos">
          <h2 className="MeteoWidget-city">{cityName}</h2>

          {/*<h3 className="MeteoWidget-code">{code}</h3>*/}
        </div>

        <h3 className="MeteoWidget-temperature">
          <img alt="Icône de la météo actuelle" src={iconUrl}></img>
          {/* 28° */}
          <p className="MeteoWidget-description">{description}</p>{" "}
          <p>{Math.round(temperature)}°C</p>
        </h3>
      </div>
    </div>
  );
}

MeteoWidget3.propTypes = {
  cityName: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
};
export default MeteoWidget3;
