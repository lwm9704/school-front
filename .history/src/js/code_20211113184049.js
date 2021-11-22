import req from '../fect/rquestConfig'
const config = {
    selectData: {
        url: '/code/queryAll',
        method: 'get'
    },
    insertData: {
        url: '/code/insertCode',
        method: 'post'
    },
    updateData: {
        url: '/code/updateCode',
        method: 'post'
    },
    deleteData: {
        url: '/code/deleteCodeById',
        method: 'post'
    },

    selectDetailData: {
        url: '/codeDetailed/queryAll',
        method: 'get'
    },
    insertDetailData: {
        url: '/codeDetailed/insertCodeDetailed',
        method: 'post'
    },
    updateDetailData: {
        url: '/codeDetailed/updateCodeDetailed',
        method: 'post'
    },
    deleteDetailData: {
        url: "/codeDetailed/deleteCodeDetailedById",
        method: 'post'
    }
}
const request = function (funcName, requestParam) {
    return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request