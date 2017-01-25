import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import GameBoard from './GameBoard.jsx';
import GameStatus from './GameStatus.jsx';

import Footer from '../components/Footer.jsx';

@connect(
    null,
    actions
)
export default class GamePage extends Component {
    componentDidMount() {
        this.props.startGame();
    }

    render() {
        return (
            <div>
                <GameStatus />
                <GameBoard />
                <Footer />
            </div>
        );
    }
}
