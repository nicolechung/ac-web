import React, {PropTypes, createElement} from 'react'
import {Link} from 'react-router'
import {Page, Header, Main, Content} from 'components/page'
import Forecast, {Metadata, Footer} from 'components/forecast'
import {Muted, Error} from 'components/misc'
import {forecast} from './connectors'

Container.propTypes = {
    title: PropTypes.string.isRequired,
    forecast: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    link: PropTypes.object,
}

function Container({
    title = 'Loading...',
    forecast,
    isLoading,
    isError,
    link,
}) {
    return (
        <Page>
            <Header title={link ? <Link {...link}>{title}</Link> : title} />
            <Content>
                <Main>
                    {forecast && <Metadata {...forecast} />}
                    {isLoading && <Muted>Loading forecast...</Muted>}
                    {isError && <Error>Error happened while loading forecast.</Error>}
                    {(forecast && forecast.region) && <Forecast {...forecast} />}
                    {forecast && <Footer author={forecast.forecaster} />}
                </Main>
            </Content>
        </Page>
    )
}

export default forecast(Container)