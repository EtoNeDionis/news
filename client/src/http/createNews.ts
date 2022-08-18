import api from './index'

const {$authHost} = api
export const createNews = async (news: any) => {
    const response = await $authHost.post('/news/add', news)
    return response.data
}