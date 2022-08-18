import {IUserData} from "./IUserData";

export interface IUser {
    user: IUserData
    refreshToken: string
    accessToken: string
}