import { PropTypes } from "prop-types";
import "./MeteoWidget.scss";
import axios from "axios";
import { useEffect, useState } from "react";

const MeteoWidget = ({ cityName, code }) => {
  const [temperature, setTemperature] = useState(null);
  const [iconUrl, setIconUrl] = useState(null);
  const [description, setDescription] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeteo = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?zip=${code},fr&appid=${process.env.REACT_APP_API_KEY}&units=metric&lang=fr`
        );
        setTemperature(response.data.main.temp);
        setIconUrl(
          `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
        );
        setDescription(response.data.weather[0].description);
        setError(null); // Réinitialise l'erreur en cas de succès
        // console.log(response.data);
        // console.log(response.data.main.temp);
        // console.log(response.data.weather[0].description);
      } catch (err) {
        setError(err);
        alert("Erreur API Impossible de récupérer les données météo !");
        console.error(error);
      }
    };
    fetchMeteo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

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
};

MeteoWidget.propTypes = {
  cityName: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
};

export default MeteoWidget;
