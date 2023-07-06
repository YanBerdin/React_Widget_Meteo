import logo from './logo.svg';
import './App.scss';
import MeteoWidget from './MeteoWidget/MeteoWidget';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
         WidgetMeteo
        </h1>

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
      <MeteoWidget city="Marcilly" code={21200}></MeteoWidget>
      <MeteoWidget city="Dijon" code={21000}></MeteoWidget>
      <MeteoWidget city="Toulon" code={83000}></MeteoWidget>

    </div>
  );
}

export default App;
