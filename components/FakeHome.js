import React from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import AsyncStorage from "@react-native-community/async-storage";

class FakeHome extends React.Component {
    constructor(props) {
        super(props);
    }

    _logout = () => {
        AsyncStorage.removeItem('credentials')
        this.props.dispatch({type: 'logout'})
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.success}>Login success</Text>
                <Text style={styles.title}>Fake HOME</Text>
                <Text>bearer token:</Text>
                <Text style={styles.token}>{this.props.auth_token}</Text>
                <TouchableOpacity onPress={this._logout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth_token: state.auth_token
    }
}
export default connect(mapStateToProps)(FakeHome)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    success: {
        color: 'lightgreen'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    token: {
        fontSize: 12,
        paddingHorizontal: 20,
        color: 'grey'
    }
})