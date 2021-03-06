import React, { Component, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import CSSModules from 'react-css-modules'
import Overlay from 'react-overlays/lib/Overlay'
import Tooltip from './Tooltip'
import styles from './Tooltip.css'

@CSSModules(styles)
export default class Wrapper extends Component {
    static propTypes = {
        placement: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
        children: PropTypes.node.isRequired,
        tooltip: PropTypes.node.isRequired,
        trigger: PropTypes.oneOf(['hover', 'click']),
    }
    static defaultProps = {
        placement: 'top',
        trigger: 'hover',
    }
    state = {
        visible: false,
    }
    get visible() {
        return this.state.visible
    }
    set visible(visible) {
        this.setState({ visible })
    }
    show = () => (this.visible = true)
    hide = () => (this.visible = false)
    toggle = () => (this.visible = !this.visible)
    // TODO: Remove target function! I do not think it is required
    target = () => findDOMNode(this.refs.target)
    render() {
        const { children, placement, tooltip, trigger, ...props } = this.props
        const events = trigger === 'hover'
            ? {
                onMouseOver: this.show,
                onMouseOut: this.hide,
            }
            : {
                onClick: this.toggle,
            }

        return (
            <div styleName="Wrapper">
                {cloneElement(children, {
                    ref: 'target',
                    ...events,
                })}
                <Overlay
                    show={this.visible}
                    container={document.body}
                    target={this.target}
                    placement={placement}>
                    <Tooltip placement={placement} {...props}>
                        {tooltip}
                    </Tooltip>
                </Overlay>
            </div>
        )
    }
}
