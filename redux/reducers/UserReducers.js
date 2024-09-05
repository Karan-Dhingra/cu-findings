import { CREATE_ADD_FAIL, CREATE_ADD_REQUEST, CREATE_ADD_SUCCESS, FETCH_ALL_ADS_FAIL, FETCH_ALL_ADS_REQUEST, FETCH_ALL_ADS_SUCCESS, FETCH_USER_ADS_FAIL, FETCH_USER_ADS_REQUEST, FETCH_USER_ADS_SUCCESS, GET_NOTIFICATION_FAILED, GET_NOTIFICATION_REQUEST, GET_NOTIFICATION_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_ON_LOAD, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_RESETTING_LOGIN, WALLET_NOT_FOUND } from "../constants/UserConstants"
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchUserNotificationState = {
    loading: true,
    notifications: [],
    error: null,
}

export const fetchUserNotificationReducer = (state = fetchUserNotificationState, action) => {
    switch (action.type) {
        case GET_NOTIFICATION_REQUEST:
            return {
                loading: true,
                notifications: [],
                error: null,
            }
        case GET_NOTIFICATION_SUCCESS:
            return {
                notifications: action.payload,
                loading: false,
                error: null,
            }
        case GET_NOTIFICATION_FAILED:
            return {
                notifications: [],
                loading: false,
                error: action.payload,
            }

        default:
            return state
    }
}

const fetchUserAdsRequest = {
    loading: true,
    filter: 'all',
    allAds: {},
    error: null,
}

export const fetchUserAdsReducer = (state = fetchUserAdsRequest, action) => {
    switch (action.type) {
        case FETCH_USER_ADS_REQUEST:
            return {
                filter: 'all',
                loading: true,
                allAds: {},
                error: null,
            }
        case FETCH_USER_ADS_SUCCESS:
            return {
                allAds: action.payload,
                filter: action.filter,
                loading: false,
                error: null,
            }
        case FETCH_USER_ADS_FAIL:
            return {
                allAds: {},
                filter: 'all',
                loading: false,
                error: action.payload,
            }

        default:
            return state
    }
}

const updateProfile = {
    loading: false,
    data: [],
    error: null,
}

export const updateProfileReducer = (state = updateProfile, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            return {
                loading: true,
                data: [],
                error: null,
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null,
            }
        case UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                data: [],
                error: action.payload,
            }

        default:
            return state
    }
}


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

var localUserInfo
AsyncStorage.getItem('user').then((res) => {
    // console.log('res', res)
    localUserInfo = res
})
const verificationHash = AsyncStorage.getItem('verificationHash')
// console.log('localUserInfo', localUserInfo)

const userState = {
    loading: false,
    isLogin: localUserInfo ? true : false,
    userInfo: localUserInfo ? localUserInfo.user : null,
    accessToken: localUserInfo?.accessToken || null,
    verificationHash: verificationHash || null,
    expiresAt: localUserInfo?.expireAt || null,
    error: null,
}

export const userLoginReducer = (state = userState, action) => {
    switch (action.type) {
        case USER_LOGIN_ON_LOAD:
            return {
                loading: false,
                isLogin: action.payload ? true : false,
                userInfo: action.payload ? action.payload.user : null,
                accessToken: action.payload?.accessToken || null,
                verificationHash: null,
                expiresAt: action.payload?.expireAt || null,
                error: null,
            }
        case USER_LOGIN_REQUEST:
            return {
                loading: true,
                isLogin: false,
                userInfo: null,
                isAdmin: false,
                accessToken: null,
                expiresAt: null,
                error: null,
                verificationHash: null,
            }
        case USER_RESETTING_LOGIN:
            return {
                loading: false,
                userInfo: null,
                isAdmin: false,
                accessToken: null,
                error: null,
                expiresAt: null,
                verificationHash: null,
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                isLogin: action.payload ? true : false,
                userInfo: action.payload ? action.payload?.user : action.payload,
                accessToken: action.payload.accessToken,
                verificationHash: action.verificationHash,
                expiresAt: action.payload.expireAt,
                error: null,
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                isLogin: false,
                userInfo: null,
                isAdmin: false,
                accessToken: null,
                expiresAt: null,
                error: action.payload,
                verificationHash: null,
            }
        case WALLET_NOT_FOUND:
            return {
                loading: false,
                isLogin: false,
                userInfo: null,
                isAdmin: false,
                accessToken: null,
                error: action.payload,
                expiresAt: null,
                verificationHash: null,
            }
        case USER_LOGOUT:
            return {
                loading: false,
                isLogin: false,
                userInfo: null,
                isAdmin: false,
                accessToken: null,
                error: null,
                expiresAt: null,
                verificationHash: null,
            }

        default:
            return state
    }
}

const userRegiserState = {
    loading: false,
    data: {},
    error: null,
}

export const userRegisterReducer = (state = userRegiserState, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loading: true,
                data: null,
                error: null,
            }
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.paylodata,
                error: null,
            }
        case USER_REGISTER_FAIL:
            return {
                loading: false,
                data: null,
                error: action.payload,
            }

        default:
            return state
    }
}