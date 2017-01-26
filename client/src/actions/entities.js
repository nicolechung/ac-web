import {createAction} from 'redux-actions'
import * as Schemas from 'api/schemas'
import {createApiAction} from 'api/utils'
import * as Api from 'api'

export const FORECAST_REQUEST = 'FORECAST_REQUEST'
export const FORECAST_SUCCESS = 'FORECAST_SUCCESS'
export const FORECAST_FAILURE = 'FORECAST_FAILURE'

export const FEATURES_METADATA_REQUEST = 'FEATURES_METADATA_REQUEST'
export const FEATURES_METADATA_SUCCESS = 'FEATURES_METADATA_SUCCESS'
export const FEATURES_METADATA_FAILURE = 'FEATURES_METADATA_FAILURE'

export const MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_REQUEST = 'MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_REQUEST'
export const MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_SUCCESS = 'MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_SUCCESS'
export const MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_FAILURE = 'MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_FAILURE'

export const MOUNTAIN_INFORMATION_NETWORK_SUBMISSION_REQUEST = 'MOUNTAIN_INFORMATION_NETWORK_SUBMISSION_REQUEST'
export const MOUNTAIN_INFORMATION_NETWORK_SUBMISSION_SUCCESS = 'MOUNTAIN_INFORMATION_NETWORK_SUBMISSION_SUCCESS'
export const MOUNTAIN_INFORMATION_NETWORK_SUBMISSION_FAILURE = 'MOUNTAIN_INFORMATION_NETWORK_SUBMISSION_FAILURE'

export const POST_MOUNTAIN_INFORMATION_NETWORK_SUBMISSION = 'POST_MOUNTAIN_INFORMATION_NETWORK_SUBMISSION'

export const INCIDENTS_REQUEST = 'INCIDENTS_REQUEST'
export const INCIDENTS_SUCCESS = 'INCIDENTS_SUCCESS'
export const INCIDENTS_FAILURE = 'INCIDENTS_FAILURE'

export const PROVIDERS_REQUEST = 'PROVIDERS_REQUEST'
export const PROVIDERS_SUCCESS = 'PROVIDERS_SUCCESS'
export const PROVIDERS_FAILURE = 'PROVIDERS_FAILURE'

export const COURSES_REQUEST = 'COURSES_REQUEST'
export const COURSES_SUCCESS = 'COURSES_SUCCESS'
export const COURSES_FAILURE = 'COURSES_FAILURE'

export const WEATHER_STATIONS_REQUEST = 'WEATHER_STATIONS_REQUEST'
export const WEATHER_STATIONS_SUCCESS = 'WEATHER_STATIONS_SUCCESS'
export const WEATHER_STATIONS_FAILURE = 'WEATHER_STATIONS_FAILURE'

export const loadFeaturesMetadata = createApiAction(
    FEATURES_METADATA_REQUEST,
    FEATURES_METADATA_SUCCESS,
    FEATURES_METADATA_FAILURE,
)

export const loadForecast = createApiAction(
    Schemas.Forecast,
    FORECAST_REQUEST,
    FORECAST_SUCCESS,
    FORECAST_FAILURE,
)

const loadMountainInformationNetworkSubmissions = createApiAction(
    Schemas.MountainInformationNetworkSubmission,
    MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_REQUEST,
    MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_SUCCESS,
    MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_FAILURE,
)

export function loadMountainInformationNetworkSubmissionsForDays(days = 7) {
    return loadMountainInformationNetworkSubmissions({days})
}

export function loadMountainInformationNetworkSubmission(id) {
    return loadMountainInformationNetworkSubmissions({id})
}

export const loadIncidents = createApiAction(
    Schemas.Incident,
    INCIDENTS_REQUEST,
    INCIDENTS_SUCCESS,
    INCIDENTS_FAILURE,
)

export const loadProviders = createApiAction(
    Schemas.Provider,
    PROVIDERS_REQUEST,
    PROVIDERS_SUCCESS,
    PROVIDERS_FAILURE,
)

export const loadCourses = createApiAction(
    Schemas.Course,
    COURSES_REQUEST,
    COURSES_SUCCESS,
    COURSES_FAILURE,
)

export const loadWeatherStations = createApiAction(
    Schemas.WeatherStation,
    WEATHER_STATIONS_REQUEST,
    WEATHER_STATIONS_SUCCESS,
    WEATHER_STATIONS_FAILURE,
)

export function loadWeatherStation(id) {
    return loadWeatherStations({id})
}

// CREATE ENTITY
export const postMountainInformationNetworkSubmission = createAction(
    POST_MOUNTAIN_INFORMATION_NETWORK_SUBMISSION,
    submission => Api.post(Schemas.MountainInformationNetworkSubmission, submission)
)
