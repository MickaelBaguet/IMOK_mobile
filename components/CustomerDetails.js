import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View, ScrollView} from 'react-native';
import {API} from "../config/constants";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

class CustomerDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            customer: undefined
        }
    }

    componentDidMount() {
        const customerID = this.props.route.params.customerID
        //1 FETCH USER WITH ITS ID
        fetch(API.customers + customerID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.auth_token,
            }
        })
        .then((response) => {
            if (response.status === 200) {
                response.json().then((response)=> {
                    this.setState({
                        customer: response.customer,
                        isLoading: false
                    })
                })
            }
        })
    }

    /** CUSTOM LOADING */
    _displayLoading() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    render() {
        const customer = this.state.customer

        return (
            <ScrollView style={styles.container}>
                {this.state.isLoading && this._displayLoading()}
                {customer && (
                    <View style={styles.profile}>
                        <View style={styles.profile_left}>
                            <FontAwesomeIcon icon={faUser}/>
                            <View style={styles.entry}>
                                <Text style={styles.label}>Nom:</Text>
                                <Text>{customer.lastname}</Text>
                            </View>
                            <View style={styles.entry}>
                                <Text style={styles.label}>Prénom:</Text>
                                <Text>{customer.firstname}</Text>
                            </View>
                            <Text style={styles.title}>Adresse:</Text>
                        </View>
                        <View style={styles.profile_right}>

                        </View>
                    </View>
                )}
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth_token: state.auth_token
    }
}
export default connect(mapStateToProps)(CustomerDetails)

const styles=StyleSheet.create({
    container: {
      flex: 1
    },
    loadingContainer: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 2
    },
    profile: {
        padding: 10,
        flex: 1,
        flexDirection: 'row'
    },
    profile_left: {
        flex: 2,
    },
    profile_right: {
        flex: 1
    },
    label: {
        width: 100,
        fontWeight: 'bold'
    },
    entry: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})