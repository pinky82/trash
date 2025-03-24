import { request } from '../utils/request';


export const orderService = {
    createOrder: async (data: any) => {
        const response = await request.post('/orders', data)
        return response.data
    },
    getOrders: async () => {
        const response = await request.get('/orders')
        return response.data
    }
}

