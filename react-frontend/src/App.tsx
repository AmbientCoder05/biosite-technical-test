import React, { FC } from "react";
import { Provider } from "react-redux";
import { hot } from "react-hot-loader/root";

import { css, Global } from "@emotion/core";

import Routes from "./routes";

import store from "store";

const App: FC = () => (
    <Provider store={store}>
        <Global
            styles={css`
                body {
                    font-family: "Roboto", sans-serif;
                    margin: 0;
                    background-color: #f4f4f4;
                }
            `}
        />
        <Routes />
    </Provider>
);

export default hot(App);
