import api from './index'

const {$authHost} = api
export const createCategory = async (body:string) => {
    try{
        const response = await $authHost.post('/category/add', {body})
        console.log(response)
    }catch (e) {
        if(e instanceof Error) console.log(e.message)
    }
}