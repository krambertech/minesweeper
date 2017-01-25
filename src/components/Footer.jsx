import React from 'react';

import MinesLeftCount from '../containers/MinesLeftCount.jsx';
import MovesCount from '../containers/MovesCount.jsx';
import GameTimer from '../containers/GameTimer.jsx';

import styles from './Footer.less';

export default props => {
    const { status, mapper } = props;

    return (
        <div className={styles.base}>
            <MinesLeftCount />
            <MovesCount />
            <GameTimer />
        </div>
    );
};
