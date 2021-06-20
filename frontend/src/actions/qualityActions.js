import { 
    SET_QUALITY_TABS,
    SET_QUALITY_IMAGE,
    DATA_FROM_FLASK, 
} from '../constants/qualityConstants'
import axios from "axios"

export const setQualityTab = (number) => async (dispatch) => {
    dispatch({type: SET_QUALITY_TABS, payload: number})
}

export const setImage = (image) => async (dispatch) => {
    console.log("image ", image)
    dispatch({type: SET_QUALITY_IMAGE, payload: image})
}

export const sendQualityData = (formData, age, type, mkb) => async (dispatch) => {
    try {
        const { data } = await axios.post(`/api/qualityControl`, formData, {
            headers: {
                'Content-Type': 'text/plain'
            }
        })
       
        dispatch({
            type: DATA_FROM_FLASK,
            payload: data
       })  
    } catch (error) {
        console.log("error ", error)
    }
}
