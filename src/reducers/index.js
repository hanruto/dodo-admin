import { combineReducers } from 'redux'
import authenticate from './authenticate'

function reducer(state, action) {
    return {
        authenticate: authenticate(state.authenticate, action)
    }
}

export default reducer;