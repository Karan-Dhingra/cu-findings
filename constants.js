export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5002'
export const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000'

export const ErrorMessage = (error) => {
    return error.response && error.response?.data?.msg
        ? error.response.data.msg
        : error.message
}
