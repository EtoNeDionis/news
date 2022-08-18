import React from 'react';
import styles from './header.module.scss'
import house from '../../assets/header/house.svg'
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/useTypedSelector";
import {logout} from "../../store/reducers/user/actionCreators";

const Header = () => {
    const {isAuth, user} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()
    return (
        <header>
            <NavLink to={'/'}>
                <img className={styles.logo} src={house}/>
            </NavLink>
            {isAuth && user.user.role === 'admin' && <NavLink className={styles.admin} to={'/admin'}>admin</NavLink>}
            {isAuth ?
                <div className={styles.container}>
                    {user.user.email}
                    <button className={styles.btn_logout} onClick={() => dispatch(logout())}>Выйти</button>
                </div>:
                <div className={styles.buttons}>
                    <NavLink to={'/login'} className={styles.btn_login}>Логин</NavLink>
                    <NavLink to={'/signup'} className={styles.btn_signup}>Sign-up</NavLink>
            </div>
            }
        </header>
    );
};

export default Header;