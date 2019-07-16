import { Store, applyMiddleware } from 'webext-redux';

import thunk from 'redux-thunk'

const middlewares = [thunk]

const proxyStore = new Store({
    portName: 'LOCALSTORE',
});

if (process.env.NODE_ENV === `development`) {
    const { createLogger } = require(`redux-logger`)

    const logger = createLogger({
        collapsed: true,
        stateTransformer: state => JSON.parse(JSON.stringify(state)),
    })

    middlewares.push(logger)
}

const store = applyMiddleware(proxyStore, ...middlewares);

export default store
