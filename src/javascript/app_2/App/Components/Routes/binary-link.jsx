import PropTypes       from 'prop-types';
import React           from 'react';
import { NavLink }     from 'react-router-dom';
import {
    findRouteByPath,
    normalizePath }    from './helpers';
import getRoutesConfig from '../../Constants/routes-config';

// TODO: solve circular dependency problem
// when binary link is imported into components present in routes config
// or into their descendants
const BinaryLink = ({ active_class, to, children, ...props }) => {
    const path  = normalizePath(to);
    const route = findRouteByPath(path, getRoutesConfig());

    if (!route) {
        throw new Error(`Route not found: ${to}`);
    }

    return (
        to ?
            <NavLink to={path} activeClassName={active_class || 'active'} exact={route.exact} {...props}>
                {children}
            </NavLink>
            :
            <a href='javascript:;' {...props}>
                {children}
            </a>
    );
};

BinaryLink.propTypes = {
    active_class: PropTypes.string,
    children    : PropTypes.object,
    to          : PropTypes.string,
};

export default BinaryLink;
