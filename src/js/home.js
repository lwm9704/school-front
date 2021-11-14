import req from "../fect/rquestConfig";

const config = {
    getUserInfo: {
        url: '/user/selectOfCondition',
        method: 'get'
    },
}
const request = function (funcName, requestParam) {
    return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request