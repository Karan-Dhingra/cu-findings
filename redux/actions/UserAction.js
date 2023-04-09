import bcrypt from 'bcryptjs'
import axios from "axios";
import { BACKEND_URL, ErrorMessage } from "../../constants"
import {
    FETCH_ADD_BY_ID_REQUEST,
    FETCH_ADD_BY_ID_SUCCESS,
    FETCH_ADD_BY_ID_FAIL,
    FETCH_ALL_ADS_REQUEST,
    FETCH_ALL_ADS_SUCCESS,
    FETCH_ALL_ADS_FAIL,
    CREATE_ADD_REQUEST,
    CREATE_ADD_SUCCESS,
    CREATE_ADD_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_REGISTER_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
} from '../constants/UserConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const register = (user) => async(dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const { data } = await axios.post(
            `${BACKEND_URL}/auth/register/`,
            {
                email: user.email,
                password: user.password,
                confirmPassword: user.confirmPassword,
                uid: user.uid,
                officialEmailId: user.officialEmailId,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            }
        )
        if (data && data.status === 200) {
            let arr = data.user || {}
            dispatch({ type: USER_REGISTER_SUCCESS, payload: arr })
        } else
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: data.msg,
            })
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: ErrorMessage(error),
        })
    }
}

export const login = (user) => async(dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const { data } = await axios.post(
            `${BACKEND_URL}/auth/login`,
            {
                email: user.email , password: user.password
            },
        )

        const salt = await bcrypt.genSalt(10)

        const verificationHash =
            await bcrypt.hashSync(
                `${
                    process.env
                        .REACT_APP_KURAMA_VERIFICATION_HASH
                } ${data.accessToken.substring(
                    0,
                    15
                )}`,
                salt
            )
        if (data.status === 200) {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data,
                verificationHash,
            })

            AsyncStorage.setItem('user', data)
            AsyncStorage.setItem('verificationHash', data)
        } else {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload:
                    data.msg || 'Something Failed...',
            })
        }
    }catch(err){

    }
}

export const getAddById = (id, setAdd) => async (dispatch) => {
    try {
        dispatch({ type: FETCH_ADD_BY_ID_REQUEST })
        const { data } = await axios.get(
            `${BACKEND_URL}/public/getGiveaway/${id}`
        )
        if (data && data.status === 200) {
            let arr = data.giveaway || {}
            dispatch({ type: FETCH_ADD_BY_ID_SUCCESS, payload: arr })
            if (setAdd) setAdd(arr)
        } else
            dispatch({
                type: FETCH_ADD_BY_ID_FAIL,
                payload: data.msg,
            })
    } catch (error) {
        dispatch({
            type: FETCH_ADD_BY_ID_FAIL,
            payload: ErrorMessage(error),
        })
    }
}

export const getAllAds = (type = 'Ongoing') => async (dispatch) => {
    try {
        dispatch({type: FETCH_ALL_ADS_REQUEST})

        const config = {
            headers: {
                'content-type': 'application/json',
            },
        }

        const { data } = await axios.get(
            `${BACKEND_URL}/public/getAllAdds/${type}`,
            config
        )

        if (data) {
            let arr = data?.adds
            arr.reverse()
            dispatch({
                type: FETCH_ALL_ADS_SUCCESS,
                payload: arr,
                filter: type
            })
        } else
            dispatch({
                type: FETCH_ALL_ADS_FAIL,
                payload: data.msg,
            })
    } catch (error) {
        dispatch({
            type: FETCH_ALL_ADS_FAIL,
            payload: ErrorMessage(error),
        })
    }
}

export const createAddAction = (item, type='LOST', setModalVisible) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ADD_REQUEST })
        console.log(item)
        const { data } = await axios.post(
            `${BACKEND_URL}/user/createAdd`,{
                title: item?.title,
                description: item?.description,
                location: item?.location,
                timeLastSeen: item?.timeLastSeen,
                itemImage: item?.itemImage,
                type
            }
        )
        console.log(setModalVisible)

        if (data && data.status === 200) {
            dispatch({ type: CREATE_ADD_SUCCESS, payload: data?.add })
            console.log('data', data)
            if(setModalVisible) setModalVisible(true)
        } else{
            dispatch({
                type: CREATE_ADD_FAIL,
                payload: data.msg,
            })
        }
    } catch (error) {
        console.log('error', ErrorMessage(error))
        dispatch({
            type: CREATE_ADD_FAIL,
            payload: ErrorMessage(error),
        })
    }
}