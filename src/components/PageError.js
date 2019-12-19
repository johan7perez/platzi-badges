import React from 'react';

import "./styles/Loader.css";

function PageError(props) {
    return <div className="PageError">
        <span role="img"
        aria-label="emoji">🤦‍♂️🤦‍♂️</span>
        {props.error.message}
    </div>
}

export default PageError;