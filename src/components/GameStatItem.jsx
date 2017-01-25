import React from 'react';

import styles from './GameStatItem.less';

export default props => {
    const { label, stat } = props;

    return (
        <div className={styles.base}>
            <div className={styles.stat}>{stat}</div>
            <div className={styles.label}>{label}</div>
        </div>
    );
};
