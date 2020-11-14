import React from "react";

export default ( { isShowing } ) => isShowing ? (
    <div data-testid="loader">
        Loading...
    </div>
) : null;