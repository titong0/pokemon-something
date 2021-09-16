import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Pokemon from "./components/Pokemon";
import Search from "./components/Search";
import Type from "./components/Type";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route path="/type/:type" component={Type} exact />
          <Route path="/pokemon/:name" component={Pokemon} exact />
          <Route path="/" component={Search} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
