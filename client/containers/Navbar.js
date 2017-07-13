import React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose, defaultProps, withProps } from 'recompose'
import { NewRelease } from '~/components/icons'
import Navbar, {
    Item,
    Menu,
    Section,
    UserProfile,
    Header,
    Link,
} from '~/components/navbar'
import formatDate from 'date-fns/format'
import startOfTomorrow from 'date-fns/start_of_tomorrow'
import startOfYesterday from 'date-fns/start_of_yesterday'
import { Predicates, parse } from '~/prismic'
import { Avatar } from '~/components/misc'
import { Feature } from '~/components/application'
import * as Menus from '~/constants/menu'
import { prismicPatch } from '~/containers/connectors'
import { getIsAuthenticated, getProfile } from '~/getters/auth'
import { login, logout } from '~/actions/auth'
import AvalancheCanadaLogo from '~/styles/AvalancheCanada.svg'
import AvalancheCanadaFoundationLogo
    from '~/styles/AvalancheCanadaFoundation.svg'
import { getDocumentsFromParams } from '~/getters/prismic'
import { StructuredText } from '~/prismic/components/base'

function getParams() {
    const type = 'application-feature'

    return {
        type,
        predicates: [
            Predicates.dateBefore(
                `my.${type}.startDate`,
                formatDate(startOfTomorrow(), 'YYYY-MM-DD')
            ),
            Predicates.dateAfter(
                `my.${type}.endDate`,
                formatDate(startOfYesterday(), 'YYYY-MM-DD')
            ),
        ],
    }
}
function getApplicationFeatures(state, props) {
    return getDocumentsFromParams(state, getParams(props))
}

export const AvalancheCanada = compose(
    defaultProps({
        logo: AvalancheCanadaLogo,
        donate: '/foundation',
        menu: Menus.AvalancheCanada,
    }),
    connect(
        createStructuredSelector({
            isAuthenticated: getIsAuthenticated,
            profile: getProfile,
        }),
        {
            onLogin: login,
            onLogout: logout,
        }
    ),
    prismicPatch(
        getParams,
        createStructuredSelector({
            features: getApplicationFeatures,
        })
    ),
    withProps(
        ({ isAuthenticated, profile, onLogin, onLogout, features = [] }) => {
            const { name, picture } = profile || {}
            const avatar = <Avatar name={name} url={picture} size={30} />
            const children = [
                isAuthenticated
                    ? <Item title={avatar}>
                          <Menu>
                              <Section>
                                  <UserProfile name={name} avatar={picture} />
                                  <Header>
                                      <Link onClick={onLogout}>
                                          Logout
                                      </Link>
                                  </Header>
                              </Section>
                          </Menu>
                      </Item>
                    : <Item title="Login" onClick={onLogin} />,
            ]

            if (features.length > 0) {
                const { data, firstPublicationDate } = parse(features[0])

                children.push(
                    <Item title={<NewRelease />}>
                        <Menu>
                            <Section>
                                <Feature {...data} date={firstPublicationDate}>
                                    <StructuredText value={data.content} />
                                </Feature>
                            </Section>
                        </Menu>
                    </Item>
                )
            }

            return {
                children,
            }
        }
    )
)(Navbar)

export const AvalancheCanadaFoundation = defaultProps({
    logo: AvalancheCanadaFoundationLogo,
    menu: Menus.AvalancheCanadaFoundation,
    donate: '/foundation/donate',
})(Navbar)
