import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'
import SIDE, { LEFT, RIGHT } from './constants/sides'

function computeDrawerStyle(position, width) {
    const transform = `translateX(${position * 100}%)`

    return {
        transform,
        WebkitTransform: transform,
        width,
    }
}

const STYLE_NAMES = new Map([[LEFT, 'Drawer--Left'], [RIGHT, 'Drawer--Right']])

Drawer.propTypes = {
    side: PropTypes.oneOf([LEFT, RIGHT]).isRequired,
    open: PropTypes.bool.isRequired,
    position: PropTypes.number.isRequired,
    width: PropTypes.number,
    children: PropTypes.node.isRequired,
}

function Drawer({ side = SIDE, open, position, width, children }) {
    let styleName = STYLE_NAMES.get(side)

    if (open) {
        styleName += ' Open'
    }

    return (
        <div style={computeDrawerStyle(position, width)} styleName={styleName}>
            {children}
        </div>
    )
}

export default CSSModules(Drawer, styles, { allowMultiple: true })
