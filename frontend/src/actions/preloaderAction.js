import { 
    PRELOADER_START, 
    PRELOADER_END,  
} from '../constants/preloaderConstants'

export const preloaderStart = () => async (dispatch) => {
    dispatch({type: PRELOADER_START})
}

export const preloaderEnd = () => async (dispatch) => {
    dispatch({type: PRELOADER_END})
}

