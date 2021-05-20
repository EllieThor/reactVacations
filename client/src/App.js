import "./App.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./redux/reducers";
import { BrowserRouter } from "react-router-dom";
import { Route, Link } from "react-router-dom";

import Main from "./pages/Main";
import UploadImage from "./components/addVacationFormComponent";

const store = createStore(reducers);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          {/* <HeaderCOMP /> */}
          <Route path="/" exact component={Main} />
          {/* <Route path="/Orders" exact component={Orders} /> */}
          {/* <Route path="/AccountDetails" exact component={AccountDetails} /> */}
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
