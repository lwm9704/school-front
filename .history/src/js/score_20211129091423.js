import req from '../fect/rquestConfig'
const config = {
    selectData:{
        url:'/examinationResults/queryAll',
        method:'get'
    },
    insertData:{
        url:'/examinationResults/insertExaminationResults',
        method:'post'
    },
    updateData:{
        url:'/examinationResults/updateExaminationResults',
        method:'post'
    },
    deleteData:{
        url:'/examinationResults/deleteExaminationResultsById',
        method:'post'
    },
    getGradeList:{
        url:'/classes/queryAll',
        method:'get'
    },
    getCourseList:{
        url:'/course/queryAll',
        method:'get'
    },
    getStudentList:{
        url:'/student/queryAll',
        method:'get'
    },
    deleteList:{
        url:'/examinationResults/deleteList',
        method:'post'
    }
}
const request = function (funcName, requestParam) {
    return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request