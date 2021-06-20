import {
    createStore, combineReducers, applyMiddleware 
} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

//reducers
import { newsListPeducer, createNewReducer } from './reducers/newsReducer'
import { preloaderReducer } from './reducers/preloaderReducer'
import { doctorsListPeducer, doctorPeducer } from './reducers/doctorReducer'
import { userLoginPeducer, userRegisterPeducer, userDetailsReducer, linkReducer } from './reducers/userReducer'
import { qualityReducer, flaskDataReducer, setImageReducer } from './reducers/qualityReducer'
import { placeReducer } from './reducers/homeReducer'

const reducer = combineReducers({
    news:newsListPeducer,
    preloader: preloaderReducer,
    doctors: doctorsListPeducer,
    doctor: doctorPeducer,
    createdNew: createNewReducer,
    userLogin: userLoginPeducer,
    userRegister: userRegisterPeducer,
    userDetails: userDetailsReducer,
    linkNumber: linkReducer,
    qualityNumber: qualityReducer,
    qualityData: flaskDataReducer,
    qualityImage: setImageReducer,
    place: placeReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
JSON.parse(localStorage.getItem('userInfo')) : null

const intitialState = {
    userLogin: { userInfo: userInfoFromStorage },
    // добавить инишиал стор номеров табов
} // start with default store

const middleware = [thunk]

const store = createStore(
    reducer, 
    intitialState, 
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
) // create global store


export default store