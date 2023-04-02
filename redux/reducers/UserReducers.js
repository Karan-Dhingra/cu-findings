import { CREATE_ADD_FAIL, CREATE_ADD_REQUEST, CREATE_ADD_SUCCESS, FETCH_ALL_ADS_FAIL, FETCH_ALL_ADS_REQUEST, FETCH_ALL_ADS_SUCCESS } from "../constants/UserConstants"

const fetchAllAdsRequest = {
    loading: true,
    filter: 'Ongoing',
    allAds: [],
    error: null,
}

export const fetchAllAdsReducer = (state = fetchAllAdsRequest, action) => {
    switch (action.type) {
        case FETCH_ALL_ADS_REQUEST:
            return {
                filter: 'Ongoing',
                loading: true,
                allAds: [],
                error: null,
            }
        case FETCH_ALL_ADS_SUCCESS:
            return {
                allAds: action.payload,
                filter: action.filter,
                loading: false,
                error: null,
            }
        case FETCH_ALL_ADS_FAIL:
            return {
                allAds: [],
                filter: 'Ongoing',
                loading: false,
                error: action.payload,
            }

        default:
            return state
    }
}

const createAddState = {
    loading: false,
    data: {},
    error: null,
}

export const createAddReducer = (state = createAddState, action) => {
    switch (action.type) {
        case CREATE_ADD_REQUEST:
            return {
                loading: true,
                data: {},
                error: null,
            }
        case CREATE_ADD_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null,
            }
        case CREATE_ADD_FAIL:
            return {
                loading: false,
                data: {},
                error: action.payload,
            }

        default:
            return state
    }
}