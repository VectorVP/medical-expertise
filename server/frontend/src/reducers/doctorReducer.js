import { 
    DOCTORS_LIST_REQUEST, 
    DOCTORS_LIST_SUCCESS, 
    DOCTORS_LIST_FAIL, 

    DOCTOR_FAIL,
    DOCTOR_SUCCESS,
    DOCTOR_REQUEST
} from '../constants/doctorsConstants'

export const doctorsListPeducer = (state = { doctors:[]}, action) => {
    switch (action.type) {
        case DOCTORS_LIST_REQUEST:
            return { loading: true }
        case DOCTORS_LIST_SUCCESS:
            return { 
                loading: false, 
                doctors: action.payload,
            } 
        case DOCTORS_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const doctorPeducer = (state = { doctor:{} }, action) => {
    switch (action.type) {
        case DOCTOR_REQUEST:
            return { loading: true }
        case DOCTOR_SUCCESS:
            return { 
                loading: false, 
                doctor: action.payload,
            } 
        case DOCTOR_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}