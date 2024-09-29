"use client";

import { useState, useEffect } from "react";
//import { Cloud, Droplets, Sun, Thermometer, MapPin, Loader2 } from "lucide-react"
import { Cloud, Droplets, Thermometer, MapPin } from "lucide-react"; //  Sun,

import axios from "axios";

/*interface LocationData {
    city: string;
    state: string;
    country: string;
}
*/
export default function WeatherWidget() {
  // const [location, setLocation] = useState<LocationData | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const [temperature, setTemperature] = useState(null);
  const [iconUrl, setIconUrl] = useState("");
  const [description, setDescription] = useState(null);
  const [cityName, setCityName] = useState(null);

  /*
        useEffect(() => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        fetchLocationName(latitude, longitude);
                    },
                    err => {
                        setError("Unable to retrieve your location");
                        setLoading(false);
                    }
                );
            } else {
                setError("Geolocation is not supported by your browser");
                setLoading(false);
            }
        }, []);
    */
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
          console.log("response", response); //TODO: remove
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
          console.log("err", err); //TODO: remove
          alert("Erreur API openweather !");
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /*
        const fetchLocationName = async (latitude: number, longitude: number) => {
            try {
                const response = await fetch(
                    // `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric&lang=fr`
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=adffa73c6a07ba1fa45b9e861a33e942&units=metric&lang=fr`
                );
                const data = await response.json();
    
                console.log(data);
                setLocation({
                    city: data.address.city || data.address.town || data.address.village || 'Unknown',
                    state: data.address.state || '',
                    country: data.address.country || ''
                });
            } catch (err) {
                setError("Error fetching location data");
            } finally {
                setLoading(false);
            }
        };
    */
  /*
        if (loading) {
            return (
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-xl shadow-lg max-w-sm w-full text-white flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin" />
                </div>
            );
        }
    
        if (error) {
            return (
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-xl shadow-lg max-w-sm w-full text-white">
                    <p className="text-center">{error}</p>
                </div>
            );
        }
    */
  return (
    //<div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-xl shadow-lg max-w-sm w-full text-white mx-auto my-8">
    <div
      style={{
        background: "linear-gradient(to bottom right, #63b3ed, #3182ce)",
        padding: "1.5rem",
        borderRadius: "1rem",
        boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
        maxWidth: "24rem",
        width: "100%",
        color: "white",
        //margin: "1rem auto",
      }}
    >
      {/*<div className="flex justify-between items-center mb-4">*/}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <div>
          {/*<h2 className="text-2xl font-bold flex items-center">*/}
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/*<MapPin className="w-10 h-10 mr-2" />*/}
            <MapPin
              style={{
                width: "3rem",
                height: "3rem",
                marginRight: "0.5rem",
                marginBottom: "1rem"
              }}
            />
            {cityName}
          </h2>
          {/*<p className="text-sm">{cityName}</p>*/}
          {/*<p style="font-size: 0.875rem;">{cityName}</p>*/}
        </div>
      </div>
      {/*<div className="mb-4">*/}
      <div style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {/*<p className="text-6xl font-bold">72°F</p>*/}
          <p
            style={{
              fontSize: "3.75rem",
              fontWeight: "bold",
              marginTop: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            {Math.round(temperature)}°C
          </p>
          {/*<Sun className="w-10 h-10 text-yellow-300" />*/}
          {/*<Sun
            style={{
              width: "5rem",
              height: "5rem",
              color: "#f6e05e",
              marginTop: "0.5rem",
            }}
          />
          */}
          <img alt="Icône de la météo actuelle" src={iconUrl} />
        </div>

        {/*<p className="text-xl">Sunny</p>*/}
        <p style={{ fontSize: "1.25rem" }}>{description}</p>
      </div>
      {/*<div className="flex justify-between items-center border-t border-blue-300 pt-4">*/}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #63b3ed",
          paddingTop: "1rem",
        }}
      >
        {/*<div className="flex items-center">*/}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/*<Thermometer className="w-5 h-5 mr-1" />*/}
          <Thermometer
            style={{
              width: "1.25rem",
              height: "1.25rem",
              marginRight: "0.25rem",
            }}
          />
          <span>High: 75°F</span>
        </div>
        {/*<div className="flex items-center">*/}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/*<Thermometer className="w-5 h-5 mr-1" />*/}
          <Thermometer
            style={{
              width: "1.25rem",
              height: "1.25rem",
              marginRight: "0.25rem",
            }}
          />
          <span>Low: 65°F</span>
        </div>
      </div>
      {/*<div className="flex justify-between items-center mt-4">*/}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        {/*<div className="flex items-center">*/}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/*<Droplets className="w-5 h-5 mr-1" />*/}
          <Droplets
            style={{
              width: "1.25rem",
              height: "1.25rem",
              marginRight: "0.25rem",
            }}
          />
          <span>Humidity: 60%</span>
        </div>
        {/*<div className="flex items-center">*/}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/*<Cloud className="w-5 h-5 mr-1" />*/}
          <Cloud
            style={{
              width: "1.25rem",
              height: "1.25rem",
              marginRight: "0.25rem",
            }}
          />
          <span>Clouds: 10%</span>
        </div>
      </div>
    </div>
  );
}
