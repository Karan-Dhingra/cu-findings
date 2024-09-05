import axios from "axios";
const { ErrorMessage, BACKEND_URL } = require("../../constants")
const { GLOBAL_SEARCH_REQUEST, GLOBAL_SEARCH_SUCCESS, GLOBAL_SEARCH_FAIL } = require("../constants/PublicConstants")

export const globalSearch = (searchText) => async(dispatch) => {
    try{
        if (searchText.length <= 0 || searchText === '') {
            return
        }
        dispatch({type: GLOBAL_SEARCH_REQUEST})

        await axios
            .get(`${BACKEND_URL}/public/searchAllAdds/${searchText}`)
            .then((res) => {
                dispatch({type: GLOBAL_SEARCH_SUCCESS, payload: res.data.adds})
            })
            .catch((err) => {
                dispatch({type: GLOBAL_SEARCH_FAIL, payload: ErrorMessage(err)})
            })
        }catch(err){
            dispatch({type: GLOBAL_SEARCH_FAIL, payload: ErrorMessage(err)})
    }
}