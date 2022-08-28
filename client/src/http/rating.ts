import api from './index'
import axios from "axios";

const {$authHost} = api
export const setRating = async (newsId: number, userId: number, rate: number) => {
    try {
        return await $authHost.post('/news/add_rating', {newsId, userId, rate})
    } catch (e) {
        if (e instanceof Error) console.log(e.message)
    }
}