import React from 'react'
import {connect} from 'react-redux'
import Login from "./Login"
import FakeHome from "./FakeHome"
import Navigation from "../navigation/Navigation";

class LoginHandler extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        }
    }

    render() {
        return (
            this.props.auth_token
            ? <Navigation/>
            : <Navigation/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth_token: state.auth_token
    }
}
export default connect(mapStateToProps)(LoginHandler)