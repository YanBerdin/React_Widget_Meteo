import { PropTypes } from "prop-types";
import "./MeteoWidget.scss";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const MeteoWidget2 = () => {
  const [temperature, setTemperature] = useState(null);
  const [iconUrl, setIconUrl] = useState(null);
  const [description, setDescription] = useState(null);
  const [code, setCode] = useState("75005");
  const [cityName, setCityName] = useState("Paris 05");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMeteo(code);
  };

  const fetchMeteo = useCallback((code) => {
    // Vérifier si le code est un nombre à 5 chiffres
    if (/^\d{5}$/.test(code)) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?zip=${code},fr&appid=${process.env.REACT_APP_API_KEY}&units=metric&lang=fr`
        )
        .then((response) => {
          // console.log(response.data.name);
          // Vérifier si la réponse contient au moins une commune
          // if (response.data.length > 0) {
          //   // Prendre le nom de la première commune
          setCityName(response.data.name);
          // } else {
          //   // Sinon, afficher un message d'erreur
          //   setCityName("Code postal invalide");
          // }
          setTemperature(response.data.main.temp);
          setIconUrl(
            `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
          );
          setDescription(response.data.weather[0].description);
          // console.log(response.data);
          // console.log(response.data.main.temp);
          // console.log(response.data.weather[0].description);
        })
        .catch((err) => {
          alert("Erreur API openweather !");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    setCode(event.target.value);
    fetchMeteo(code);
  };

  useEffect(() => {
    fetchMeteo(code);
  }, [code, fetchMeteo]);

  return (
    <div className="MeteoWidget">
      <div className="MeteoWidget-container">
        <div className="MeteoWidget-infos">
          <h2 className="MeteoWidget-city">{cityName}</h2>
          <h3 className="MeteoWidget-code">{code}</h3>
        </div>
        <div className="MeteoWidget-temperature">
          <img alt="Icône de la météo actuelle" src={iconUrl} />
          <div className="MeteoWidget-description">
            <p>{description}</p>
            <p>{Math.round(temperature)}°C</p>
          </div>
        </div>
      </div>
      <form className="MeteoWidget-form" onSubmit={handleSubmit}>
        <input
          className="MeteoWidget-input"
          type="text"
          value={code}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

MeteoWidget2.propTypes = {
  cityName: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
};

export default MeteoWidget2;
