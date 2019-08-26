import React, { FC } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Layout from "containers/Layout";

import CreateUser from "./CreateUser";
import Home from "./Home";

const AppRouter: FC = () => (
    <Router>
        <Layout>
            <Route path="/" component={Home} exact={true} />
            <Route path="/create" component={CreateUser} />
        </Layout>
    </Router>
);

export default AppRouter;
