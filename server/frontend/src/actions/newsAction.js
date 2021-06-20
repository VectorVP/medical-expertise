import axios from 'axios'
import { 
    NEWS_LIST_REQUEST, 
    NEWS_LIST_SUCCESS, 
    NEWS_LIST_FAIL, 
    CREATE_NEW_SUCCESS,
    CREATE_NEW_FAIL,
    CREATE_REQUEST_END,
} from '../constants/newsConstants'

import { PRELOADER_END, PRELOADER_START } from '../constants/preloaderConstants'

export const listNews = () => async (dispatch) => {
    try {
            dispatch({type: PRELOADER_START})
            dispatch({type: NEWS_LIST_REQUEST})
            
            const { data } = await axios.get(`/api/home`)
                dispatch({
                    type: NEWS_LIST_SUCCESS,
                    payload: data
                })
                dispatch({type: PRELOADER_END})
        }
     catch (error) {
        dispatch({
            type: NEWS_LIST_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}

export const likeNew = (new_id) => async (dispatch, getState) => {
    console.log("new_id", new_id)

    try {
        const config = {
            headers: {
                'Content-Type':'application/json',
                 Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        await axios.post(`/api/home`, new_id, config)

    } catch(error) {
        dispatch({
            type: NEWS_LIST_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}

export const createNew = (image, type, descr, text, doc) => async (dispatch, getState) => {
    console.log("image, type, descr, text, doc", image, type, descr, text, doc)

    try{
        dispatch({type: PRELOADER_START})
        const config = {
            headers: {
                'Content-Type':'application/json',
                 Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        }
        const response = await axios.post(`/api/home/create`, {image, type, descr, text, doc}, config)
        console.log("response ", response)
        dispatch({
            type:CREATE_NEW_SUCCESS,
            payload: response,
        })
        dispatch({type:CREATE_REQUEST_END})
        dispatch({type: PRELOADER_END})
    } catch(error) {
        dispatch({
            type: CREATE_NEW_FAIL,
            payload: error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}