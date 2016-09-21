import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'
import ItemSet from './ItemSet'

function K() {}

Drawer.propTypes = {
    header: PropTypes.string,
    onHome: PropTypes.func,
    onClose: PropTypes.func,
    onClick: PropTypes.func,
    style: PropTypes.object,
    children: PropTypes.node.isRequired,
}

function Drawer({header, onClick = K, onHome = K, onClose = K, style = null, children}) {
    function handleClick(event) {
        const { target, currentTarget } = event

        if (target !== currentTarget) {
            return
        }

        onClick(event)
    }

    return (
        <nav style={style} styleName='Drawer' onClick={handleClick}>
            <section styleName='Toolbar'>
                <a href='#' onClick={onHome} styleName='Home' title='Go to home page' />
                <a href='#' onClick={onClose} styleName='Close' title='Close' />
            </section>
            {children}
        </nav>
    )
}

export default CSSModules(Drawer, styles)