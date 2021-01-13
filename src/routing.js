import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import HomeLayout from "./components/layout/home";

import AuthenticationView from "./components/views/auth";
import GroupsView from "./components/views/groups";
import CreateGroup from "./components/views/createGroup";
import AddMember from "./components/views/addMember";

function Routing({ authenticated }) {

  return (
    <BrowserRouter>
      {
        authenticated ? <HomeLayout>
          <Switch>
            <Route path="/" exact><Redirect to="/groups" /></Route>

            <Route path="/groups" exact component={GroupsView} />
            <Route path="/invitations" exact render={() => 'In Progress...'} />
            <Route path="/groups/create" exact component={CreateGroup} />
            <Route path="/groups/addMember" exact component={AddMember} />
          </Switch>
        </HomeLayout> : <Switch>
          <Route path="/" component={AuthenticationView} />
        </Switch>
      }
    </BrowserRouter>
  );
}

export default Routing;
