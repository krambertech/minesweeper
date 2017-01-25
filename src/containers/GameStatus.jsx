import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getGameStatus } from '../selectors';

import EmojiStatus from '../components/EmojiStatus.jsx';

const statusEmojis = {
    'LOOSER': 'dizzy-face',
    'WINNER': 'sunglasses',
    'PLAYING': 'smiley'
};

export default connect(
    mapStateToProps,
)(EmojiStatus);

function mapStateToProps(state) {
    return {
        status: getGameStatus(state),
        mapper: statusEmojis,
    };
}
