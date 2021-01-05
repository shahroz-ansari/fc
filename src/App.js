import React, { useState, useEffect } from "react";

import Routing from './routing'

import { authentication } from "./store/authentication";
import { _groupsdb } from "./database";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authentication.value)
  useEffect(() => {
    const authCallback = (authenticated) => {
      if (authenticated) {
        // initiating sync on authenticated
        _groupsdb.sync();

        // update local state
        setIsAuthenticated(true)
      }
    }
    const subscription = authentication.subscribe(authCallback)

    return () => {
      subscription.unsubscribe();
    }
  }, [])

  return (
    <Routing authenticated={isAuthenticated} />
  );
}

export default App;
