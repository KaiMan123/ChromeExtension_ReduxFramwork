import { applyMiddleware, createStore } from 'redux'
import { wrapStore } from 'webext-redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from '../reducers'

const logger = createLogger({
    collapsed: true,
})

const initialState = {}

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
        thunk,
        logger,  // NOTE: logger _must_ be last in middleware chain
    ),
)

wrapStore(store, {
    portName: 'LOCALSTORE',
})

export default store
