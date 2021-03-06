import { createSelector, createStructuredSelector } from 'reselect'
import { computeOffset } from '~/selectors/map/bounds'
import { parseLocation } from '~/prismic/parsers'
import {
    getStatusFactory,
    getDocument,
    getUid,
} from '~/selectors/prismic/utils'

// TODO: Create a connector, it is really similar to special-information
// TODO: Move to index!

const getComputeFlyTo = createSelector(
    getDocument,
    computeOffset,
    (accident, computeOffset) => () => {
        const center = parseLocation(accident)

        if (center) {
            return {
                center,
                zoom: 9,
                offset: computeOffset(),
            }
        } else {
            return null
        }
    }
)

const getMessages = createSelector(getUid, getDocument, (uid, report) => ({
    isError: 'An error happened while loading the fatal recreational accident.',
    isLoading: 'Loading fatal recreational accident...',
    isLoaded: report
        ? null
        : `Fatal recreational accident "${uid}" is not available anymore.`,
}))

export default createStructuredSelector({
    report: getDocument,
    status: getStatusFactory(getMessages),
    computeFlyTo: getComputeFlyTo,
})
