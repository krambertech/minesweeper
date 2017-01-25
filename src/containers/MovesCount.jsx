import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getGameMoveCount } from '../selectors';

import GameStatItem from '../components/GameStatItem.jsx';

export default connect(mapStateToProps)(GameStatItem);

function mapStateToProps(state, ownProps) {
    return {
        stat: getGameMoveCount(state),
        label: 'Moves'
    };
}
