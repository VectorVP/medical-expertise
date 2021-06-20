import { 
    SET_QUALITY_TABS,
    SET_QUALITY_IMAGE, 
    DATA_FROM_FLASK,
} from '../constants/qualityConstants'

export const qualityReducer = (state = {tab:1}, action) => {
    switch (action.type) {
        case SET_QUALITY_TABS:
            return { 
                tab: action.payload,
            }
        default:
            return state
    }
}

export const setImageReducer = (state = {image:""}, action) => {
    switch (action.type) {
        case SET_QUALITY_IMAGE:
            console.log("image in reducer ", action.payload)
            return { 
                image: action.payload,
            }   
        default:
            return state
    }
}

export const flaskDataReducer = (state = {}, action) => {
    switch (action.type) {
        case DATA_FROM_FLASK:
            return { 
                flaskData: action.payload,
            }
        default:
            return state
    }
}