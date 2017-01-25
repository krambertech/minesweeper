import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import * as actions from '../actions';
import { getGameBoardView } from '../selectors';

import Board from '../components/Board.jsx';

@connect(
    mapStateToProps,
    actions
)
export default class GameBoard extends Component {
    render() {
        const { board, revealTile, toggleFlaggedTile } = this.props;

        return (
            <Board
                rows={board}
                onReveal={revealTile}
                onToggleFlagged={toggleFlaggedTile}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        board: getGameBoardView(state),
    };
}
