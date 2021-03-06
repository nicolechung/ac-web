import React from 'react'
import { compose, withHandlers, withState } from 'recompose'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './P.css'

P.propTypes = {
    children: PropTypes.string.isRequired,
    capAt: PropTypes.number,
    title: PropTypes.string,
}

function P({ children = '', capAt = Infinity, title, ...props }) {
    const capped = children.length > capAt
    const styleName = capped ? 'Capped' : null

    title = capped ? 'Click to read more' : title
    children = capped ? children.substr(0, capAt) : children

    return (
        <p styleName={styleName} {...props}>
            {children}
        </p>
    )
}

export default compose(
    withState('capAt', 'setCapAt', props => props.capAt),
    withHandlers({
        onClick: props => event => {
            event.preventDefault()

            props.setCapAt(Infinity)
        },
    }),
    CSSModules(styles)
)(P)
