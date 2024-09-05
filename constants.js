export const BACKEND_URL = 'http://10.0.2.2:5002'
// export const BACKEND_URL = 'https://naughty-outerwear-wasp.cyclic.app' || process.env.REACT_APP_BACKEND_URL || 'http://10.0.2.2:5002'
export const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || 'http://10.0.2.2:3000'

export const ErrorMessage = (error) => {
    return error.response && error.response?.data?.msg
        ? error.response.data.msg
        : error.message
}

export const getDateString = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000)

    var interval = seconds / 31536000

    if (interval > 1) {
        return Math.floor(interval) + ' years ago'
    }
    interval = seconds / 2592000
    if (interval > 1) {
        return Math.floor(interval) + ' month ago'
    }
    interval = seconds / 86400
    if (interval > 1) {
        return Math.floor(interval) + ' days ago'
    }
    interval = seconds / 3600
    if (interval > 1) {
        return Math.floor(interval) + ' hour ago'
    }
    interval = seconds / 60
    if (interval > 1) {
        return Math.floor(interval) + ' mins ago'
    }
    return Math.floor(seconds) + ' secs ago'
}