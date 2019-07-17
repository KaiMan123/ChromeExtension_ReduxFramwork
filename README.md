# Redux Chrome Extension Sample
The purpose for this sample is introducing the usage of react-redux in chrome extension writing in react js. Moreover, it is designed as simple reusable framework for future. You can simply work on this package to create different chrome extensions.

## Installation of this Chrome Extension
1. cd ~

2. git clone https://github.com/KaiMan123/reduxChromeExtensionSample

3. cd reduxChromeExtensionSample

4. npm install

5. npm run build

6. npm run build-bg

7. ** Open Chrome

8. ** Go to line chrome://extensions/

9. ** Choose `Load unpacked`

10. ** When ask the path of extension, choose `~/reduxChromeExtensionSample/build`

**Reminder:** If you want to change the content of this sample, you have to call following command every time

1. npm run build

2. npm run build-bg

## Library
These are the main library used in this sample.
#### React js + Material UI
[React js](https://reactjs.org/docs/getting-started.html) is the base language of this sample and [Material UI](https://material-ui.com/getting-started/installation/) is used for the basic UI of this sample.

#### Webext-redux
[Webext-redux](https://www.npmjs.com/package/webext-redux) is used for the loacl temporary storage. Temporary store is better for testing. Once the chome extension is reload, all the data inside will be reflashed.

#### React-redux
[React-redux](https://redux.js.org/introduction/getting-started) is the react framework library which can help you maintain the ecosystem of your react project.

#### Chrome Extension
[Chrome Extension](https://developer.chrome.com/extensions/getstarted) is the name of the plugin of Chrome.

## Description
For using react-redux in chromem extension, you may click this [link](https://thoughtbot.com/blog/redux-for-chrome-extensions) to learn more. **Here will only talk about how this sample is constructed and how you can use this sample*.*

### How this sample is constructed
You can look at the `./src` folder which discribed the redux structure. React-redux only allow one direction data flow, either get the data from store or change the data in store, following dataflow cannot be backtracked.

**Data Flow:** Store (state) -> Containers -> Components -> Comtainers -> Actions -> Reducers -> Store (state) -> Containers...

For more specific dataflow, 

**Data Float Up:** From backend to frontend (Get the data)

Store (state) -> Containers -> Components

**Data Dive Down:** From frontend to backend (Change the data)

Components -> Comtainers -> Actions -> Reducers -> Store (state)

#### Redux Folder Management
```
Redux -> Components : ./src/frontend/Components
Redux -> Containers : ./src/frontend/Containers
Redux -> Actions    : ./src/shared/actions
Redux -> Reducers   : ./src/backend/reducers
Redux -> States     : ./src/backend/reducers
```

#### Special Folder Management (Some are essential)
1. For **React-redux**, there are **Store** in both frontend and backend. However, actions will not be stored in **Store**. Thus, we have to put it outside frontend and backend. It is stored with constants in `./src/shared` so that both frontend and backend can call the actions and constants. Or we can say, containers can call the **Actions** outside backend and **Actions** can call **Reducers** in backend. That can achieve **Data Dive Down** without connecting to **Store**.

2. For **Chrome extension**, **background.js** is at `./src/backend/background.js`. The reason is we have to use background.js to connect the **React-redux** with outside package. Thus, `import store from "./store/store";`, this line is essential in background.js, otherwise, error will occur as `no connection could be made because the target machine actively refused it`.

## How to use this sample? 
#### Example of Import New Page
Assume we want to import a new page as **newPage**,

1. Create Components `./src/frontend/components/newPage.js` with contents:
```
import React from 'react';
import { Typography, Container } from '@material-ui/core';

class newPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container>
                <Typography variant="h4" gutterBottom>You are now in newPage Page</Typography>
            </Container>
        )
    }
}

export default newPage
```

2. Create Containers `./src/frontend/containers/newPage.js` with contents:
```
import newPage from '../components/newPage'
import { newPageActions } from '../../shared/actions/newPage'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    const { newPage } = state;
    return { newPage }
}

const mapDispatchToProps = dispatch => {
    return {
        test: (type) => {
            dispatch(newPageActions.test(type))
        }
    }
}

const newPage_Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(newPage)

export default newPage_Container
```

3. Create Constants `./src/shared/constants/newPage.js` with contents:
```
export const newPageTypes = {
    TEST: 'TEST'
}
```

4. Create Actions `./src/shared/actions/newPage.js` with contents:
```
import {
    newPageTypes
} from '../constants/newPage'

export const newPageActions = {
    test: (type) => ({
        type: newPageTypes.TEST,
        payload: {type}
    })
}
```

5. Create Reducer `./src/backend/reducers/newPageReducer/index.js` with contents:
```
import {
    newPageTypes
} from '../../../shared/constants/newPage'

const newPageState = {
    type: 'Hello World'
}

const homeReducer = (state = newPageState, action) => {
    switch (action.type) {
        case newPageTypes.TEST:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default newPageReducer
```

6. Add following line with *** in the content at `./src/backend/reducers/index.js`:
```
import { combineReducers } from 'redux'
import homeReducer from './homeReducer'
import mainReducer from './mainReducer'
*** import newPageReducer from './newPageReducer'

export default combineReducers({
    home: homeReducer,
    main: mainReducer,
***    newPage: newPageReducer
})
```

7. Add following line with *** in the content at `./src/shared/constants/routes.js`:
```
const HOME_ROUTE = '/home'
const MAIN_ROUTE = '/main'
*** const NEW_ROUTE = 'home/newPage'
module.exports = {
    HOME_ROUTE,
    MAIN_ROUTE,
    *** NEW_ROUTE
}
```

#### Example of switch between different pages
After you did the above steps, a new page was settled up. However, if you want to call this page, you have two choice, either **Put it as the front page** or **Switch to this page from another apge**.

**Put it as the front page**:

1. Change following line into *** in the content at `./src/frontend/components/routes`:
```
import { HOME_ROUTE, MAIN_ROUTE } from "../../shared/constants/routes"
*** import { HOME_ROUTE, MAIN_ROUTE, NEW_ROUTE } from "../../shared/constants/routes"
```

2. Add `import newPage from '../containers/newPage';` after `import Main from '../containers/Main` in  the content at `./src/frontend/components/routes`.

3. Add `<Route path={NEW_ROUTE} component={newPage} />` between ` <Route path={MAIN_ROUTE} component={Main} />` and `<Redirect to={{ pathname: HOME_ROUTE }} />` in  the content at `./src/frontend/components/routes`.

4. Change following line into *** in the content at `./src/frontend/components/routes`:
```
<Redirect to={{ pathname: HOME_ROUTE }} />
*** <Redirect to={{ pathname: NEW_ROUTE }} />
```

Then, the init page will be newPage Page. Another way, **Switch to this page from another apge**:

1. Change following line into *** in the content at `./src/frontend/components/routes`:
```
import { HOME_ROUTE, MAIN_ROUTE } from "../../shared/constants/routes"
*** import { HOME_ROUTE, MAIN_ROUTE, NEW_ROUTE } from "../../shared/constants/routes"
```

2. Add `import newPage from '../containers/newPage';` after `import Main from '../containers/Main` in  the content at `./src/frontend/components/routes`.

3. Add `<Route path={NEW_ROUTE} component={newPage} />` between ` <Route path={MAIN_ROUTE} component={Main} />` and `<Redirect to={{ pathname: HOME_ROUTE }} />` in  the content at `./src/frontend/components/routes`.

4. Change following line into *** in the content at `./src/frontend/components/HOME`:
```
import { MAIN_ROUTE } from "../../shared/constants/routes";
*** import { MAIN_ROUTE, NEW_ROUTE } from "../../shared/constants/routes";
```

5. Add `<Button onClick={() => this.props.history.push(MEW_ROUTE)}>Click to switch pages to newPage page</Button>` just after `<Button onClick={() => this.props.history.push(MAIN_ROUTE)}>Click to switch pages</Button>` in in the content at `./src/frontend/components/HOME`.

Then, there will be a button with label `Click to switch pages to newPage page` in Home Page. Click this button can swich to newPage.

#### Example of getState
As we have created newPage Container at `./src/frontend/containers/newPage.js`, the content has already get the state from the **Store** and map into the class.
```
const mapStateToProps = state => {
    const { newPage } = state;
    return { newPage }
}
```
Thus, we can simply call `this.props.newPage.type` to get type store in state.

#### Example of do an action
Same as getState, the container at `./src/frontend/containers/newPage.js` has defined the action will be done. For example,
```
const mapDispatchToProps = dispatch => {
    return {
        changeType: (type) => {
            dispatch(homeActions.changeType(type))
        }
    }
}
```
The **changeType: (type) => {}** can be called in the newPage Class. For example, onClick={() => this.props.changeType('Hello')} or this.props.changeType('New message'). A little reminder, remember to use `() =>` for onClick function, otherwise, the function in onClick will auto compile without click event.

#### Example of do add new action
If you want to add a new function for newPage, such as, a new function can change a boolean in state called `newFlag`,

0. Ensure you add `newFlag` in newPageState in newPageReducer, that is:
```
const newPageState = {
    type: 'Hello World',
    newFlag: false
}
```
1. In `./src/shared/constants/newPage.js`, add new constants for action name, here, we call the name `CHANGE_FLAG`. Thus, the content `./src/shared/constants/newPage.js` will become:
```
export const newPageTypes = {
    TEST: 'TEST',
    CHANGE_FLAG: 'CHANGE_FLAG'
}
```
2. In `./src/shared/actions/newPage.js`, add new actions. Thus, the content `./src/shared/actions/newPage.js` will become:
```
import {
    newPageTypes
} from '../constants/newPage'

export const newPageActions = {
    test: (type) => ({
        type: newPageTypes.TEST,
        payload: {type}
    }),
    changeFlag: (newFlag) => ({
        type: newPageTypes.CHANGE_FLAG,
        payload: {newFlag}
    })
}
```
3. In `./src/frontend/reducers/newPage.js`, create new case in newPageReducer,
```
switch (action.type) {
    case newPageTypes.TEST:
        return {
            ...state,
            ...action.payload
        },
    case newPageTypes.CHANGE_FLAG:
        return {
            ...state,
            ...action.payload
        }
    default:
        return state
}
```
4. In `./src/frontend/containers/newPage.js`, add the new function in mapDispatchToProps, that is:
```
const mapDispatchToProps = dispatch => {
    return {
        test: (type) => {
            dispatch(newPageActions.test(type))
        },
        changeFlag: (newFlag) => {
            dispatch(newPageActions.changeFlag(newFlag))
        }
    }
}
```

## Conclusion
After using **React-redux**, it is a good framework helper when you are experienced in it. However, when it combined with other frameworks such as chrome extension, it is not friendly for beginner. Anyway, this is only my learning usage project, not professional, not difficult. I thought it is simple for apprentice.
