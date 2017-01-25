import { fromJS } from 'immutable';

import { startGame, defaultGameState, revealTile, flagTile } from '../utils/minesweeper';

import {
    START_GAME,
    TOGGLE_FLAGGED_TILE,
    REVEAL_TILE,
} from '../actions';

export default (state = defaultGameState, action) => {
    switch (action.type) {
        case START_GAME: {
            const { rows, cols, mines } = action;

            return startGame({ rows, cols, mines });
        }

        case REVEAL_TILE: {
            return revealTile(state, action.tileId);
        }

        case TOGGLE_FLAGGED_TILE: {
            return flagTile(state, action.tileId);
        }

        default: {
            return state;
        }
    }
}
