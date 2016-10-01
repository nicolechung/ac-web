import React, {PropTypes} from 'react'
import {compose, mapProps, setDisplayName, setPropTypes, shouldUpdate} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Navbar.css'
import Link from './Link'

export default compose(
    setDisplayName('Brand'),
    setPropTypes({
        isFoundation: PropTypes.bool
    }),
    shouldUpdate(() => false),
    mapProps(({isFoundation = false}) => ({
        to: isFoundation ? '/foundation' : '',
        title: isFoundation ? 'Avalanche Canada Foundation' : 'Avalanche Canada',
        styleName: isFoundation ? 'Brand--Foundation' : 'Brand'
    })),
    CSSModules(styles),
)(Link)
