import React from 'react'
import PropTypes from 'prop-types'
import { compose, setDisplayName, setPropTypes, mapProps } from 'recompose'
import CSSModules from 'react-css-modules'
import { ChevronLeft, ChevronRight } from '~/components/icons'
import Button from '../button'
import styles from './Flipper.css'
import noop from 'lodash/noop'

const LEFT = 'Left'
const RIGHT = 'Right'

const icons = new Map([
    [LEFT, <ChevronLeft inverse />],
    [RIGHT, <ChevronRight inverse />],
])
const hints = new Map([[LEFT, 'Previous'], [RIGHT, 'Next']])

Segment.propTypes = {
    position: PropTypes.oneOf([LEFT, RIGHT]).isRequired,
    onNavigate: PropTypes.func,
    hint: PropTypes.string,
    hidden: PropTypes.bool,
    children: PropTypes.node.isRequired,
}

function Segment({
    position,
    onNavigate = noop,
    hint = hints.get(position),
    hidden = false,
    children,
}) {
    return (
        <div styleName={`${position}${hidden ? '--hidden' : ''}`}>
            <div styleName="Navigation">
                <Button onClick={onNavigate}>
                    {icons.get(position)}
                </Button>
            </div>
            <div styleName="Description">
                <div styleName="Hint">
                    {hint}
                </div>
                {children}
            </div>
        </div>
    )
}

const propTypes = {
    onNavigate: PropTypes.func.isRequired,
    hint: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
}

function segment(position) {
    return compose(
        setDisplayName(position),
        setPropTypes(propTypes),
        mapProps(props => ({ ...props, position }))
    )(CSSModules(Segment, styles))
}

export const Left = segment(LEFT)
export const Right = segment(RIGHT)
export const Center = CSSModules(Middle, styles)

Middle.propTypes = {
    children: PropTypes.node.isRequired,
}

function Middle({ children }) {
    return (
        <div styleName="Center">
            {children}
        </div>
    )
}
