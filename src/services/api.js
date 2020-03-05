import Request from '../utils/request';

export const ProductType = data => Request({
  url: `/v1/shop/${data.id}/type`,
  method: 'GET',
  data: {
    ...data
  }
})


export const ProudctList = data => Request({
  url: `/v1/shop/${data.id}/product`,
  method: 'GET',
  data: {
    ...data
  }
})

export const Login = data => Request({
  url: `/v1/user/login`,
  method: 'POST',
  data: {
    ...data
  }
})


export const jsCode2Session = (data) => Request({
  url: '/v1/user/wx_login',
  method: 'POST',
  data: {
    ...data
  },
})
// profile

export const userProfile = (data) => Request({
  url: '/v1/user/profile',
  method: 'GET',
})

export const phoneCode = (data) => Request({
  url: '/v1/user/app/smscode',
  method: 'POST',
  data: {
    ...data
  }
})

export const createAddress = (data) => Request({
  url: '/v1/user/address',
  method: 'POST',
  data: {
    ...data
  }
})

export const getAddress = (data) => Request({
  url: '/v1/user/address',
  method: 'GET',
})

export const deleteAddress = (data) => Request({
  url: `/v1/user/address/${data.id}`,
  method: 'DELETE',
})