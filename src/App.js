import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthenticationView from "./components/views/auth";

function App() {

  const isAuthenticated = false;
  return (
    <BrowserRouter>
      {
        isAuthenticated ? <Switch>
          <Route path="/">List of groups</Route>
        </Switch> : <Switch>
          <Route path="/" component={AuthenticationView} />
        </Switch>
      }
    </BrowserRouter>
  );
}

export default App;
