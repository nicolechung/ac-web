import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import {withState} from 'recompose'
import {Link} from 'react-router'
import {Page, Header, Main, Article, ArticleHeader, Aside} from 'components/page'
import {ChevronRight} from 'components/icons'
import Sidebar from './Sidebar'
import Footer from './Footer'
import styles from './Weather.css'

Weather.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}

function Weather({ children, isAuthenticated = false }) {
    const title = (
        <Link to='/weather'>
            Mountain Weather Forecast <ChevronRight />
        </Link>
    )

    return (
        <Page styleName='Page'>
            <Header title={title} />
            <Main>
                {children}
                <Footer showFeedbackAnchor={isAuthenticated} />
            </Main>
            <Aside>
                <Sidebar />
            </Aside>
        </Page>
    )
}

export default CSSModules(Weather, styles)
