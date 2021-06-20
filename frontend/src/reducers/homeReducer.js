import { 
    SET_PLACE,
} from '../constants/homeConstants'

export const placeReducer = (state={place:1}, action) => {
    switch (action.type) {
        case SET_PLACE:
            return { 
                place: action.payload
            }
        default:
            return state
    }
}