import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginWithGoogle from "./components/core/loginWithGoogle";

function App() {

  const isAuthenticated = false;
  return (
    <BrowserRouter>
      {
        isAuthenticated ? <Switch>
          <Route path="/">List of groups</Route>
        </Switch> : <Switch>
          <Route path="/" component={LoginWithGoogle} />
        </Switch>
      }
    </BrowserRouter>
  );
}

export default App;
