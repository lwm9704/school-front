import { call } from "file-loader";

export function validateMobilePhone(phone, callback) {
    if (phone === '') {
        callback(new Error('手机号不可为空'));
    } else {
        if (phone !== '') {
            var reg = /^1[3456789]\d{9}$/;
            if (!reg.test(phone)) {
                callback(new Error('请输入有效的手机号码'));
            }
        }
        callback();
    }
}

export function validateEmail(email, callback) {
    if (email === '') {
        callback(new Error('请填写正确邮箱'));
    } else {
        if (email !== '') {
            var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (!reg.test(email)) {
                callback(new Error('请输入有效邮箱'));
            }
        }
        callback();
    }
}
export function vaildate

