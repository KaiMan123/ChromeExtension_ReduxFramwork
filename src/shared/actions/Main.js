import {
    mainTypes
} from '../constants/Main'

export const mainActions = {
    changeNum: (num) => ({
        type: mainTypes.CHANGE_NUM,
        payload: {num}
    })
}