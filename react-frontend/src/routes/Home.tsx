/** @jsx jsx */
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { css, jsx } from "@emotion/core";

import Button from "components/Button";
import Table from "components/Table";

import { fetchUsers, User } from "store/actionCreators";
import { RootState } from "store/reducers";

const mapStateToProps = ({ users: { users } }: RootState) => {
    return {
        users
    };
};

const mapDispatchToProps = {
    loadUsers: fetchUsers
};

interface HomePageProps extends RouteComponentProps {
    loadUsers: () => Promise<void>;
    users: User[];
}
const HomePage: FC<HomePageProps> = ({ loadUsers, history, users }) => {
    useEffect(() => {
        loadUsers();
    }, []);
    const data = users.map(user => ({
        "First Name": user.firstName,
        Surname: user.lastName
    }));
    return (
        <main
            css={css`
                margin: 10px;
                text-align: center;
            `}
        >
            <Table title="Users Table" data={data}></Table>
            <Button onClick={() => history.push("/create")}>Create User</Button>
        </main>
    );
};
HomePage.propTypes = {
    loadUsers: PropTypes.func.isRequired,
    history: PropTypes.any.isRequired,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            qualifications: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    type: PropTypes.string.isRequired,
                    uniqueId: PropTypes.string.isRequired,
                    expiry: PropTypes.string.isRequired
                }).isRequired
            ).isRequired
        }).isRequired
    ).isRequired
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(HomePage)
);
