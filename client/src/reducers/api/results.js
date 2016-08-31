import {combineReducers} from 'redux'
import {List, Map, is} from 'immutable'
import * as SCHEMAS from 'api/schemas'
import {
    FORECAST_REQUEST,
    FORECAST_SUCCESS,
    FORECAST_FAILURE,
    FORECAST_REGIONS_REQUEST,
    FORECAST_REGIONS_SUCCESS,
    FORECAST_REGIONS_FAILURE,
    HOT_ZONE_AREAS_REQUEST,
    HOT_ZONE_AREAS_SUCCESS,
    HOT_ZONE_AREAS_FAILURE,
    HOT_ZONE_REPORT_REQUEST,
    HOT_ZONE_REPORT_SUCCESS,
    HOT_ZONE_REPORT_FAILURE,
    INCIDENTS_REQUEST,
    INCIDENTS_SUCCESS,
    INCIDENTS_FAILURE,
    MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_REQUEST,
    MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_SUCCESS,
    MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_FAILURE,
    PROVIDERS_REQUEST,
    PROVIDERS_SUCCESS,
    PROVIDERS_FAILURE,
    COURSES_REQUEST,
    COURSES_SUCCESS,
    COURSES_FAILURE,
} from 'actions/entities'
import {paramsToKey} from 'api/utils'
import {getEntitiesForSchemaIds} from 'reducers/api/entities'

const {
    MountainInformationNetworkObservation,
    ForecastRegion,
    Forecast,
    HotZoneArea,
    HotZoneReport,
    Incident,
    Provider,
    Course,
} = SCHEMAS

const {isArray} = Array

function getIds(result) {
    if (isArray(result)) {
        return result
    } else if (isArray(result.results)) {
        return result.results
    } else if (isArray(result.features)) {
        return result.features
    } else {
        return [result]
    }
}

const EMPTY_LIST = new List()

const RESULT = {
    isFetching: false,
    isLoaded: false,
    isError: false,
    ids: new Set(),
    props: {},
}

function resultsReducerFactory(schema, request, success, failure) {
    function results(state = RESULT, {type, payload}) {
        switch (type) {
            case request:
                return {
                    ...state,
                    isFetching: true,
                    isLoaded: false,
                    isError: false,
                }
            case success:
                const {result} = payload

                return {
                    ...state,
                    isFetching: false,
                    isLoaded: true,
                    isError: false,
                    ids: new Set([...state.ids, ...getIds(result)]),
                    ...result,
                }
            case failure:
                return {
                    ...state,
                    isFetching: false,
                    isLoaded: false,
                    isError: true,
                }
            default:
                return state
        }

    }

    return function resultsByKey(state = new Map(), action) {

        const {type} = action

        switch (type) {
            case request:
            case success:
            case failure:
                const {payload, meta} = action
                const {params} = type === request ? payload : meta
                const key = paramsToKey(params)
                const value = results(state.get(key), action)

                return state.set(key, value)
            default:
                return state
        }
    }
}

export default combineReducers({
    [MountainInformationNetworkObservation.getKey()]: resultsReducerFactory(
        MountainInformationNetworkObservation,
        MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_REQUEST,
        MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_SUCCESS,
        MOUNTAIN_INFORMATION_NETWORK_OBSERVATIONS_FAILURE,
    ),
    [ForecastRegion.getKey()]: resultsReducerFactory(
        ForecastRegion,
        FORECAST_REGIONS_REQUEST,
        FORECAST_REGIONS_SUCCESS,
        FORECAST_REGIONS_FAILURE,
    ),
    [Forecast.getKey()]: resultsReducerFactory(
        Forecast,
        FORECAST_REQUEST,
        FORECAST_SUCCESS,
        FORECAST_FAILURE,
    ),
    [HotZoneArea.getKey()]: resultsReducerFactory(
        HotZoneArea,
        HOT_ZONE_AREAS_REQUEST,
        HOT_ZONE_AREAS_SUCCESS,
        HOT_ZONE_AREAS_FAILURE,
    ),
    [HotZoneReport.getKey()]: resultsReducerFactory(
        HotZoneReport,
        HOT_ZONE_REPORT_REQUEST,
        HOT_ZONE_REPORT_SUCCESS,
        HOT_ZONE_REPORT_FAILURE,
    ),
    [Incident.getKey()]: resultsReducerFactory(
        Incident,
        INCIDENTS_REQUEST,
        INCIDENTS_SUCCESS,
        INCIDENTS_FAILURE,
    ),
    [Provider.getKey()]: resultsReducerFactory(
        Provider,
        PROVIDERS_REQUEST,
        PROVIDERS_SUCCESS,
        PROVIDERS_FAILURE,
    ),
    [Course.getKey()]: resultsReducerFactory(
        Course,
        COURSES_REQUEST,
        COURSES_SUCCESS,
        COURSES_FAILURE,
    ),
})
