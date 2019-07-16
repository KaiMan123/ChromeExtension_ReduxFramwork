import {
    homeTypes
} from '../constants/Home'

export const homeActions = {
    changeType: (type) => ({
        type: homeTypes.CHANGE_TYPE,
        payload: {type}
    })
}