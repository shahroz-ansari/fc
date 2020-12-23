import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthenticationView from "./components/views/auth";
import { authentication } from "./store";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authentication.value)
  useEffect(() => {
    authentication.subscribe(setIsAuthenticated)
  }, [])

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
