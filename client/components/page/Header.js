import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Page.css'
import Sponsor from '~/layouts/Sponsor'

Header.propTypes = {
    title: PropTypes.node.isRequired,
    children: PropTypes.node,
}

function Header({ title, children }) {
    return (
        <header styleName="Header">
            <h1>
                {title}
            </h1>
            <Sponsor />
            {children}
        </header>
    )
}

export default CSSModules(Header, styles)
