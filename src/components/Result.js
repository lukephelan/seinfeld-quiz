import PropTypes from 'prop-types';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function Result(props) {
    return (
        <ReactCSSTransitionGroup
            className="container result"
            component="div"
            transitionName="fade"
            transitionEnterTimeout={800}
            transitionLeaveTimeout={500}
            transitionAppear
            transitionAppearTimeout={500}
        >
            <div>
                You got <strong>{props.quizResult}</strong> out of <strong>{props.questionTotal}</strong>!
            </div>
        </ReactCSSTransitionGroup>
    );
}

Result.propTypes = {
    quizResult: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired
};

export default Result;