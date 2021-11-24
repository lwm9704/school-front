import req from '../fect/rquestConfig'
const config = {
    searchData: {
        url: '/user/selectOfCondition',
        method: 'get'
    },
    insertUser: {
        url: '/user/insertUser',
        method: 'post'
    },
    updateUser: {
        url: '/user/updateUser',
        method: 'post'
    },
    deleteUser: {
        url: '/user/deleteUserById',
        method: 'post'
    },
    insertStudent: {
        url: 'student/insertStudent',
        method: 'post'
    },
    updateStudent: {
        url: '/student/updateStudent',
        method: 'post'
    },
    deleteStudent: {
        url: '/student/deleteStudentById',
        method: 'post'
    },
    getStudentInfoById:{
        url:'/student/selectOne',
        method:'get'
    },

    insertTeacher: {
        url: '/teacher/insertTeacher',
        method: 'post'
    },
    updateTeacher: {
        url: '/teacher/updateTeacher',
        method: 'post'
    },
    deleteTeacher: {
        url: '/teacher/deleteTeacherById',
        method: 'post'
    },
    getTeacherInfoById:{
        url:'/teacher/selectOne',
        method:'get'
    },

    getClassList:{
        url:'/classes/queryAll',
        method:'get'
    }


}
const request = function (funcName, requestParam) {
    return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request