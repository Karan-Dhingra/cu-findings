import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { fetchAllAdsReducer, createAddReducer, userLoginReducer, userRegisterReducer, fetchUserAdsReducer, fetchUserNotificationReducer, updateProfileReducer } from './redux/reducers/UserReducers';
import { globalSearchReducer } from './redux/reducers/PublicReducers';
import { claimAddReducer, unclaimAddReducer, collectAddReducer, sendReplyReducer } from './redux/reducers/AddReducer';

const initialState = {}

const reducer = combineReducers({
    fetchAllAdsReducer,
    createAddReducer,
    userLoginReducer,
    userRegisterReducer,
    fetchUserAdsReducer,
    globalSearchReducer,
    fetchUserNotificationReducer,
    claimAddReducer,
    unclaimAddReducer,
    collectAddReducer,
    sendReplyReducer,
    updateProfileReducer
})

export const store = configureStore({
    reducer,
    devTools: true || process.env.REACT_APP_PRODUCTION === "DEVELOPMENT",
    initialState,
    middleware: [thunk],
})