import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Page.css'

ArticleHeader.propTypes = {
    children: PropTypes.string.isRequired,
}

// TODO: header tag should not be used in that case

function ArticleHeader({ children }) {
    return (
        <header styleName="ArticleHeader">
            <h2>{children}</h2>
        </header>
    )
}

export default CSSModules(ArticleHeader, styles)
