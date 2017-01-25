import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getGameStartTime } from '../selectors';

import GameStatItem from '../components/GameStatItem.jsx';

@connect(mapStateToProps)
export default class GameTimer extends Component {
    componentDidMount() {
        this.timer = setInterval(() => this.forceUpdate(), 500);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { startTime } = this.props;
        const timeInSeconds = Math.round((Date.now() - startTime) / 1000);

        return <GameStatItem stat={timeInSeconds} label="Seconds" />;
    }
}

function mapStateToProps(state, ownProps) {
    return {
        startTime: getGameStartTime(state)
    };
}
