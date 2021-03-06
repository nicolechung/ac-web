import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Br.css'

Br.propTypes = {
    ribbon: PropTypes.bool,
}

function Br({ ribbon }) {
    return <div styleName={ribbon ? 'Ribbon' : 'Main'} />
}

export default CSSModules(Br, styles)
