import {handleAction, handleActions} from 'redux-actions'
import {combineReducers} from 'redux'
import {SPONSORS_SUCCESS, SET_ACTIVE_SPONSOR, RESET_ACTIVE_SPONSOR} from 'actions/sponsors'
import {getPayload} from 'reducers/utils'
import {LocalStorage} from 'services/storage'

const SPONSORS = LocalStorage.create().get('sponsors', {})

function handleSponsorsSuccess(state, {payload}) {
    LocalStorage.create().set('sponsors', payload)

    return payload
}

export default combineReducers({
    data: handleAction(SPONSORS_SUCCESS, handleSponsorsSuccess, SPONSORS),
    active: handleActions({
        [SET_ACTIVE_SPONSOR]: getPayload,
        [RESET_ACTIVE_SPONSOR]: () => null,
    }, null),
})

export function getSponsors(state) {
    return state.sponsors.data
}

export function getActiveSponsor(state) {
    return state.sponsors.active
}
