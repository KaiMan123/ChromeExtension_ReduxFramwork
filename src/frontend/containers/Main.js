import Main from '../components/Main'
import { mainActions } from '../../shared/actions/Main'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    const { main } = state;
    return { main }
}

const mapDispatchToProps = dispatch => {
    return {
        changeNum: (num) => {
            dispatch(mainActions.changeNum(num))
        }
    }
}

const Main_Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main)

export default Main_Container
