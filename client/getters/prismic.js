import Immutable from 'immutable'
import RESULT from '~/reducers/result'
import { paramsToKey } from '~/actions/prismic'
import { parse } from '~/prismic'
import { createSelector } from 'reselect'

const MAP = new Immutable.Map()

export function getDocuments(state) {
    return state.prismic.documents
}

export function getResults(state) {
    return state.prismic.results
}

export function getResult(state, params) {
    return state.prismic.results.get(paramsToKey(params), RESULT)
}

export function getDocumentsOfType(state, type) {
    const ids = state.prismic.ids.get(type, MAP).toMap()
    const { documents } = state.prismic

    return ids.map(id => documents.get(id))
}

export function getDocumentForUid(state, type, uid) {
    const id = getDocumentId(state, type, uid)

    return getDocumentForId(state, id)
}

export function getDocumentForId(state, id) {
    return state.prismic.documents.get(id)
}

export function hasDocumentForUid(state, type, uid) {
    const id = getDocumentId(state, type, uid)

    return hasDocumentForId(state, id)
}

export function hasDocumentForId(state, type, id) {
    return state.prismic.documents.has(id)
}

function getDocumentId(state, type, uid) {
    return state.prismic.uids.getIn([type, uid])
}

export function getDocumentFromParams(state, params) {
    const { type, uid, predicates } = params
    let { id } = params

    if (!id) {
        if (type && uid) {
            id = getDocumentId(state, type, uid)
        }
        if (Array.isArray(predicates)) {
            const result = getResult(state, params)

            id = result.toJSON().ids[0]
        }
    }

    return getDocumentForId(state, id)
}

export function getDocumentsFromParams(state, params) {
    const { ids } = getResult(state, params)

    return Array.from(ids)
        .map(id => getDocumentForId(state, id))
        .filter(Boolean)
}

// TODO: Move that selector out of here, only getters here!
export const getHighlight = createSelector(
    state => getDocumentsOfType(state, 'highlight').first(),
    highlight => (highlight ? parse(highlight) : null)
)
