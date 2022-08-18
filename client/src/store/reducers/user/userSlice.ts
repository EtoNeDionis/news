import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../../models/IUser";

interface UserState{
    isAuth: boolean,
    user: IUser,
    error: string,
    isLoading: boolean
}

const initialState: UserState = {
    isAuth: false,
    user: {} as IUser,
    error: '',
    isLoading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        userFetching(state){
            state.isLoading = true
        },
        userFetchingSuccess(state, action: PayloadAction<IUser>){
            state.isAuth = true
            state.isLoading = false
            state.error = ''
            state.user = action.payload
        },
        userLogout(state){
            state.isAuth = false
            state.isLoading = false
            state.error = ''
            state.user = {} as IUser
        },
        userFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export const {userLogout,userFetching, userFetchingSuccess, userFetchingError} = userSlice.actions
export default userSlice.reducer
