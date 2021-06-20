import { 
    NEWS_LIST_REQUEST, 
    NEWS_LIST_SUCCESS, 
    NEWS_LIST_FAIL, 
    NEWS_LIST_RESET,
    CREATE_NEW_SUCCESS,
    CREATE_NEW_FAIL,
    CREATE_REQUEST_END,
} from '../constants/newsConstants'

export const newsListPeducer = (state = {news:[], docs:[]}, action) => {
    switch (action.type) {
        case NEWS_LIST_REQUEST:
            return { loading: true }
        case NEWS_LIST_SUCCESS:
            return { 
                loading: false, 
                news: action.payload.news,
                docs: action.payload.docs,
            } 
        case NEWS_LIST_FAIL:
            return { loading: false, error: action.payload }
        case NEWS_LIST_RESET:
            return { news:[] }
        default:
            return state
    }
}

export const createNewReducer = (state = { created: false }, action) => {
    switch (action.type) {
        case CREATE_NEW_SUCCESS:
            return { 
                state: action.payload,
                created: true,
            } 
        case CREATE_REQUEST_END:
            return { 
                created: false,
            } 
        case CREATE_NEW_FAIL:
            return { error: action.payload }
        default:
            return state
    }
}

