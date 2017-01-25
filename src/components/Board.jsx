import React from 'react';

import Tile from './Tile.jsx';

import styles from './Board.less';

export default props => {
    const { rows, onReveal, onToggleFlagged } = props;

    return (
        <div className={styles.base}>
            {
                rows.map((row, idx) =>
                    <div key={idx} className={styles.row}>
                        {
                            row.map(tile =>
                                <Tile
                                    key={tile.get('id')}
                                    id={tile.get('id')}
                                    mineCount={tile.get('mineCount')}
                                    isMine={tile.get('isMine')}
                                    isRevealed={tile.get('isRevealed')}
                                    isFlagged={tile.get('isFlagged')}
                                    onReveal={onReveal}
                                    onToggleFlagged={onToggleFlagged}
                                />
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};
