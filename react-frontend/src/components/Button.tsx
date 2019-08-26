/** @jsx jsx */
import Color from "color";
import { FC, ReactNode, MouseEventHandler } from "react";
import PropTypes from "prop-types";

import { css, jsx, SerializedStyles } from "@emotion/core";
import styled from "@emotion/styled";

import { LargeText, MediumText, SmallText } from "styles/Text";

interface TransparentButtonProps {
    color: string;
}
const TransparentButton = styled.button<TransparentButtonProps>(
    ({ color }) => ({
        backgroundColor: "transparent",
        color,
        border: 0,
        ":hover": {
            color: Color(color)
                .lighten(0.3)
                .hex()
        }
    })
);

interface NormalButtonProps {
    backgroundColor: string;
}
const NormalButton = styled.button<NormalButtonProps>(
    ({ backgroundColor }) => ({
        backgroundColor,
        color: Color(backgroundColor).isDark() ? "white" : "black",
        border: "1px solid rgba(0, 0, 0, 0.3)",
        borderRadius: "5px",
        padding: "10px",
        ":hover": {
            backgroundColor: Color(backgroundColor)
                .lighten(0.3)
                .hex()
        }
    })
);

interface ButtonProps {
    backgroundColor?: string;
    color?: string;
    children?: ReactNode;
    css?: SerializedStyles;
    onClick?: MouseEventHandler;
    size?: "small" | "medium" | "large";
    transparent?: boolean;
    type?: "button" | "submit" | "reset";
}
const Button: FC<ButtonProps> = ({
    backgroundColor = "#6100EF",
    color = "#6100EF",
    children,
    css: customStyles,
    onClick,
    size = "small",
    transparent = false,
    type = "button"
}) => {
    const GlobalButtonStyles = css`
        font-family: "Roboto", sans-serif;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 1px;
        ${size === "small"
            ? SmallText
            : size === "large"
            ? LargeText
            : MediumText};
        :focus {
            outline: none;
        }
        ${customStyles};
    `;
    return transparent ? (
        <TransparentButton
            color={color}
            css={GlobalButtonStyles}
            onClick={onClick}
            type={type}
        >
            <b>{children}</b>
        </TransparentButton>
    ) : (
        <NormalButton
            backgroundColor={backgroundColor}
            css={GlobalButtonStyles}
            onClick={onClick}
            type={type}
        >
            <b>{children}</b>
        </NormalButton>
    );
};
Button.propTypes = {
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    children: PropTypes.node,
    css: PropTypes.any,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    transparent: PropTypes.bool
};

export default Button;
