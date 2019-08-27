/** @jsx jsx */
import Color from "color";
import { css, jsx } from "@emotion/core";
import { FC, ReactNode, useState } from "react";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";

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
    const [display, setDisplay] = useState(true);
    const hide: Function = () => setDisplay(false);

    const bg = backgroundColor ? backgroundColor : backgroundColors[type];
    return (
        <Transition
            in={display}
            timeout={500}
            appear
            unmountOnExit
            onExited={() => {
                if (onTimeout) {
                    onTimeout();
                }
            }}
        >
            {state => {
                const timeout = onTimeout ? setTimeout(hide, timer) : 0;
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
                            opacity: ${state === "entered" ? 1 : 0};
                            transition: opacity 500ms;
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
                                    hide();
                                }
                            }}
                        >
                            Dismiss
                        </Button>
                    </div>
                );
            }}
        </Transition>
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
