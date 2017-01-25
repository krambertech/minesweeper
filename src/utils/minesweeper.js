import { fromJS, Map, List } from 'immutable';

import repeat from './repeat';

export const defaultGameState = fromJS({
    board: [],
    cols: 4,
    rows: 6,
    mines: 10,
    moves: 0
});

const isTileOnWEdge = (game, tileId) => tileId % game.get('cols') === 0;

const isTileOnEEdge = (game, tileId) => tileId % game.get('cols') === game.get('cols') - 1;

export function getTileId(game, tileId) {
    if (tileId < 0) {
        return null;
    }

    if (tileId > game.get('cols') * game.get('rows') - 1) {
        return null;
    }

    return tileId;
}

const directions = new Map({
    n: (game, tileId) => getTileId(game, tileId - game.get('cols')),
    nw: (game, tileId) => isTileOnWEdge(game, tileId) ? null : getTileId(game, tileId - game.get('cols') - 1),
    ne: (game, tileId) => isTileOnEEdge(game, tileId) ? null : getTileId(game, tileId - game.get('cols') + 1),
    e: (game, tileId) => isTileOnEEdge(game, tileId) ? null : getTileId(game, tileId + 1),
    se: (game, tileId) => isTileOnEEdge(game, tileId) ? null : getTileId(game, tileId + game.get('cols') + 1),
    s: (game, tileId) => getTileId(game, tileId + game.get('cols')),
    sw: (game, tileId) => isTileOnWEdge(game, tileId) ? null : getTileId(game, tileId + game.get('cols') - 1),
    w: (game, tileId) => isTileOnWEdge(game, tileId) ? null : getTileId(game, tileId - 1),
});

export function getAdjacentTileIds(game, tileId) {
    return directions
        .map(direction => direction(game, tileId))
        .toList()
        .filter(id => id !== null);
}

export function getAdjacentTiles(game, tileId) {
    return getAdjacentTileIds(game, tileId)
        .map(id => game.getIn(['board', id]));
}

export function getMineCount(game, tileId) {
    return getAdjacentTiles(game, tileId)
        .filter(tile => tile.get('isMine'))
        .size;
}

export function addMineCounts(game) {
    const newBoard = game.get('board').map(tile =>
        tile.set('mineCount', getMineCount(game, tile.get('id')))
    );

    return game.set('board', newBoard);
}

export function generateBoard({ cols, rows, mines }) {
    const cell = new Map({ isRevealed: false, isFlagged: false });

    const safeCells = repeat(cols * rows - mines, cell);
    const mineCells = repeat(mines, cell.set('isMine', true));

    return safeCells
        .concat(mineCells)
        .sort(() => Math.random() - 0.5)
        .map((c, idx) => c.set('id', idx));
}

export function setTileRevealed(game, tileId) {
    return game.setIn(['board', tileId, 'isRevealed'], true);
}

export function startGame(params) {
    const game = fromJS({
        cols: params.cols,
        rows: params.rows,
        mines: params.mines,
        board: generateBoard(params),
        moves: 0,
        startedAt: Date.now(),
    });

    return addMineCounts(game);
}

export function revealAdjacentSafeTiles(game, tileId) {
    if (game.getIn(['board', tileId, 'isMine'])) {
        return game;
    }

    if (game.getIn(['board', tileId, 'mineCount']) === 0) {
        const adjacentTileIds = getAdjacentTileIds(game, tileId);

        return adjacentTileIds.reduce(
            (newGame, id) => {
                const isTileRevealed = game.getIn(['board', id, 'isRevealed']);

                return isTileRevealed
                    ? newGame
                    : revealAdjacentSafeTiles(newGame, id);
            },
            setTileRevealed(game, tileId),
        );
    }

    return setTileRevealed(game, tileId);
}

export function revealAllMines(game) {
    const newBoard = game.get('board').map(tile =>
        tile.get('isMine')
        ? tile.set('isRevealed', true)
        : tile
    );

    return game.set('board', newBoard);
}

export function revealTile(game, tileId) {
    const updatedGame = game
        .set('moves', game.get('moves') + 1)
        .setIn(['board', tileId, 'isRevealed'], true);

    return updatedGame.getIn(['board', tileId, 'isMine'])
        ? revealAllMines(updatedGame)
        : revealAdjacentSafeTiles(updatedGame, tileId);
}

export function flagTile(game, tileId) {
    return game.setIn(['board', tileId, 'isFlagged'], !game.getIn(['board', tileId, 'isFlagged']));
}
