import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getMinesLeftCount } from '../selectors';

import GameStatItem from '../components/GameStatItem.jsx';

export default connect(mapStateToProps)(GameStatItem);

function mapStateToProps(state, ownProps) {
    return {
        stat: getMinesLeftCount(state),
        label: 'Mines left'
    };
}
