import {
    homeTypes
} from '../../../shared/constants/Home'

const homeState = {
    type: 'Home'
}

const homeReducer = (state = homeState, action) => {
    switch (action.type) {
        case homeTypes.CHANGE_TYPE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default homeReducer