import { combineReducers } from 'redux'
import homeReducer from './homeReducer'
import mainReducer from './mainReducer'

export default combineReducers({
    home: homeReducer,
    main: mainReducer
})
