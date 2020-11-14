import React from 'react';

const Error = ({ error }) => {
    return error ? (
        <div data-testid="error" className="error-popup">
            <h4>Error</h4>
            { error.message }
            <style jsx>{`
                .error-popup {
                    background-color: white;
                    margin: auto;
                    padding: 20px;
                    border: 1px solid;
                    border-radius: 8px;
                }
            `}</style>
        </div>
    ) : null;
}

export default Error;