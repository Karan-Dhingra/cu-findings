// import BcryptReactNative from 'bcrypt-react-native';
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
    FETCH_USER_ADS_REQUEST,
    FETCH_USER_ADS_SUCCESS,
    FETCH_USER_ADS_FAIL,
    GET_NOTIFICATION_REQUEST,
    GET_NOTIFICATION_SUCCESS,
    GET_NOTIFICATION_FAILED,
    USER_LOGIN_ON_LOAD,
    USER_LOGOUT,
} from '../constants/UserConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from "../../store";

export const uploadToCloudinary = async (uri) => {
    try {
        const type = 'image/jpeg';
        const name = 'name.jpg';
        const source = {uri,type,name}
        const formData = new FormData()
        formData.append('file', source)
        formData.append('upload_preset', 'Kurama_Preset_Production')
        formData.append('cloud_name', 'kuramaverse')
        // const { data } = await axios.post(
        //     'https://api.cloudinary.com/v1_1/dognf82sm/auto/upload',
        //     formData
        // )
        // console.log(data)

        // if (data.url) return data.url
        let urlValue = ''

        let res = await fetch(
            "https://api.cloudinary.com/v1_1/kuramaverse/image/upload",
            {
                method: "post",
                mode: "cors",
                body: formData,
                headers:{
                    'Accept': 'application/json',
                    'content-type': 'multipart/form-data'
                }
            }
            )
            .then(res=>res.json())
            .then(data=>{
                console.log('url' ,data.url)
                urlValue = data.url
                return data.url
            })
            .catch(err=>{
                console.log('err', err)
            })

            return urlValue
    } catch (error) {
        console.log(error)
    }
}

export const registerAction = (user, navigation, ToastAndroid) => async(dispatch) => {
    try {
        console.log('registerAction', user)
        dispatch({ type: USER_REGISTER_REQUEST })
        const { data } = await axios.post(
            `${BACKEND_URL}/auth/register`,
            {
                email: user.personalEmail,
                password: user.password,
                confirmPassword: user.confirmPassword,
                uid: user.officialEmail.trim().split('@')[0].toUpperCase(),
                officialEmailId: user.officialEmailId,
                username: user.username.toLowerCase(),
                firstName: user.firstName,
                lastName: user.lastName
            }
        )
        if (data && data.status === 200) {
            let arr = data.user || {}
            dispatch({ type: USER_REGISTER_SUCCESS, payload: arr })
            console.log(data)
            navigation.navigate('SignIn')
            ToastAndroid.show('Registered Successfully!', ToastAndroid.SHORT);
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

export const dispatchLoginRequestOnLoad = (userData) => async(dispatch) =>{
    dispatch({
        type: USER_LOGIN_ON_LOAD,
        payload: JSON.parse(userData)
    })
}

export const login = (user, ToastAndroid) => async(dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        console.log(user)

        const { data } = await axios.post(
            `${BACKEND_URL}/auth/login`,
            {
                email: user.officialEmail , password: user.password
            },
        )

        if (data.status === 200) {
            // const salt = await BcryptReactNative.getSalt(10)

            // const verificationHash =
            //     await BcryptReactNative.hash(
            //         salt,
            //         `${
            //             'KARANDHINGA'
            //         } ${data.accessToken.substring(
            //             0,
            //             15
            //         )}`
            //     ).

            //     console.log('SHA', verificationHash)
            AsyncStorage.setItem('user', JSON.stringify(data))

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data,
                verificationHash: "OK",
            })

            if(ToastAndroid)
                ToastAndroid.show('Signed In!', ToastAndroid.SHORT);
        } else {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload:
                    data.msg || 'Something Failed...',
            })
        }
    }catch(err){
        console.log(err)
            dispatch({
            type: USER_LOGIN_FAIL,
            payload: ErrorMessage(err)
        })
    }
}

export const logout = () => async(dispatch) => {
    dispatch({
        type: USER_LOGOUT
    })
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

export const getUserNotifications = () => async (dispatch) => {
    try {
        dispatch({type: GET_NOTIFICATION_REQUEST})
        const userLoginReducer = store.getState().userLoginReducer
        const token = userLoginReducer?.accessToken

        const config = {
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + token
            },
        }

        const { data } = await axios.get(
            `${BACKEND_URL}/user/getNotifications`,
            config
        )

        if (data) {
            let arr = data?.notifications
            arr.reverse()
            dispatch({
                type: GET_NOTIFICATION_SUCCESS,
                payload: arr,
            })
        } else
            dispatch({
                type: GET_NOTIFICATION_FAILED,
                payload: data.msg,
            })
    } catch (error) {
        dispatch({
            type: GET_NOTIFICATION_FAILED,
            payload: ErrorMessage(error),
        })
    }
}

export const getUserAds = (type = 'all') => async (dispatch) => {
    try {
        dispatch({type: FETCH_USER_ADS_REQUEST})
        const userLoginReducer = store.getState().userLoginReducer
        const token = userLoginReducer?.accessToken

        const config = {
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + token
            },
        }

        const { data } = await axios.get(
            `${BACKEND_URL}/user/getMyAdds/${type}`,
            config
        )

        if (data) {
            let arr = data?.adds
            arr.reverse()
            dispatch({
                type: FETCH_USER_ADS_SUCCESS,
                payload: arr,
                filter: type
            })
        } else
            dispatch({
                type: FETCH_USER_ADS_FAIL,
                payload: data.msg,
            })
    } catch (error) {
        dispatch({
            type: FETCH_USER_ADS_FAIL,
            payload: ErrorMessage(error),
        })
    }
}

export const createAddAction = (item, type='LOST', setModalVisible) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ADD_REQUEST })
        const userLoginReducer = store.getState().userLoginReducer
        const token = userLoginReducer?.accessToken

        const config = {
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + token
            },
        }

        console.log(item?.itemImage)
        const  cloudinaryUrl = await uploadToCloudinary(item?.itemImage)
        console.log(cloudinaryUrl)

        const { data } = await axios.post(
            `${BACKEND_URL}/user/createAdd`,{
                title: item?.title,
                description: item?.description,
                location: item?.location,
                timeLastSeen: item?.timeLastSeen,
                itemImage: cloudinaryUrl,
                type
            },
            config
        )
        console.log(data)

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