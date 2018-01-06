import PropTypes from 'prop-types';
import React from 'react';

// We don't use class syntax for this component
// since this is a stateless presentation component

function Question(props) {
    return (
        <h2 className="question">{props.content}</h2>
    );
}

Question.propTypes = {
    content: PropTypes.string.isRequired
};

export default Question;