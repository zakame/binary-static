import PropTypes from 'prop-types';
import React     from 'react';

const IconRedDot = ({ className }) => (
    <svg className={className} width='4' height='4' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='1163' cy='626' r='2' transform='translate(-1161 -624)' fill='#E31C4B' fillRule='nonzero' />
    </svg>
);

IconRedDot.propTypes = {
    className: PropTypes.string,
};

export { IconRedDot };
