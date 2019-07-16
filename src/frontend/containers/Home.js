import Home from '../components/Home'
import { homeActions } from '../../shared/actions/Home'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    const { home } = state;
    return { home }
}

const mapDispatchToProps = dispatch => {
    return {
        changeType: (type) => {
            dispatch(homeActions.changeType(type))
        }
    }
}

const Home_Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

export default Home_Container
