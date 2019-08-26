/** @jsx jsx */
import Color from "color";
import { css, jsx } from "@emotion/core";
import { FC, ChangeEventHandler } from "react";
import PropTypes from "prop-types";

interface InputProps {
    backgroundColor?: string;
    icon?: string;
    label?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
    type?: "button" | "submit" | "reset";
    value: string;
}
const Input: FC<InputProps> = ({
    backgroundColor = "#6200ee",
    icon,
    label,
    onChange,
    placeholder,
    type = "text",
    value
}) => (
    <div
        css={css`
            background-color: ${backgroundColor};
            display: flex;
            flex-wrap: wrap;
            border-radius: 5px;
            color: ${Color(backgroundColor).isDark() ? "white" : "black"};
            padding: 5px 10px;
            box-sizing: border-box;
        `}
    >
        <div
            css={css`
                display: flex;
                align-items: center;
            `}
        >
            <i className="material-icons">{icon}</i>
            <label
                htmlFor={label}
                css={css`
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    padding-left: 5px;
                `}
            >
                {label}
            </label>
        </div>
        <div
            css={css`
                display: flex;
                align-items: center;
                flex: 1;
            `}
        >
            <input
                type={type}
                name={label}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                css={css`
                    border: 0;
                    padding: 10px 0 10px 5px;
                    background-color: transparent;
                    color: white;
                    letter-spacing: 2px;
                    flex: 1;
                    direction: rtl;
                    ::-webkit-inner-spin-button,
                    ::-webkit-outer-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                    :focus {
                        outline: none;
                    }
                    ::-webkit-input-placeholder {
                        color: white;
                        opacity: 0.7;
                    }
                `}
            />
        </div>
    </div>
);
Input.propTypes = {
    backgroundColor: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    value: PropTypes.string.isRequired
};

export default Input;
