import logo from "./logo.svg";
import "./App.scss";
import MeteoWidget from "./MeteoWidget/MeteoWidget";
import MeteoWidget2 from "./MeteoWidget/MeteoWidget2";
import MeteoWidget3 from "./MeteoWidget/MeteoWidget3";
import WeatherWidget from "./MeteoWidget/WeatherWidget";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>WidgetMeteo</h1>

        <img src={logo} className="App-logo" alt="logo" />

        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      <section className="MeteoWidget-section">
        <WeatherWidget />
        <MeteoWidget cityName="Chamonix-Mont-Blanc" code={74400}></MeteoWidget>
        <MeteoWidget2 cityName="Paris" code={75005}></MeteoWidget2>
        {/*<MeteoWidget2 />*/}
        <MeteoWidget3 cityName="Paris" code={75011} />
      </section>
    </div>
  );
}

export default App;
