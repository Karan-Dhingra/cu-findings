import { FETCH_ALL_ADS_FAIL, FETCH_ALL_ADS_REQUEST, FETCH_ALL_ADS_SUCCESS } from "../constants/UserConstants"

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