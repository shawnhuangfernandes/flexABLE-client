import authReducer from './auth/authReducer'
import calendarReducer from './calendar/calendarReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    authReducer,
    calendarReducer
})

export default rootReducer