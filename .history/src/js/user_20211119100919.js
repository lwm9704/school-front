import req from '../fect/rquestConfig'
const config = {
    selectData: {
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
        url: '/user/updateStudent',
        method: 'post'
    },
    deleteUser: {
        url: '/user/deleteStudentById',
        method: 'post'
    },

}
const request = function (funcName, requestParam) {
    return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request