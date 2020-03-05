import WxValidate from '../../utils/WxValidate';

const rules = {
    phone: {
        required: true,
        tel: true,
    },
}
const messages = {
    phone: {
        required: '请输入手机号',
        tel: '请输入正确的手机号',
    },
}
const allRules = {
    phone: {
        required: true,
        tel: true,
    },
    code: {
        required: true,
        number: true,
        minlength: 6,
        maxlength: 6
    },

}
const allMessages = {
    phone: {
        required: '请输入手机号',
        tel: '请输入正确的手机号',
    },
    code: {
        required: '请输入验证码',
        number: '验证码格式不正确',
        minlength: '验证码格式不正确',
        maxlength: '验证码格式不正确'
    },
}
const wxV = new WxValidate(rules, messages)
const wxVAll = new WxValidate(allRules, allMessages)

export {
    wxV,
    wxVAll
}
