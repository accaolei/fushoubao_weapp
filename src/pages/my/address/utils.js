import WxValidate from '../../../utils/WxValidate';

const rules = {
    name: {
        required: true,
    },
    phone: {
        required: true,
        tel: true,
    },
    address: {
        required: true,
        minlength: 5,
        maxlength: 100,
    }
}
const messages = {
    name: {
        required: '请输入收件人'
    },
    phone: {
        required: '请输入联系人手机号',
        tel: '请输入正确的手机号'
    },
    address: {
        required: '请输入配送地址',
        minlength: '请输入正确的配置地址',
        maxlength: '请输入正确的配置地址'
    }
}

const addressValidate = new WxValidate(rules, messages)
export {
    addressValidate
}

