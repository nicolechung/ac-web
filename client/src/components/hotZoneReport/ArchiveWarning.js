import React, {PropTypes} from 'react'
import {compose, setPropTypes, mapProps, branch, renderNothing} from 'recompose'
import {ArchiveWarning} from 'components/misc'
import {isHotZoneReportValid} from 'prismic/utils'

export default compose(
    setPropTypes({
        report: PropTypes.object,
        previous: PropTypes.string,
        next: PropTypes.string,
    }),
    branch(
        props => !props.report || isHotZoneReportValid(props.report),
        renderNothing,
    ),
    mapProps(({report, previous, next}) => {
        const props = {
            children: 'This is an archived HotZone report',
            nowcast: {
                to: `/hot-zone-reports/${report.region}`,
                children: "Read today's report",
            },
        }

        if (previous) {
            Object.assign(props, {
                previous: {
                    to: `/hot-zone-reports/${report.region}/${previous.region}`,
                    children: previous.title,
                }
            })
        }

        if (next) {
            Object.assign(props, {
                next: {
                    to: `/hot-zone-reports/${report.region}/${next.region}`,
                    children: next.title,
                }
            })
        }

        return props
    })
)(ArchiveWarning)