import React from "react";

const Button = ( { children, ...props } ) => (
    <React.Fragment>
        <button { ...props }>
            { children }
        </button>

        <style jsx>{`
        button {
            height: 90px;
            background-color: white;
            border: 1px solid;
            margin-right: 20px;
        }
        button.active {
            background-color: green;
            color: white;
        }
        `}</style>
    </React.Fragment>
);

export default Button;