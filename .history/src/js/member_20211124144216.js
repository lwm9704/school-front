import req from '../fect/rquestConfig'
const config = {
    selectData:{
        url:'/family/queryAll',
        method:'get'
    },
    insertData:{
        url:'/family/insertFamily',
        method:'post'
    },
    updateData:{
        url:'/family/updateFamily',
        method:'post'
    },
    deleteData:{
        url:'/family/deleteFamilyById',
        method:'post'
    }

    get
}
const request = function (funcName, requestParam) {
    return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request