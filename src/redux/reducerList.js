import authReducer from './auth/authReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    authReducer
})

export default rootReducer