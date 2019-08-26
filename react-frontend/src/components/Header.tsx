/** @jsx jsx */
import Color from "color";
import { FC, ReactNode, MouseEventHandler } from "react";
import PropTypes from "prop-types";

import { css, jsx } from "@emotion/core";

import { LargeText } from "styles/Text";

interface HeaderProps {
    backgroundColor?: string;
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLSpanElement>;
}
const Header: FC<HeaderProps> = ({
    backgroundColor = "#6100EF",
    children,
    onClick
}) => (
    <header
        css={css`
            background-color: ${backgroundColor};
            color: ${Color(backgroundColor).isDark() ? "white" : "black"};
            padding: 10px;
            ${LargeText};
        `}
    >
        <b
            css={css`
                cursor: ${onClick ? "pointer" : "default"};
            `}
            onClick={onClick}
        >
            {children}
        </b>
    </header>
);
Header.propTypes = {
    backgroundColor: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func
};

export default Header;
