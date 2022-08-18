import React from 'react';
import styles from './signuppage.module.scss'
import MySignupForm from "../../UI/MySignupForm/MySignupForm";

const SignupPage = () => {
    return (
        <div className={styles.signup_page}>
            <MySignupForm/>
        </div>
    );
};

export default SignupPage;