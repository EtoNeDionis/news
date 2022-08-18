import React from 'react';
import {useAppSelector} from "../hooks/useTypedSelector";
import {Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./routes";

const AppRouter = () => {
    const {isAuth} = useAppSelector(state => state.userReducer)
    return (
        isAuth ?
            <Routes>
                {privateRoutes.map(({path, element}) =>
                    <Route key={path} path={path} element={element}/>
                )}
            </Routes>
            :
            <Routes>
                {publicRoutes.map(({path, element}) =>
                    <Route key={path} path={path} element={element}/>
                )}
            </Routes>
    );
};

export default AppRouter;