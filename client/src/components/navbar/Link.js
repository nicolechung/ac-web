import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {Link} from 'react-router'
import styles from './Navbar.css'

const isExternalRegExp = new RegExp('^(https|http):\/\/')
function isExternal(to) {
    if (typeof to !== 'string') {
        return false
    }

    return isExternalRegExp.test(to)
}

Anchor.propTypes = {
    to: PropTypes.string
}

function Anchor({to = '#', children, ...props}) {
    if (isExternal(to)) {
        return (
            <a href={to} target='_blank' styleName='Link' {...props} >
                {children}
            </a>
        )
    }

    return (
        <Link styleName='Link' to={to} {...props}>
            {children}
        </Link>
    )
}

export default CSSModules(Anchor, styles)
