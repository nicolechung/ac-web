import React from 'react'
import Application from '~/components/application'
import { Route, Redirect, Switch } from 'react-router-dom'
import {
    LoginCompleteRoute,
    NotFoundRoute,
    StaticPageRoute,
    GenricPageRoute,
    WIPPageRoute,
    FallbackPageRoute,
} from '~/router/common'
import { AvalancheCanada as Navbar } from '~/containers/Navbar'
import Highlight from '~/containers/Highlight'
import Footer from '~/components/footer'
import MainMap from './Map'
import AtesMap from './AtesMap'
import Tutorial from './Tutorial'
import Ast from './Ast'
import MountainInformationNetwork from './MountainInformationNetwork'
import Weather from './Weather'
import HotZoneReport from './HotZoneReport'
import Forecast from './Forecast'
import * as Feed from './Feed'
import Glossary from '~/containers/Glossary'

export default function AvalancheCanada() {
    return (
        <Application>
            <Navbar />
            <Highlight />
            <Switch>
                <Redirect exact from="/" to="/map" />
                <LoginCompleteRoute path="/login-complete" />
                <Route path="/map/ates" component={AtesMap} />
                <Route path="/map/:type?/:name?" component={MainMap} />
                <Route path="/glossary" component={Glossary} />
                <Route path="/tutorial" component={Tutorial} />
                <Route path="/hot-zone-reports" component={HotZoneReport} />
                <Route path="/forecasts" component={Forecast} />
                <Route path="/blogs" component={Feed.Blogs} />
                <Route path="/news" component={Feed.News} />
                <Route path="/events" component={Feed.Events} />
                <Route
                    path="/mountain-information-network"
                    component={MountainInformationNetwork}
                />
                <Route path="/weather" component={Weather} />
                <Route path="/training/:type" component={Ast} />
                <StaticPageRoute path="/about" uid="about" title="About" />
                <StaticPageRoute
                    path="/early-season-conditions"
                    uid="early-season-conditions"
                    title="Early Season Conditions"
                />
                <StaticPageRoute path="/tech" uid="tech" title="Tech" />
                <StaticPageRoute path="/faq" uid="faq" title="FAQ" />
                <StaticPageRoute
                    path="/planning"
                    uid="planning"
                    title="Planning"
                />
                <StaticPageRoute
                    path="/information"
                    uid="information"
                    title="Information"
                />
                <StaticPageRoute path="/sled" uid="sled" title="Sled" />
                <StaticPageRoute path="/youth" uid="youth" title="Youth" />
                <StaticPageRoute
                    path="/gear"
                    uid="essential-gear"
                    title="Essential Gear"
                />
                <StaticPageRoute
                    path="/training"
                    uid="training"
                    title="Go farther — Get avalanche trained"
                />
                <StaticPageRoute
                    path="/instructing-ast"
                    uid="instructing-ast"
                    title="Teaching Avalanche Skills Training (AST)"
                />
                <StaticPageRoute
                    path="/ambassadors"
                    uid="ambassadors"
                    title="Ambassadors"
                />
                <StaticPageRoute
                    path="/sponsors"
                    uid="sponsors"
                    title="Sponsors"
                />
                <StaticPageRoute
                    path="/collaborators"
                    uid="collaborators"
                    title="Collaborators"
                />
                <StaticPageRoute
                    path="/membership"
                    uid="membership-overview"
                    title="Membership Overview"
                />
                <GenricPageRoute
                    path="/privacy-policy"
                    uid="privacy-policy"
                    title="Privacy Policy"
                />
                <GenricPageRoute
                    path="/terms-of-use"
                    uid="terms-of-use"
                    title="Terms of use"
                />
                <WIPPageRoute
                    path="/trip-planner"
                    name="Trip Planner"
                    oldUrl="http://old.avalanche.ca/cac/pre-trip-planning/trip-planner/planning"
                />
                <WIPPageRoute
                    path="/incidents"
                    name="Historic Incidents"
                    oldUrl="http://old.avalanche.ca/cac/library/incident-report-database/view"
                />
                <WIPPageRoute
                    path="/auction"
                    name="Web Auction"
                    oldUrl="http://old.avalanche.ca/cac/auctions"
                />
                <WIPPageRoute
                    path="/tutoriel"
                    name="Tutorial / Tutoriel"
                    oldUrl="http://old.avalanche.ca/fr/cac/training/online-course"
                    title={defaultTitle =>
                        `${defaultTitle}<br />Nous travaillons présentement sur cette page...`}
                    subtitle={defaultSubtitle =>
                        `${defaultSubtitle}<br />Pour l'instant, vous pouvez consulter cette page sur notre ancien site.`}
                />
                <FallbackPageRoute path="/pages/:type/:uid" />
                <NotFoundRoute />
            </Switch>
            <Switch>
                <Route path="/map" component={null} />
                <Route path="/map/ates" component={null} />
                <Route path="/trip-planner" component={null} />
                <Route path="/incidents" component={null} />
                <Route path="/tutoriel" component={null} />
                <Route path="/auction" component={null} />
                <Route component={Footer} />
            </Switch>
        </Application>
    )
}
