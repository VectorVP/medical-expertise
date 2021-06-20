import { 
    SET_PLACE,
} from '../constants/homeConstants'
import axios from "axios"

export const setPlaceSelect = (place) => async (dispatch) => {
    dispatch({type: SET_PLACE, payload:place})
}