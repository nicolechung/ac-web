import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import {InnerHTML} from 'components/misc'
import Panel, {INVERSE} from 'components/panel'
import {Term} from 'components/description'
import Comment from 'components/mountainInformationNetwork/Comment'
import Section from 'components/mountainInformationNetwork/Section'
import styles from './HotZoneReport.css'
import AdviceText from './AdviceText'

const Headers = new Map([
    ['goodTerrainChoices', 'Good Terrain Choices'],
    ['terrainToWatch', 'Terrain to Watch'],
    ['terrainToAvoid', 'Terrain to Avoid'],
])

function createItem({feature, where, elevation}) {
    return [feature, where, elevation].join(' ')
}

TerrainAdviceSet.propTypes = {
    report: PropTypes.object.isRequired,
}

function TerrainAdviceSet({report}) {
    if (!report) {
        return null
    }

    const keys = Array.from(Headers.keys()).filter(key => Boolean(report[key]))

    return (
        <Panel header='Terrain Advice' expanded expandable theme={INVERSE}>
            <AdviceText />
            {keys.map(key => {
                const items = report[key].map(createItem)
                const comment = report[`${key}Comment`]

                return (
                    <div styleName='AdviceSection'>
                        <Section title={Headers.get(key)}>
                            <ul styleName='AdviceSet'>
                                {items.map(item =>
                                    <li styleName='Advice'>
                                        {item}
                                    </li>
                                )}
                            </ul>
                        </Section>
                        {comment &&
                            <Comment>
                                <InnerHTML>
                                    {comment}
                                </InnerHTML>
                            </Comment>
                        }
                    </div>
                )
            })}
        </Panel>
    )
}

export default CSSModules(TerrainAdviceSet, styles)