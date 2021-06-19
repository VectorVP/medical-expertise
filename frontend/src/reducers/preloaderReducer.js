import { 
    PRELOADER_START, 
    PRELOADER_END, 
} from '../constants/preloaderConstants'

export const preloaderReducer = (state = {}, action) => {
    switch (action.type) {
        case PRELOADER_START:
            return { preLoading: true }
        case PRELOADER_END:
            return { 
                preLoading: false, 
            } 
        default:
            return state
    }
}