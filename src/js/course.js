import req from '../fect/rquestConfig'
const config = {
    selectData:{
        url:'/course/queryAll',
        method:'get'
    },
    insertData:{
        url:'/course/insertCourse',
        method:'post'
    },
    updateData:{
        url:'/course/updateCourse',
        method:'post'
    },
    deleteData:{
        url:'/course/deleteCourseById',
        method:'post'
    }
}
const request = function (funcName, requestParam) {
    return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request