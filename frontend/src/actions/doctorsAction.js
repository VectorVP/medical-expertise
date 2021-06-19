import axios from 'axios'
import { 
    DOCTORS_LIST_REQUEST, 
    DOCTORS_LIST_SUCCESS, 
    DOCTORS_LIST_FAIL,

    DOCTOR_REQUEST,
    DOCTOR_SUCCESS,
    DOCTOR_FAIL, 
} from '../constants/doctorsConstants'

import { PRELOADER_END, PRELOADER_START } from '../constants/preloaderConstants'

export const listDoctors = () => async (dispatch) => {
    try {
            dispatch({type: PRELOADER_START})
            dispatch({type: DOCTORS_LIST_REQUEST})
            
            const { data } = await axios.get(`/api/doctors`)

                dispatch({
                    type: DOCTORS_LIST_SUCCESS,
                    payload: data
                })
                dispatch({type: PRELOADER_END})
        }
     catch (error) {
        dispatch({
            type: DOCTORS_LIST_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}

export const getDoctorById = (doctorId) => async (dispatch) => {
    try {
            dispatch({type: PRELOADER_START})
            dispatch({type: DOCTOR_REQUEST})
            
            const { data } = await axios.get(`/api/doctors/${doctorId}`)
            console.log('data ', data)
                dispatch({
                    type: DOCTOR_SUCCESS,
                    payload: data
                })
                dispatch({type: PRELOADER_END})
        }
     catch (error) {
        dispatch({
            type: DOCTOR_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}