import PropTypes from 'prop-types';
import React from 'react';

function Result(props) {
    return (
        <div className="result">
            You prefer <strong>{props.quizResult}</strong>!
        </div>
    );
}

Result.propTypes = {
    quizResult: PropTypes.string.isRequired
};

export default Result;