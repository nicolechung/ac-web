import React from 'react'
import PropTypes from 'prop-types'
import { compose, onlyUpdateForKeys } from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Navbar.css'
import noop from 'lodash/noop'

const NOWRAP_STYLE = {
    whiteSpace: 'nowrap',
}

Item.propTypes = {
    title: PropTypes.node.isRequired,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    noWrap: PropTypes.bool,
    children: PropTypes.node,
}

function Item({
    isActive = false,
    title,
    onClick = noop,
    noWrap = false,
    children,
}) {
    const style = noWrap ? NOWRAP_STYLE : null
    const styleName = isActive ? 'Item--active' : 'Item'

    return (
        <li style={style} styleName={styleName}>
            <a href="#" onClick={onClick}>
                <span>{title}</span>
            </a>
            {children}
        </li>
    )
}

export default compose(
    onlyUpdateForKeys(['isActive', 'children']),
    CSSModules(styles)
)(Item)
