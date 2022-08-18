import {IRoute} from "../models/IRoute";
import HomePage from "../pages/HomePage/HomePage";
import {lazy} from "react";

const NewsPage = lazy(() => import("../pages/NewsPage/NewsPage"))
const AdminPage = lazy(() => import("../pages/AdminPage/AdminPage"))
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"))
const SignupPage = lazy(() => import("../pages/SignupPage/SignupPage"))

enum pathEnum{
    HOME = "/",
    LOGIN = "/login",
    NEWS = "/news/:id",
    ADMIN = "/admin",
    SIGNUP = "/signup"
}

export const publicRoutes: IRoute[] = [
    {
        path: pathEnum.HOME,
        element: <HomePage/>
    },
    {
        path: pathEnum.SIGNUP,
        element: <SignupPage/>
    },
    {
        path: pathEnum.LOGIN,
        element: <LoginPage/>
    },
    {
        path: pathEnum.NEWS,
        element: <NewsPage/>
    }
]

export const privateRoutes: IRoute[] = [
    ...publicRoutes,
    {
        path: pathEnum.ADMIN,
        element: <AdminPage/>
    }
]