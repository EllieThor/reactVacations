import "./App.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./redux/reducers";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Vacations from "./pages/Vacations";
import Reports from "./pages/Reports";

const store = createStore(reducers);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Vacations" exact component={Vacations} />
          <Route path="/Reports" exact component={Reports} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
