import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './MultiColumnLayout.css'
import {InnerHTML} from '~/components/misc'

MultiColumnLayout.propTypes = {
    // TODO: Create appropriate propType
    content: PropTypes.arrayOf(PropTypes.string).isRequired,
}

function MultiColumnLayout({content = []}) {
    return (
        <div styleName='ColumnSet'>
            {content.map(({content}, index) => (
                <InnerHTML key={index}>
                    {content}
                </InnerHTML>
            ))}
        </div>
    )
}

export default CSSModules(MultiColumnLayout, styles)