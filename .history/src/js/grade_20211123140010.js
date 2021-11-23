import req from '../fect/rquestConfig'
const config = {
    selectData:{
        url:'/classes/queryAll',
        method:'get'
    },
    insertData:{
        url:'/classes/insertClasses',
        method:'post'
    },
    updateData:{
        url:'/classes/updateClasses',
        method:'post'
    },
    deleteData:{
        url:'/classes/deleteClassesById',
        method:'post'
    },
    getTeacherList:{
        url:'/teacher/query',
        method:'get'
    }
}
const request = function (funcName, requestParam) {
    return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request