import axios from "axios"
import { BACKEND_URL, ErrorMessage } from "../../constants"
import { ADD_CLAIM_FAILED, ADD_CLAIM_REQUEST, ADD_CLAIM_SUCCESS, ADD_REPLY_FAILED, ADD_REPLY_REQUEST, ADD_REPLY_SUCCESS, ADD_UNCLAIM_FAILED, ADD_UNCLAIM_REQUEST, ADD_UNCLAIM_SUCCESS, COLLECT_ADD_FAILED, COLLECT_ADD_REQUEST, COLLECT_ADD_SUCCESS } from "../constants/AddConstant"
import { store } from "../../store"
import { getAllAds } from "./UserAction"

export const collectItem = (id, complete, error, ToastAndroid) => async(dispatch)=> {
    try{
        dispatch({
            type: COLLECT_ADD_REQUEST
        })
        const userLoginReducer = store.getState().userLoginReducer
        const token = userLoginReducer?.accessToken

        const config = {
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + token
            },
        }

        const { data } = await axios.post(
            `${BACKEND_URL}/user/collectItem`,
            {
                item_id : id
            },
            config
        )

        if (data.status === 200) {
            dispatch({
                type: COLLECT_ADD_SUCCESS,
                payload: data,
            })

            if(complete)
                complete()

            if(ToastAndroid){
                ToastAndroid.show('Collected Succesfully', ToastAndroid.SHORT);
            }
        } else {
            dispatch({
                type: COLLECT_ADD_FAILED,
                payload:
                    data.msg || 'Something Failed...',
            })
            if(error)
                error()
            if(ToastAndroid){
                ToastAndroid.show(data.msg || 'Something Failed...', ToastAndroid.SHORT);
            }
        }
    }catch(err){
        console.log(err)
            dispatch({
            type: COLLECT_ADD_FAILED,
            payload: ErrorMessage(err)
        })
        if(error)
            error()
        if(ToastAndroid){
            ToastAndroid.show(ErrorMessage(err), ToastAndroid.SHORT);
        }
    }
}

export const replyAdd = (id, complete, error, msg, ToastAndroid) => async(dispatch)=> {
    try{
        dispatch({
            type: ADD_REPLY_REQUEST
        })
        const userLoginReducer = store.getState().userLoginReducer
        const token = userLoginReducer?.accessToken

        const config = {
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + token
            },
        }

        const { data } = await axios.post(
            `${BACKEND_URL}/user/replyAdd`,
            {
                item_id : id,
                msg: msg
            },
            config
        )

        if (data.status === 200) {
            dispatch({
                type: ADD_REPLY_SUCCESS,
                payload: data,
            })

            if(ToastAndroid){
                ToastAndroid.show('Thankyou for helping :)', ToastAndroid.SHORT)
            }

            if(complete)
                complete()
        } else {
            dispatch({
                type: ADD_REPLY_FAILED,
                payload:
                    data.msg || 'Something Failed...',
            })
            if(error)
                error()

            if(ToastAndroid){
                ToastAndroid.show(data.msg || 'Something Failed...', ToastAndroid.SHORT)
            }
        }
    }catch(err){
        console.log(err)
            dispatch({
            type: ADD_REPLY_FAILED,
            payload: ErrorMessage(err)
        })
        if(error)
            error()
        if(ToastAndroid){
            ToastAndroid.show(ErrorMessage(err), ToastAndroid.SHORT)
        }
    }
}

export const claimItem = (id, complete, error) => async(dispatch)=> {
    try{
        dispatch({
            type: ADD_CLAIM_REQUEST
        })
        const userLoginReducer = store.getState().userLoginReducer
        const token = userLoginReducer?.accessToken

        const config = {
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + token
            },
        }

        const { data } = await axios.post(
            `${BACKEND_URL}/user/claimItem`,
            {
                item_id : id
            },
            config
        )

        if (data.status === 200) {
            dispatch({
                type: ADD_CLAIM_SUCCESS,
                payload: data,
            })

            if(complete)
                complete()
        } else {
            dispatch({
                type: ADD_CLAIM_FAILED,
                payload:
                    data.msg || 'Something Failed...',
            })
            if(error)
                error()
        }
    }catch(err){
        console.log(err)
            dispatch({
            type: ADD_CLAIM_FAILED,
            payload: ErrorMessage(err)
        })
        if(error)
                error()
    }
}

export const unclaimItem = (id, navigation, ToastAndroid) => async(dispatch)=> {
    try{
        dispatch({
            type: ADD_UNCLAIM_REQUEST
        })
        const userLoginReducer = store.getState().userLoginReducer
        const token = userLoginReducer?.accessToken

        const config = {
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + token
            },
        }

        const { data } = await axios.post(
            `${BACKEND_URL}/user/unclaimItem`,
            {
                item_id : id
            },
            config
        )

        if (data.status === 200) {
            dispatch({
                type: ADD_UNCLAIM_SUCCESS,
                payload: data,
            })

            dispatch(getAllAds())

            if(navigation){
                navigation.navigate('Home')
            }

            if(ToastAndroid){
                ToastAndroid.show('Unclaimed Successfully!', ToastAndroid.SHORT);
            }
        } else {
            dispatch({
                type: ADD_UNCLAIM_FAILED,
                payload:
                data.msg || 'Something Failed...',
            })
            if(ToastAndroid){
                ToastAndroid.show(data.msg || 'Something Failed...', ToastAndroid.SHORT);
            }
        }
    }catch(err){
        console.log(err)
            dispatch({
            type: ADD_UNCLAIM_FAILED,
            payload: ErrorMessage(err)
        })
        if(ToastAndroid){
            ToastAndroid.show(ErrorMessage(err), ToastAndroid.SHORT);
        }
    }
}