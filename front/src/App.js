import logo from "./logo.svg";
import "./App.scss";
import MeteoWidget from "./MeteoWidget/MeteoWidget";
import MeteoWidget2 from "./MeteoWidget/MeteoWidget2";

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
        <MeteoWidget
          city="Marcilly sur Tille"
          code={21200}
        ></MeteoWidget>
        <MeteoWidget2 />
        <MeteoWidget city="Paris" code={75005}></MeteoWidget>
      </section>
    </div>
  );
}

export default App;
