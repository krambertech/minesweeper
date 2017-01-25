import React from 'react';

import Emoji from './Emoji.jsx';

import styles from './EmojiStatus.less';

export default props => {
    const { status, mapper } = props;

    return (
        <div className={styles.base}>
            <Emoji type={mapper[status]} />
        </div>
    );
};
