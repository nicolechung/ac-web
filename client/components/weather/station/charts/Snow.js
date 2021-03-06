import React from 'react'
import PropTypes from 'prop-types'
import {
    VictoryScatter,
    VictoryLine,
    VictoryTooltip,
    VictoryBar,
    VictoryAxis,
    VictoryContainer,
} from 'victory'
import { PRIMARY as SECONDARY_BLUE } from '~/constants/colors'
import { formatHours, barEvents, scatterEvents } from '../utils'
import format from 'date-fns/format'
import { setUTCOffset } from '~/utils/date'
import theme from './theme'
import range from 'lodash/range'
import { filterDataset, shouldShowGraph } from './filters'
import isFinite from 'lodash/isFinite'

const PRIMARY_BLUE = 'rgb(150, 186, 233)'

const STYLE = {
    parent: {
        boxSizing: 'border-box',
        display: 'block',
    },
    group: {
        height: 'auto',
        width: '100%',
        userSelect: 'none',
    },
    bar: {
        data: {
            fill: SECONDARY_BLUE,
            width: 12,
        },
    },
    line: {
        data: {
            stroke: PRIMARY_BLUE,
        },
    },
    scatter: {
        data: {
            stroke: PRIMARY_BLUE,
            fill: 'white',
            strokeWidth: 2,
        },
    },
    axis: {
        primary: {
            ...theme.axis.style,
            axis: {
                ...theme.axis.style.axis,
                stroke: PRIMARY_BLUE,
            },
            axisLabel: {
                ...theme.axis.style.axisLabel,
                fill: PRIMARY_BLUE,
                padding: 40,
            },
            ticks: {
                ...theme.axis.style.ticks,
                stroke: PRIMARY_BLUE,
            },
            tickLabels: {
                ...theme.axis.style.tickLabels,
                fill(t) {
                    if (t % 100 === 0) {
                        return PRIMARY_BLUE
                    } else {
                        return 'transparent'
                    }
                },
            },
            grid: {
                ...theme.axis.style.grid,
                strokeDasharray(t) {
                    if (t % 100 === 0) {
                        return theme.axis.style.grid.strokeDasharray
                    } else {
                        return '1, 5'
                    }
                },
            },
        },
        second: {
            ...theme.axis.style,
            axis: {
                ...theme.axis.style.axis,
                stroke: SECONDARY_BLUE,
            },
            axisLabel: {
                ...theme.axis.style.axisLabel,
                fill: SECONDARY_BLUE,
                padding: 20,
            },
            ticks: {
                ...theme.axis.style.ticks,
                stroke: SECONDARY_BLUE,
            },
            tickLabels: {
                ...theme.axis.style.tickLabels,
                fill: SECONDARY_BLUE,
            },
            grid: {
                ...theme.axis.style.grid,
                stroke: 'transparent',
            },
        },
    },
    tooltip: {
        ...theme.tooltip.style,
        zIndex: 10000,
    },
}

function getNewSnowLabels({ x, y, utcOffset }) {
    return `New snow: ${y} cm\n${format(setUTCOffset(x, utcOffset), 'dddd, MMMM D, HH[h]')}`
}

function getSnowHeightLabels({ x, y, utcOffset }) {
    return `Snow height: ${Math.round(y)} cm\n${format(setUTCOffset(x, utcOffset), 'dddd, MMMM D, HH[h]')}`
}

function computeSnowHeightDomain(data) {
    const max = data
        .map(m => m.snowHeight)
        .filter(isFinite)
        .reduce((max, m) => Math.max(max, m), 0)

    return [0, Math.max(Math.ceil(max / 100) * 100, 300)]
}

function computeNewSnowDomain(data) {
    const max = data
        .map(m => m.newSnow)
        .filter(isFinite)
        .reduce((max, m) => Math.max(max, m), 0)

    return [0, Math.max(Math.ceil(max / 5) * 5, 10)]
}
const DOMAIN_PADDING = {
    x: 25,
}

SnowHeight.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}

export default function SnowHeight({ data, min, max, width, height }) {
    const snowHeightDomain = computeSnowHeightDomain(data)
    const newSnowDomain = computeNewSnowDomain(data)
    const domain = [min, max]

    const showNewSnow = shouldShowGraph(data, 'newSnow')
    const showSnowHeight = shouldShowGraph(data, 'snowHeight')

    if (!showSnowHeight || !showNewSnow) {
        return null
    }

    const newSnow = filterDataset(data, 'newSnow')
    const snowHeight = filterDataset(data, 'snowHeight')

    return (
        <div>
            <h2>Snow</h2>
            <VictoryContainer
                style={STYLE.parent}
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                title="Snow height and new snow"
                desc={`Show height and new snow in centimeter (cm) every hour from ${min} to ${max}.`}>
                <g style={STYLE.group}>
                    <VictoryAxis
                        standalone={false}
                        width={width}
                        height={height}
                        scale="time"
                        domain={[min, max]}
                        domainPadding={DOMAIN_PADDING}
                        tickFormat={formatHours}
                        style={theme.axis.style}
                    />
                    <VictoryAxis
                        dependentAxis
                        domain={snowHeightDomain}
                        domainPadding={DOMAIN_PADDING}
                        standalone={false}
                        width={width}
                        height={height}
                        scale="linear"
                        tickValues={range(0, snowHeightDomain[1] + 1, 50)}
                        orientation="left"
                        label="Height (cm)"
                        style={STYLE.axis.primary}
                    />
                    <VictoryAxis
                        dependentAxis
                        domain={newSnowDomain}
                        domainPadding={DOMAIN_PADDING}
                        standalone={false}
                        width={width}
                        height={height}
                        scale="linear"
                        orientation="right"
                        label="New (cm)"
                        style={STYLE.axis.second}
                    />
                </g>
                <g style={STYLE.group}>
                    {showNewSnow &&
                        <VictoryBar
                            standalone={false}
                            width={width}
                            height={height}
                            data={newSnow}
                            x="measurementDateTime"
                            y="newSnow"
                            domain={{
                                x: domain,
                                y: newSnowDomain,
                            }}
                            domainPadding={DOMAIN_PADDING}
                            style={STYLE.bar}
                            events={barEvents}
                            labels={getNewSnowLabels}
                            labelComponent={
                                <VictoryTooltip
                                    renderInPortal={!false}
                                    style={theme.tooltip.style}
                                />
                            }
                        />}

                    {showSnowHeight &&
                        <VictoryLine
                            standalone={false}
                            width={width}
                            height={height}
                            data={snowHeight}
                            x="measurementDateTime"
                            y="snowHeight"
                            domain={{
                                x: domain,
                                y: snowHeightDomain,
                            }}
                            domainPadding={DOMAIN_PADDING}
                            style={STYLE.line}
                        />}
                    {showSnowHeight &&
                        <VictoryScatter
                            standalone={false}
                            width={width}
                            height={height}
                            data={snowHeight}
                            x="measurementDateTime"
                            y="snowHeight"
                            domain={{
                                x: domain,
                                y: snowHeightDomain,
                            }}
                            domainPadding={DOMAIN_PADDING}
                            style={STYLE.scatter}
                            events={scatterEvents}
                            labels={getSnowHeightLabels}
                            labelComponent={
                                <VictoryTooltip
                                    renderInPortal={!false}
                                    style={STYLE.tooltip}
                                />
                            }
                        />}
                </g>
            </VictoryContainer>
        </div>
    )
}
