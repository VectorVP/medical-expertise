import React, { useState, useEffect, Component } from 'react'
import Button from '@material-ui/core/Button'
import Login from '../../components/Login/Login'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../actions/userAction'
// scss
import classes from './LoginScreen.module.scss'

const LoginScreen = ({ match, history }) => {

    const dispatch = useDispatch()
    const userLoginq = useSelector(state => state.userLogin)
    const {userInfo} = userLoginq

    useEffect( () => {
        if (userInfo) {
            history.push('/')
        }
    }, [dispatch, userInfo])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

      const onEmailChange = (e) =>{
        setEmail(e.target.value)
      }  
      const onPasswordChahge = (e) =>{
        setPassword(e.target.value)
      }
      const onSigninSubmit = (e) =>{
        e.preventDefault();
        dispatch(userLogin(email, password))
      }
    
    return (
        <>
            <div> 
                <Login 
                    onSigninSubmit={onSigninSubmit} 
                    onEmailChange={onEmailChange}
                    email={email}
                    password={password}
                    onPasswordChahge={onPasswordChahge}
                />
            </div>
        </>
    )
}

export default LoginScreen
