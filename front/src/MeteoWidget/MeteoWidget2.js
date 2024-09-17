import { PropTypes } from "prop-types";
import "./MeteoWidget.scss";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

function MeteoWidget2() {
  const [temperature, setTemperature] = useState(null);
  const [iconUrl, setIconUrl] = useState(null);
  const [description, setDescription] = useState(null);
  const [code, setCode] = useState("75005");
  const [cityName, setCityName] = useState("Paris 05");

  // Gérer la soumission du formulaire
  const handleSubmit = (event) => {
    // Empêcher le comportement par défaut du formulaire
    event.preventDefault();
    // Appeler la fonction fetchMeteo avec le code saisi
    fetchMeteo(code);
  };

  // Au 1er rendu, récupérer les data météo depuis l'API
  const fetchMeteo = useCallback((code) => {
    //* "process" est automatiquement injecté dans le code lors du build
    //? il permet de récupérer des valeurs depuis le fichier .env
    //? sans avoir à importer "process"

    // Ajouter une condition pour vérifier si le code est un nombre à 5 chiffres
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
          console.log(response.data);
          // console.log(response.data.main.temp);
          // console.log(response.data.weather[0].description);
        })
        .catch((err) => {
          alert("Erreur API openweather !");
        });
    }
    // permet le tableau de dependence vide au 1er chargement de useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Gérer le changement de code
  const handleChange = (event) => {
    setCode(event.target.value);
    fetchMeteo(code);
  };

  // Utiliser useEffect pour appeler la fonction fetchMeteo au montage et lorsque la ville change
  useEffect(() => {
    fetchMeteo(code);
  }, [code, fetchMeteo]); // Dépend de la fonction fetchMeteo et du code postal

  return (
    <div className="MeteoWidget">
      <div className="MeteoWidget-container">
        <div className="MeteoWidget-infos">
          <h2 className="MeteoWidget-city"> {cityName} </h2>

          <h3 className="MeteoWidget-code">{code}</h3>
          {/* Ajouter un élément form avec l'attribut onSubmit */}
        </div>

        <h3 className="MeteoWidget-temperature">
          <img alt="Icône de la météo actuelle" src={iconUrl}></img>
          {/* 28° */}
          <p className="MeteoWidget-description">{description}</p>
          <p>{Math.round(temperature)}°C</p>
        </h3>
      </div>
      <form className="MeteoWidget-form" onSubmit={handleSubmit}>
        <input type="text" value={code} onChange={handleChange} />
      </form>
    </div>
  );
}

MeteoWidget2.propTypes = {
  cityName: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
};

export default MeteoWidget2;
