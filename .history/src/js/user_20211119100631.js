import req from '../fect/rquestConfig'
const config = {
    selectData:{
        url:'/user/selectOfCondition',
        method: 'get'
    },
    insertData:{
        url:'/user/insertUser',
        method: 'post'
    },
    updateData:{
        url:'/user/updateUser',
        method:'post'
    },
    deleteData:{
        url:'/user/deleteUserById',
        method:'post'
    }
    
}
const request = function (funcName, requestParam) {
    return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request