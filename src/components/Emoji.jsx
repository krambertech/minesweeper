import React from 'react';
import twemoji from 'twemoji';

export default props => {

    return (
        <i className={`twa twa-${props.type}`} />
    );
};
