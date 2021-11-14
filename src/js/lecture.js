import req from '../fect/rquestConfig'
const config = {
    selectData:{
        url:'/teacherCourse/queryAll',
        method:'get'
    },
    insertData:{
        url:'/teacherCourse/insertTeacherCourse',
        method:'post'
    },
    updateData:{
        url:'/teacherCourse/updateTeacherCourse',
        method:'post'
    },
    deleteData:{
        url:'/teacherCourse/deleteTeacherCourseById',
        method:'post'
    }
}
const request = function (funcName, requestParam) {
    return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request