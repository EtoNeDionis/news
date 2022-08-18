import {AppDispatch} from "../../index";
import {newsFetching, newsFetchingError, newsFetchingSuccess} from "./newsSlice";
import hosts from '../../../http/index'
import {INews} from "../../../models/INews";

const {$host, $authHost} = hosts
export const fetchNews = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(newsFetching())
        const response = await $authHost.get<INews[]>('/news')
        console.log(response.data.sort((elem1, elem2) => elem2.id - elem1.id))
        dispatch(newsFetchingSuccess(response.data))
    } catch (e) {
        if (e instanceof Error) dispatch(newsFetchingError(e.message))
    }
}

export const fetchOneNews = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(newsFetching())
        const response = await $host.get<INews>(`/news/${id}`)
        return response
    } catch (e) {
        if (e instanceof Error) dispatch(newsFetchingError(e.message))
    }
}
