/** @jsx jsx */
import Color from "color";
import { css, jsx } from "@emotion/core";
import { FC, ReactNode } from "react";
import PropTypes from "prop-types";

import Button from "components/Button";

const backgroundColors = {
    success: "#4CAF4F",
    error: "#af4f4c"
};

interface SnackbarProps {
    backgroundColor?: string;
    children?: ReactNode;
    onTimeout?: Function;
    timer?: number;
    type?: "error" | "success";
}
const Snackbar: FC<SnackbarProps> = ({
    backgroundColor,
    children,
    onTimeout,
    timer = 5000,
    type = "success"
}) => {
    const timeout = onTimeout ? setTimeout(onTimeout, timer) : 0;
    const bg = backgroundColor ? backgroundColor : backgroundColors[type];
    return (
        <div
            css={css`
                position: absolute;
                left: 50%;
                bottom: 20px;
                transform: translateX(-50%);
                text-align: center;
                display: inline-block;
                background-color: ${bg};
                color: ${Color(bg).isDark() ? "white" : "black"};
                padding: 15px;
                border-radius: 5px;
            `}
        >
            <span
                css={css`
                    margin-right: 20px;
                `}
            >
                {children}
            </span>
            <Button
                transparent
                onClick={() => {
                    if (onTimeout) {
                        clearTimeout(timeout);
                        onTimeout();
                    }
                }}
            >
                Dismiss
            </Button>
        </div>
    );
};
Snackbar.propTypes = {
    backgroundColor: PropTypes.string,
    children: PropTypes.node,
    onTimeout: PropTypes.func,
    timer: PropTypes.number,
    type: PropTypes.oneOf(["success", "error"])
};

export default Snackbar;
