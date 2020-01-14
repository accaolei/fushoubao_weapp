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
