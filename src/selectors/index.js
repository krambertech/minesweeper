import { fromJS, Map, List } from 'immutable';
import { createSelector } from 'reselect';

export const getGame = (state) => state.get('game');

export const getGameBoard = createSelector(
    getGame,
    game => game.get('board'),
);

export const getGameMineCount = createSelector(
    getGame,
    game => game.get('mines'),
);

export const getGameStartTime = createSelector(
    getGame,
    game => game.get('startedAt'),
);

export const getGameMoveCount = createSelector(
    getGame,
    game => game.get('moves'),
);

export const getGameCols = createSelector(
    getGame,
    game => game.get('cols'),
);

export const getGameRows = createSelector(
    getGame,
    game => game.get('rows'),
);

export const getMinesLeftCount = createSelector(
    getGameMineCount,
    getGameBoard,
    (mines, board) => mines - board.filter(tile => tile.get('isFlagged')).size,
);

export const getGameBoardView = createSelector(
    getGameBoard,
    getGameCols,
    (board, cols) => {
        return board.reduce((rows, tile) => {
            const rowIdx = Math.floor(tile.get('id') / cols);
            const row = rows.get(rowIdx);

            return row
                ? rows.set(rowIdx, row.push(tile))
                : rows.push(new List([tile]));
        }, new List());
    }
);

export const getGameStatus = createSelector(
    getGameBoard,
    getGameMineCount,
    (board, mineCount) => {
        const isWinner = board.reduce(
            (status, tile) => tile.get('isMine') ? status : status && tile.get('isRevealed'),
            true,
        );

        if (isWinner) {
            return 'WINNER';
        }

        const isLooser = board.reduce(
            (status, tile) => tile.get('isMine') ? status && tile.get('isRevealed') : status,
            true,
        );

        if (isLooser) {
            return 'LOOSER';
        }

        return 'PLAYING';
    }
);
