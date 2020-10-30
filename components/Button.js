import React from "react";

const Button = ( { children, ...props } ) => (
    <React.Fragment>
        <button { ...props }>
            { children }
        </button>

        <style jsx>{`
        button {
            height: 90px;
            // background-color: red;
        }
        button.active {
            background-color: green;
            color: white;
        }
        `}</style>
    </React.Fragment>
);

export default Button;