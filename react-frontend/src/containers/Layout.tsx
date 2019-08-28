import React, { FC, ReactNode, Fragment } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import PropTypes from "prop-types";

import { SnackbarType, removeSnackbarMessage } from "store/actionCreators";
import { RootState } from "store/reducers";

import Header from "components/Header";
import Snackbar from "components/Snackbar";

const mapDispatchToProps = {
    removeSnackbarMessage
};
const mapStateToProps = ({
    snackbar: { display, message, type }
}: RootState) => ({
    displaySnackbar: display,
    snackbarMessage: message,
    snackbarType: type
});

interface LayoutProps extends RouteComponentProps {
    children?: ReactNode;
    displaySnackbar: boolean;
    snackbarMessage: string;
    snackbarType: SnackbarType;
    removeSnackbarMessage: () => void;
}
const Layout: FC<LayoutProps> = ({
    children,
    displaySnackbar,
    history,
    snackbarMessage,
    snackbarType,
    removeSnackbarMessage
}) => {
    return (
        <Fragment>
            <Header onClick={() => history.push("/")}>Users List</Header>
            {children}
            {displaySnackbar ? (
                <Snackbar onTimeout={removeSnackbarMessage} type={snackbarType}>
                    {snackbarMessage}
                </Snackbar>
            ) : (
                ""
            )}
        </Fragment>
    );
};
Layout.propTypes = {
    children: PropTypes.node,
    displaySnackbar: PropTypes.bool.isRequired,
    history: PropTypes.any.isRequired,
    snackbarMessage: PropTypes.string.isRequired,
    snackbarType: PropTypes.oneOf<SnackbarType>(["success", "error"])
        .isRequired,
    removeSnackbarMessage: PropTypes.func.isRequired
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Layout)
);
