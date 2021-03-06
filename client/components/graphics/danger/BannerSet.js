import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { withState } from 'recompose'

BannerSet.propTypes = {
    showTravelAdvice: PropTypes.bool,
    expandable: PropTypes.bool,
    expanded: PropTypes.bool,
    setExpanded: PropTypes.func,
    children: PropTypes.number,
}

function BannerSet({
    children,
    showTravelAdvice = false,
    expanded,
    setExpanded,
    expandable = false,
}) {
    return (
        <g>
            {Children.toArray(children).map((banner, index) =>
                cloneElement(banner, {
                    ...banner.props,
                    showTravelAdvice,
                    expandable,
                    onExpandClick: () =>
                        setExpanded(expanded === index ? null : index),
                    expanded: expanded === index,
                })
            )}
        </g>
    )
}

export default withState('expanded', 'setExpanded', null)(BannerSet)
