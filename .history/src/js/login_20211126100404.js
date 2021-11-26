import req from '../fect/rquestConfig'
const config = {
    login: {
        url: '/login',
        method: 'post'
    }
}
const request = function (funcName, requestParam) {
    return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request