import { combineReducers } from 'redux'
import authReducer from './auth'

export default combineReducers({
    currentUser: authReducer
})