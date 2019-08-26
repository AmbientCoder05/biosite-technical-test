import React, { FC, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { createUser, setSnackbarMessage } from "store/actionCreators";

import Button from "components/Button";
import Form from "components/Form";
import Input from "components/Input";

const mapDispatchToProps = {
    setSnackbarMessage
};

interface CreateUserProps extends RouteComponentProps {
    setSnackbarMessage: typeof setSnackbarMessage;
}
const CreateUserPage: FC<CreateUserProps> = ({
    history,
    setSnackbarMessage
}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    return (
        <Form
            title="User Form"
            onSubmit={async e => {
                e.preventDefault();
                try {
                    await createUser({ firstName, lastName });
                    setSnackbarMessage({
                        message: "Successfully created new user!",
                        type: "success"
                    });
                    history.push("/");
                } catch (err) {
                    setSnackbarMessage({
                        message: err.message,
                        type: "error"
                    });
                }
            }}
        >
            <Input
                label="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                icon="person"
            />
            <Input
                label="Surname"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                icon="person"
            />
            <Button type="submit">Create</Button>
        </Form>
    );
};
CreateUserPage.propTypes = {
    history: PropTypes.any.isRequired,
    setSnackbarMessage: PropTypes.func.isRequired
};

export default connect(
    null,
    mapDispatchToProps
)(withRouter(CreateUserPage));
