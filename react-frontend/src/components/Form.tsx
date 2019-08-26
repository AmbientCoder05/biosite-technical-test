/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { FC, ReactNode, FormEventHandler } from "react";
import PropTypes from "prop-types";

import { LargeText } from "styles/Text";

interface FormProps {
    children?: ReactNode;
    onSubmit?: FormEventHandler;
    title?: string;
}
const Form: FC<FormProps> = ({ children, onSubmit, title }) => (
    <form
        css={css`
            padding: 10px;
            display: grid;
            grid-gap: 10px;
            grid-template-columns: minmax(min-content, max-content);
            justify-content: center;
            button {
                justify-self: center;
            }
        `}
        onSubmit={onSubmit}
    >
        {title ? (
            <h2
                css={css`
                    ${LargeText};
                    text-align: center;
                    padding: 10px 0;
                `}
            >
                {title}
            </h2>
        ) : (
            ""
        )}
        {children}
    </form>
);
Form.propTypes = {
    children: PropTypes.node,
    onSubmit: PropTypes.func,
    title: PropTypes.string
};

export default Form;
