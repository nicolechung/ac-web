import React, {PropTypes, createElement} from 'react'
import CSSModules from 'react-css-modules'
import {TabSet, Tab} from 'components/tab'
import Synopsis from './tabs/Synopsis'
import Day1 from './tabs/Day1'
import Day2 from './tabs/Day2'
import SliceSet from './tabs/SliceSet'
import Section from './tabs/Section'
import styles from './Forecast.css'
import Legacy from './legacy'

Forecast.propTypes = {
    forecast: PropTypes.object.isRequired,
}

const TABS = new Map([
	['synopsis', {
        title: 'Synopsis',
        component: Synopsis,
    }],
	['day1', {
        title: 'Day 1',
        component: Day1,
    }],
	['day2', {
        title: 'Day 2',
        component: Day2,
    }],
	['day3To4', {
        title: 'Day 3-4',
        component: Section,
    }],
	['day5To7', {
        title: 'Day 5-7',
        component: Section,
    }],
])

function Forecast({forecast}) {
    const {type, date, headline} = forecast
    let children = null

    if (type === 'weather-forecast') {
        children = <Legacy forecast={forecast} />
    } else {
        children = (
            <TabSet>
                {[...TABS].map(([name, {title, component}]) => {
                    const group = forecast[name]
                    const slices = forecast[`${name}More`] || group

                    if (!group && !slices) {
                        return null
                    }

                    const child = <SliceSet slices={slices} />
                    const props = {
                        ...group[0],
                        date,
                    }

                    return (
                        <Tab key={name} title={title}>
                            {createElement(component, props, child)}
                        </Tab>
                    )
                })}
            </TabSet>
        )
    }

	return (
		<section styleName='Container'>
            <h2 styleName='Headline'>{headline}</h2>
            {children}
		</section>
	)
}

export default CSSModules(Forecast, styles)