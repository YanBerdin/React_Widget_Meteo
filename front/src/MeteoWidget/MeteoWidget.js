import { PropTypes } from "prop-types";
import "./MeteoWidget.scss";
import axios from "axios";
import { useEffect, useState } from "react";

function MeteoWidget({ city, code }) {
  const [temperature, setTemperature] = useState(null);
  const [iconUrl, setIconUrl] = useState(null);
  const [description, setDescription] = useState(null);

  // Au 1er rendu, récupérer les data météo depuis l'API
  // essai avec Clé API d'Alexandre
  useEffect(() => {
    //"process" est automatiquement injecté dans notre code lors du build
    //il nous permet donc de récupérer des valeurs depuis le fichier .env
    //sans avoir à importer "process"
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?zip=${code},fr&appid=${process.env.REACT_APP_API_KEY}&units=metric&lang=fr`
      )
      .then((response) => {
        setTemperature(response.data.main.temp);
        setIconUrl(
          `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
        setDescription(response.data.weather[0].description);
        console.log(response.data);
        console.log(response.data.main.temp);
        console.log(response.data.weather[0].description);
      })
      .catch((err) => {
        alert("Erreur API openweather !");
      });
    // permettre de laisser le tableau de dependence vide pour 1er chargement de useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="MeteoWidget">
      <div className="MeteoWidget-container">
        <div className="MeteoWidget-infos">
          <h2 className="MeteoWidget-city">{city}</h2>

          <h3 className="MeteoWidget-code">{code}</h3>
        </div>

        <h3 className="MeteoWidget-temperature">
          <img alt="Icône de la météo actuelle" src={iconUrl}></img>
          {/* 28° */}
          <p className="MeteoWidget-description">{description}</p> {temperature}
        </h3>
      </div>
    </div>
  );
}

MeteoWidget.propTypes = {
  city: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
};

export default MeteoWidget;
