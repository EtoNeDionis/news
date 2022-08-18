import {AppDispatch} from "../../index";
import hosts from '../../../http/index'
import {categoriesFetching, categoriesFetchingError, categoriesFetchingSuccess} from "./categorySlice";
import {ICategory} from "../../../models/ICategory";

const {$host, $authHost} = hosts
export const fetchCategories = () => async (dispatch: AppDispatch) => {
    try{
        dispatch(categoriesFetching())
        const response = await $authHost.get<ICategory[]>('/category')
        dispatch(categoriesFetchingSuccess(response.data))
    } catch (e) {
        if(e instanceof Error) dispatch(categoriesFetchingError(e.message))
    }
}

