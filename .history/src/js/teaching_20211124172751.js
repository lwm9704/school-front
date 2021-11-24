import req from '../fect/rquestConfig'
const config = {
    selectData:{
        url:'/teaching/queryAll',
        method:'get'
    },
    insertData:{
        url:'/teaching/insertTeaching',
        method:'post'
    },
    updateData:{
        url:'/teaching/updateTeaching',
        method:'post'
    },
    deleteData:{
        url:'/teaching/deleteTeachingById',
        method:'post'
    },
    getClassesList:{
        url:'/classes/queryAll',
        method:'get'
    },
    getTeacherList:{
        url:'/teacher/queryAll',
        method:'get'
    },
    getCourseList:{
        url:'/course/queryAll',
        method:'get'
    },
    
}
const request = function (funcName, requestParam) {
    return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request