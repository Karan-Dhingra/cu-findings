// export const BACKEND_URL = 'http://10.0.2.2:5002'
export const BACKEND_URL = 'https://naughty-outerwear-wasp.cyclic.app' || process.env.REACT_APP_BACKEND_URL || 'http://10.0.2.2:5002'
export const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || 'http://10.0.2.2:3000'

export const ErrorMessage = (error) => {
    return error.response && error.response?.data?.msg
        ? error.response.data.msg
        : error.message
}
