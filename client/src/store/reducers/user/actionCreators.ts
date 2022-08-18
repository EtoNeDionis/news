import {AppDispatch} from "../../index";
import hosts from '../../../http/index'
import {IUser} from "../../../models/IUser";
import {userFetching, userFetchingError, userFetchingSuccess, userLogout} from "./userSlice";
import axios from "axios";

const {$authHost, $host} = hosts

export const registration = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userFetching())
        const response = await $authHost.post<IUser>('/signup', {email, password})
        localStorage.setItem('token', response.data.accessToken)
        dispatch(userFetchingSuccess(response.data))
    } catch (e) {
        if (e instanceof Error) dispatch(userFetchingError(e.message))
    }
}

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(userFetching())
        const response = await $authHost.post<IUser>('/login', {email, password})
        localStorage.setItem('token', response.data.accessToken)
        dispatch(userFetchingSuccess(response.data))
        return response
    } catch (e) {
        console.log('error')
        if (e instanceof Error) dispatch(userFetchingError(e.message))
    }
}

export const logout = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userFetching())
        await $authHost.post('/logout')
        localStorage.removeItem('token')
        dispatch(userLogout())
    } catch (e) {
        if (e instanceof Error) dispatch(userFetchingError(e.message))
    }
}

export const checkAuth = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userFetching())
        const response = await $authHost.get(`${process.env.REACT_APP_API_URL}refresh`)
        localStorage.setItem('token', response.data.accessToken)
        dispatch(userFetchingSuccess(response.data))
    } catch (e) {
        if (e instanceof Error) dispatch(userFetchingError(e.message))
    }
}