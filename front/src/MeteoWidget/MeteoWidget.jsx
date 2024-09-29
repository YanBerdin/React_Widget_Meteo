import { PropTypes } from "prop-types";
import "./MeteoWidget.scss";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

function MeteoWidget({ cityName, code }) {
  const [temperature, setTemperature] = useState(null);
  const [iconUrl, setIconUrl] = useState(null);
  const [description, setDescription] = useState(null);

  // Au 1er rendu, récupérer les data météo depuis l'API
  const fetchMeteo = useCallback(() => {
    // "process" est automatiquement injecté dans notre code lors du build
    // il permet de récupérer des valeurs depuis le fichier .env
    // sans avoir à importer "process"
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?zip=${code},fr&appid=${process.env.REACT_APP_API_KEY}&units=metric&lang=fr`
      )
      .then((response) => {
        setTemperature(response.data.main.temp);
        setIconUrl(
          `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
        setDescription(response.data.weather[0].description);
        console.log(response.data);
        // console.log(response.data.main.temp);
        // console.log(response.data.weather[0].description);
      })
      .catch((err) => {
        alert("Erreur API openweather !");
      });
    // permettre de laisser le tableau de dependence vide pour 1er chargement de useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Utiliser useEffect pour appeler la fonction fetchMeteo au montage et lorsque la ville change
  useEffect(() => {
    fetchMeteo();
  }, [fetchMeteo]); // Dépend uniquement de la fonction fetchMeteo

  return (
    <div className="MeteoWidget">
      <div className="MeteoWidget-container">
        <div className="MeteoWidget-infos">
          <h2 className="MeteoWidget-city">{cityName}</h2>
          <h3 className="MeteoWidget-code">{code}</h3>
        </div>

        <div className="MeteoWidget-temperature">
          <img alt="Icône de la météo actuelle" src={iconUrl}></img>
          <div className="MeteoWidget-description">
            <p>{description}</p>
            <p>{Math.round(temperature)}°C</p>
          </div>
        </div>
      </div>
    </div>
  );
}

MeteoWidget.propTypes = {
  cityName: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
};

export default MeteoWidget;
