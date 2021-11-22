import axios from 'axios'
import { throwErr } from './throwErr'

// const urlHead = 'http://305o99f251.wicp.vip'
const urlHead = 'http://localhost:8080/mySchool'
const qs = require('qs')

/**
 *
 * @param {String} url 请求路径
 * @param {String} method 请求方法
 * @param {Object} params 请求参数
 * @param {Object} requestHeader 请求头
 * @param {Object} fileConfig ---> {type, fileName} 导出配置 ---> 导出类型, 文件名称
 */
const req = function (url, method, params, requestHeader, fileConfig = {}) {

    let instance = axios.create({
        baseURL: urlHead,
        timeout: 60000


    Proxy
    })

    // 添加请求拦截器
    instance.interceptors.request.use(config => {
        return config
    }, error => {
        return Promise.reject(error)
    })

    let requestConfig = {
        url: url,
        method: method, 
        //将header、params、token复制到目标
        // params: Object.assign({}, params, { access_token: JSON.parse(sessionStorage.getItem('userInfo')).access_token }),
        // data: qs.stringify(Object.assign({}, params, { access_token: JSON.parse(sessionStorage.getItem('userInfo')).access_token })),
        params: Object.assign({}, params),
        data:qs,
        headers: {},
        responseType: fileConfig.type === 'file' ? 'blob' : ''
    }

    let getReg = /get|GET/
    let postReg = /post|POST/

    let fileData = {}

    let timer = null

    // 请求类型为导出时，添加vuex状态管理，定时修改vuex对应记录，请求完成或者请求报错时，停止定时器
    if (fileConfig.type === 'file') {
        fileData = {
            fileId: new Date().getTime(),
            fileName: fileConfig.fileName,
            fileLoadTime: 0,
            fileStatus: 'downloading',
            errorInfo: '',
            fileUrl: null
        }

    }

    if (getReg.test(requestConfig.method)) {
        delete requestConfig.data
        requestConfig.headers['Content-Type'] = 'application/json'
    } else if (postReg.test(requestConfig.method)) {
        delete requestConfig.params
        requestConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    // 添加响应拦截器
    instance.interceptors.response.use(response => {
        clearInterval(timer)
        timer = null

        if (response.status === 200) {
            if (fileConfig.type === 'file') {
                fileData.fileStatus = 'success'
                fileData.fileUrl = window.URL.createObjectURL(new Blob([response.data]))
                // store.commit('changeExportFileList', fileData)
            }

            return response.data
        } else {
            if (fileConfig.type === 'file') {
                fileData.fileStatus = 'error'
                // store.commit('changeExportFileList', fileData)
            }

            throw new Error(throwErr(response))
        }
    }, error => {
        clearInterval(timer)
        timer = null

        if (fileConfig.type === 'file') {
            fileData.fileStatus = 'error'
            // store.commit('changeExportFileList', fileData)
        }

        return Promise.reject(error)
    })

    return instance(requestConfig)
}

export default req
