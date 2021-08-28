import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Pokemon from "./components/Pokemon";
import Form from "./components/Form";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/pokemon/:name" component={Pokemon} exact />
          <Route path="/" component={Form} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
