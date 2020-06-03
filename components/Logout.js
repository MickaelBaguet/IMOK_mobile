import React from 'react'
import {TouchableOpacity, Text, Alert} from 'react-native'
import {connect} from 'react-redux'
import AsyncStorage from "@react-native-community/async-storage";
import {API} from "../config/constants";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";

class Logout extends React.Component {
    constructor(props) {
        super(props);
    }

    _logoutConfirm = () => {
        Alert.alert(
            "Confirmation",
            "Voulez-vous vraiment vous deconnecter?",
            [
                { text: "Retour" },
                { text: "Me deconnecter", onPress: () => this._logout() }
            ],
            { cancelable: false }
        );
    }

    _logout() {
        fetch(API.logout, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.auth_token,
            },
        })
        AsyncStorage.removeItem('credentials')
        this.props.dispatch({type: 'logout'})
    }

    render() {
        return (
            <TouchableOpacity onPress={() => {this._logoutConfirm()}}>
                <FontAwesomeIcon icon={faSignOutAlt} size={25} style={{marginRight: 10}}/>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth_token: state.auth_token
    }
}
export default connect(mapStateToProps)(Logout)