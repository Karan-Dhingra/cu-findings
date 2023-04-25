import { GLOBAL_SEARCH_FAIL, GLOBAL_SEARCH_REQUEST, GLOBAL_SEARCH_SUCCESS } from "../constants/PublicConstants"

const globalSearchState = {
    loading: false,
    data: [],
    error: null,
}

export const globalSearchReducer = (state = globalSearchState, action) => {
    switch (action.type) {
        case GLOBAL_SEARCH_REQUEST:
            return {
                loading: true,
                data: [],
                error: null,
            }
        case GLOBAL_SEARCH_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null,
            }
        case GLOBAL_SEARCH_FAIL:
            return {
                loading: false,
                data: [],
                error: action.payload,
            }

        default:
            return state
    }
}