import React from 'react'
import PropTypes from 'prop-types'
import { compose, setPropTypes, mapProps } from 'recompose'
import { withRouter } from 'react-router-dom'
import { ArchiveWarning } from '~/components/misc'
import { DateElement } from '~/components/time'
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import format from 'date-fns/format'
import isToday from 'date-fns/is_today'

function createLink(region, date, isArchivesPage) {
    const paths = ['/forecasts']

    if (isArchivesPage) {
        paths.push('archives')
    }

    paths.push(region)

    if (!isToday(date)) {
        paths.push(format(date, 'YYYY-MM-DD'))
    }

    return paths.join('/')
}

export default compose(
    withRouter,
    setPropTypes({
        region: PropTypes.string.isRequired,
    }),
    mapProps(props => {
        const { region, date, match } = props
        const isArchivesPage = match.url === createLink(region, date, true)
        const previous = subDays(date, 1)
        const next = addDays(date, 1)

        return {
            children: 'This is an archived avalanche bulletin',
            nowcast: {
                to: `/forecasts/${region}`,
                children: "Read today's bulletin",
            },
            previous: {
                to: createLink(region, previous, isArchivesPage),
                children: <DateElement value={previous} />,
            },
            next: {
                to: createLink(region, next, isArchivesPage),
                children: <DateElement value={next} />,
            },
        }
    })
)(ArchiveWarning)
