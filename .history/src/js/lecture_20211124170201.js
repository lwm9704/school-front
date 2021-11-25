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
    },

    getCourseList:{
        url:'/course/queryAll',
        method:'get'
    },
    getTeacherList:{
        url:'/teacher/queryAll',
        method:'get'
    },
    getGradeList:{
        url:'/classes/queryAll',
        method:'get'
    }
}
const request = function (funcName, requestParam) {
    return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request