import React, { useState, useEffect, Component } from 'react'
import Button from '@material-ui/core/Button'
import Register from '../../components/Register/Register'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { userRegister } from '../../actions/userAction'
// scss
import classes from './RegisterScreen.module.scss'

const RegisterScreen = ({ match, history }) => {

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
      const [name, setName] = useState('')
      const [qualification, setQualification] = useState('')
      const [specialty, setSpecialty] = useState('')
      const [price, setPrice] = useState('')

      const onEmailChange = (e) =>{
        setEmail(e.target.value)
      }  
      const onPasswordChahge = (e) =>{
        setPassword(e.target.value)
      }
      const onNameChange = (e) =>{
        setName(e.target.value)
      }
      const onQualificationChange = (e) =>{
        setQualification(e.target.value)
      }
      const onSpecialtyChange = (e) =>{
        setSpecialty(e.target.value)
      }
      const onPriceChange = (e) =>{
        setPrice(e.target.value)
      }
      const onSigninSubmit = (e) =>{
        e.preventDefault();
        dispatch(userRegister(email, password, name, qualification, price, specialty))
      }
    return (
        <>
            <div> 
                <Register 
                    onSigninSubmit={onSigninSubmit} 
                    onEmailChange={onEmailChange}
                    email={email}
                    password={password}
                    onPasswordChahge={onPasswordChahge}
                    name={name}
                    onNameChange={onNameChange}
                    qualification={qualification}
                    onQualificationChange={onQualificationChange}
                    specialty={specialty}
                    onSpecialtyChange={onSpecialtyChange}
                    price={price}
                    onPriceChange={onPriceChange}
                />
            </div>
        </>
    )
}

export default RegisterScreen
