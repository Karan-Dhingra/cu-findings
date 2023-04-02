import axios from "axios";
import { BACKEND_URL, ErrorMessage } from "../../constants"
import {
    FETCH_ADD_BY_ID_REQUEST,
    FETCH_ADD_BY_ID_SUCCESS,
    FETCH_ADD_BY_ID_FAIL,
    FETCH_ALL_ADS_REQUEST,
    FETCH_ALL_ADS_SUCCESS,
    FETCH_ALL_ADS_FAIL,
} from '../constants/UserConstants';

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

export const getRaffles = (type = 'Ongoing') => async (dispatch) => {
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
            let arr = data?.giveaways
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
