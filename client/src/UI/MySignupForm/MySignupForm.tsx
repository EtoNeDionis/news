import React, {useState} from 'react';
import styles from './mysignupform.module.scss'
import {registration} from "../../store/reducers/user/actionCreators";
import {useAppDispatch} from "../../hooks/useTypedSelector";
import {useNavigate} from "react-router-dom";


const MySignupForm = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('Нужно ввести почту')
    const [passwordError, setPasswordError] = useState<string>('Сюда нужно ввести пароль')
    const [isEmailError, setIsEmailError] = useState<boolean>(false)
    const [isPasswordError, setIsPasswordError] = useState<boolean>(false)

    //для валидации почты
    const emailHandler = (e: any) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Неправильный адрес почты')
        } else {
            setEmailError('')
            setIsEmailError(false)
        }
    }

    //для валидации пароля
    const passwordHandler = (e: any) => {
        setPassword(e.target.value)
        if (e.target.value.length < 5) {
            setPasswordError('Слишком мало символов')
        } else if (e.target.value.length > 10) {
            setPasswordError('Слишком много символов')
        } else {
            setPasswordError('')
            setIsPasswordError(false)
        }

    }
    //когда убрали курсор с инпута
    const blurHandler = (e: any) => {
        switch (e.target.name) {
            case 'email':
                if(emailError) setIsEmailError(true)
                break
            case 'password':
                if(passwordError) setIsPasswordError(true)
                break
        }
    }
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const signup = () => {
        dispatch(registration(email, password))
        navigate('/')
    }
    return (
        <div className={styles.form}>
            <input
                style={isEmailError ? {border: "1px solid red"} : {border: "1px solid green"}}
                onBlur={(e) => blurHandler(e)}
                name={'email'}
                className={styles.field}
                type={"text"} placeholder={"email"}
                onChange={(e) => emailHandler(e)}
                value={email}
            />
            {isEmailError && emailError && <div>{emailError}</div>}
            <input
                style={isPasswordError ? {border: "1px solid red"} : {border: "1px solid green"}}
                onBlur={(e) => blurHandler(e)}
                name={'password'}
                className={styles.field}
                type={"text"} placeholder={"password"}
                onChange={(e) => passwordHandler(e)} value={password}
            />
            {isPasswordError && passwordError && <div>{passwordError}</div>}
            <button className={styles.btn} onClick={() => signup()}>Зарегистрироваться
            </button>
        </div>
    );
};

export default MySignupForm;