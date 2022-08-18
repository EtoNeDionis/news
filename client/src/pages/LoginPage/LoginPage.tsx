import React from 'react';
import styles from './loginpage.module.scss'
import MyLoginForm from "../../UI/MyLoginForm/MyLoginForm";


const LoginPage = () => {
    return (
        <div className={styles.login_page}>
            <MyLoginForm/>
        </div>
    );
};

export default LoginPage;