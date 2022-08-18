import {ICategory} from "../../../models/ICategory";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CategorySlice {
    isLoading: boolean
    categories: ICategory[]
    error: string
}

const initialState: CategorySlice = {
    categories: [],
    isLoading: false,
    error: ''
}

export const categorySlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {
        categoriesFetching(state){
            state.isLoading = true
        },
        categoriesFetchingSuccess(state, action: PayloadAction<ICategory[]>){
            state.isLoading = false
            state.error = ''
            state.categories = action.payload
        },
        categoriesFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        },
    }
})

export const {categoriesFetchingSuccess, categoriesFetchingError, categoriesFetching} = categorySlice.actions
export default categorySlice.reducer

