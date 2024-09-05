import { ADD_CLAIM_FAILED, ADD_CLAIM_REQUEST, ADD_CLAIM_SUCCESS, ADD_REPLY_FAILED, ADD_REPLY_REQUEST, ADD_REPLY_SUCCESS, ADD_UNCLAIM_FAILED, ADD_UNCLAIM_REQUEST, ADD_UNCLAIM_SUCCESS, COLLECT_ADD_FAILED, COLLECT_ADD_REQUEST, COLLECT_ADD_SUCCESS } from "../constants/AddConstant"

const collectAddState = {
    loading: false,
    data: {},
    error: null,
}

export const collectAddReducer = (state = collectAddState, action) => {
    switch (action.type) {
        case COLLECT_ADD_REQUEST:
            return {
                loading: true,
                data: {},
                error: null,
            }
        case COLLECT_ADD_SUCCESS:
            return {
                data: action.payload,
                loading: false,
                error: null,
            }
        case COLLECT_ADD_FAILED:
            return {
                data: {},
                loading: false,
                error: action.payload,
            }

        default:
            return state
    }
}

const claimAddState = {
    loading: false,
    data: {},
    error: null,
}

export const claimAddReducer = (state = claimAddState, action) => {
    switch (action.type) {
        case ADD_CLAIM_REQUEST:
            return {
                loading: true,
                data: {},
                error: null,
            }
        case ADD_CLAIM_SUCCESS:
            return {
                data: action.payload,
                loading: false,
                error: null,
            }
        case ADD_CLAIM_FAILED:
            return {
                data: {},
                loading: false,
                error: action.payload,
            }

        default:
            return state
    }
}

const sendReplyState = {
    loading: false,
    data: {},
    error: null,
}

export const sendReplyReducer = (state = sendReplyState, action) => {
    switch (action.type) {
        case ADD_REPLY_REQUEST:
            return {
                loading: true,
                data: {},
                error: null,
            }
        case ADD_REPLY_SUCCESS:
            return {
                data: action.payload,
                loading: false,
                error: null,
            }
        case ADD_REPLY_FAILED:
            return {
                data: {},
                loading: false,
                error: action.payload,
            }

        default:
            return state
    }
}

const unclaimAddState = {
    loading: false,
    data: {},
    error: null,
}

export const unclaimAddReducer = (state = unclaimAddState, action) => {
    switch (action.type) {
        case ADD_UNCLAIM_REQUEST:
            return {
                loading: true,
                data: {},
                error: null,
            }
        case ADD_UNCLAIM_SUCCESS:
            return {
                data: action.payload,
                loading: false,
                error: null,
            }
        case ADD_UNCLAIM_FAILED:
            return {
                data: {},
                loading: false,
                error: action.payload,
            }

        default:
            return state
    }
}
