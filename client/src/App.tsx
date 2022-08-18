import React, {useEffect} from 'react';
import AppRouter from "./router/AppRouter";
import Header from "./components/Header/Header";
import {useAppDispatch, useAppSelector} from "./hooks/useTypedSelector";
import {checkAuth} from "./store/reducers/user/actionCreators";

const App = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        if(localStorage.getItem('token')){
            dispatch(checkAuth())
        }
    }, [])
    return (
        <div>
            <Header/>
            <React.Suspense fallback={<> </>}>
                <AppRouter/>
            </React.Suspense>
        </div>
    );
};

export default App;