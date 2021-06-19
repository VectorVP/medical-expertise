import axios from 'axios'
import { 
    USER_LOGIN_REQUEST,
    USER_LOGOUT,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_RESET,
    USER_LIST_RESET,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

    SET_NUMBER,
} from '../constants/userConstansts'

export const userLogin = (email, password) => async (dispatch) => {
    try {
       dispatch({
           type: USER_LOGIN_REQUEST
       })
       const config = {
           headers: {
               'Content-Type':'application/json'
           }
       }
       const { data } = await axios.post('/api/users/login', {email, password}, config)
       
       dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
       })
       
       localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}

export const userRegister = (email, password, name, qualification, price, specialty) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const { data } = await axios.post(
                '/api/users/register', 
                { email, password, name, qualification, price, specialty }, 
                config
            )
 
        dispatch({
             type: USER_REGISTER_SUCCESS,
             payload: data
        })  
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
       })

        localStorage.setItem('userInfo', JSON.stringify(data))
     } catch (error) {
         dispatch({
             type: USER_REGISTER_FAIL,
             payload: error.response && error.response.data.message ?
             error.response.data.message :
             error.message
         })
     }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const config = {
            headers: {
                'Content-Type':'application/json',
                 Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users/${id}`,config)
 
        dispatch({
             type: USER_DETAILS_SUCCESS,
             payload: data
        })  
     
     } catch (error) {
         dispatch({
             type: USER_DETAILS_FAIL,
             payload: error.response && error.response.data.message ?
             error.response.data.message :
             error.message
         })
     }
}

export const userLogout = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: USER_DETAILS_RESET
    })
    dispatch({
        type: USER_LIST_RESET
    })
}

export const setNumberofLink = (number) => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: SET_NUMBER,
        payload: number,
    })
}