export function validateMobilePhone(phone,callback){
    if(phone === ''){
        callback(new Error('手机号不可为空'))
    }else{
        if(phone !== ''){
            var reg=/^1[3456789]\d{9}$/;
            if(!reg.test(phone)){
                callback(new Error('请输入有效的手机号码'));
            }
        }
        callback();
    }
}

export function validateEmail(email,callback){
    if(email === ''){
        callback()
    }
}