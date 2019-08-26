/** @jsx jsx */
import { FC } from "react";
import PropTypes from "prop-types";

import { css, jsx } from "@emotion/core";

import { LargeText } from "styles/Text";

interface TableProps {
    data: { [key: string]: string }[];
    title?: string;
}
const Table: FC<TableProps> = ({ data, title }) => {
    const headers = Array.from(new Set(data.flatMap(row => Object.keys(row))));
    return (
        <div css={css``}>
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
            <table
                css={css`
                    background-color: white;
                    border-collapse: collapse;
                    border-radius: 5px;
                    margin: 10px auto;
                    th,
                    td {
                        padding: 10px;
                    }
                    thead > tr,
                    tbody > tr:not(:last-of-type) {
                        border: 1px solid rgba(0, 0, 0, 0.3);
                        border-width: 0 0 1px 0;
                    }
                    tbody > tr {
                        opacity: 0.7;
                    }
                `}
            >
                <thead>
                    <tr>
                        {headers.map(header => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i}>
                            {Object.values(row).map((column, j) => (
                                <td key={j}>{column}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Table.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.objectOf(PropTypes.string.isRequired).isRequired
    ).isRequired,
    title: PropTypes.string
};

export default Table;
