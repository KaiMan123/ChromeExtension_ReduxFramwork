import {
    mainTypes
} from '../../../shared/constants/Main'

const mainState = {
    num: 1
}

const mainReducer = (state = mainState, action) => {
    switch (action.type) {
        case mainTypes.CHANGE_NUM:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default mainReducer