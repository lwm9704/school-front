export function validateMobilePhone(phone){
    if(phone === ''){
        callback(new Error('手机号不可为空'))
    }else{
        if(phone !== ''){
            var reg=/^1[3456789]\d{9}$/;
            if(!reg.test(phone))
        }
    }
}