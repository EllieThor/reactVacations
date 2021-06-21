import "./App.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./redux/reducers";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import LogInForm from "./pages/LogInForm";
import RegistrationForm from "./pages/RegistrationForm";
import Vacations from "./pages/Vacations";
import Reports from "./pages/Reports";

const store = createStore(reducers);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/Home" exact component={Home} />
          <Route path="/" exact component={LogInForm} />
          <Route path="/RegistrationForm" exact component={RegistrationForm} />
          <Route path="/Vacations" exact component={Vacations} />
          <Route path="/Reports" exact component={Reports} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
