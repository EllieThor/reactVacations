import "./App.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./redux/reducers";
import { BrowserRouter } from "react-router-dom";
import { Route, Link } from "react-router-dom";

import Main from "./pages/Main";
import LogInForm from "./pages/LogInForm";
import RegistrationForm from "./pages/RegistrationForm";
import Vacations from "./pages/Vacations";
import Reports from "./pages/Reports";

const store = createStore(reducers);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          {/* <HeaderCOMP /> */}
          {/* <Route path="/" exact component={Main} /> */}

          <Route path="/" exact component={LogInForm} />
          <Route path="/RegistrationForm" exact component={RegistrationForm} />
          <Route path="/Vacations" exact component={Vacations} />
          <Route path="/Reports" exact component={Reports} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
