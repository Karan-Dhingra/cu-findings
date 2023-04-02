import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { fetchAllAdsReducer } from './redux/reducers/UserReducers';

const initialState = {}

const reducer = combineReducers({
    fetchAllAdsReducer
})

export const store = configureStore({
    reducer,
    devTools: true || process.env.REACT_APP_PRODUCTION === "DEVELOPMENT",
    initialState,
    middleware: [thunk],
})