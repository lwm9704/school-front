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
    deleteUser: {
        url: '/student/deleteStudentById',
        method: 'post'
    },

    insertTeacher: {
        url: '/teacher/insertTeacher',
        method: 'post'
    },
    updateStudent: {
        url: '/teacher/updateTeacher',
        method: 'post'
    },
    deleteUser: {
        url: '/teacher/deleteTeacherById',
        method: 'post'
    },

}
const request = function (funcName, requestParam) {
    return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request