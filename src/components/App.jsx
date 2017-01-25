import React from 'react';

import Emoji from './Emoji.jsx';

import styles from './App.less';

export default props => (
    <div className={styles.base}>
        <h1>
            <Emoji type="collision" />
        </h1>
        {props.children}
    </div>
);
