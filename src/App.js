import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import HomeLayout from "./components/layout/home";
import AuthenticationView from "./components/views/auth";
import GroupsView from "./components/views/groups";
import { authentication } from "./store";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authentication.value)
  useEffect(() => {
    authentication.subscribe(setIsAuthenticated)
  }, [])

  return (
    <BrowserRouter>
      {
        isAuthenticated ? <HomeLayout>
          <Switch>
            <Route path="/r2" exact render={function() {
              return <div>
                <Link to="/">Route 1</Link>
              </div>
            }}></Route>
            <Route path="/" exact><GroupsView /></Route>
          </Switch>
        </HomeLayout> : <Switch>
          <Route path="/" component={AuthenticationView} />
        </Switch>
      }
    </BrowserRouter>
  );
}

export default App;
