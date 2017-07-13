import React from 'react'
import PropTypes from 'prop-types'
import { DateElement } from '~/components/misc'
import CSSModules from 'react-css-modules'
import styles from './Application.css'

Feature.propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
}

function Feature({ name, headline, date, children }) {
    return (
        <section styleName="Feature">
            <header>
                <h2>{name}</h2>
                <DateElement value={date} />
                <div styleName="Feature--Headline">{headline}</div>
            </header>
            {children}
        </section>
    )
}

export default CSSModules(Feature, styles)
