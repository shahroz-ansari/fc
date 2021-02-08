import React, { useState, useEffect } from "react";

import Routing from './routing'

import { authentication } from "./store/authentication";
import { syncUpdateGroups } from "./store/db";
import { _groupsdb, _chatDb } from "./database";
import { _getGroupIds } from "./services/local";

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

  useEffect(() => {
    const groupSyncCallback = async () => {
      const groupIds = await _getGroupIds();
      groupIds && _chatDb.groupsToSync(groupIds);
    }
    const subscription = syncUpdateGroups.subscribe(groupSyncCallback)

    return () => {
      subscription.unsubscribe();
    }
  }, [])

  return (
    <Routing authenticated={isAuthenticated} />
  );
}

export default App;
