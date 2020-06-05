import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking} from 'react-native';
import {API} from "../config/constants";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {
    faEnvelope,
    faLocationArrow,
    faMapMarked,
    faMapMarkedAlt, faMapMarkerAlt, faPhone, faPhoneAlt,
    faSearchLocation,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

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
        console.log('customer',customer)

        return (
            <ScrollView style={styles.container}>
                {this.state.isLoading && this._displayLoading()}
                {customer && (
                    <View style={styles.profile}>
                        <View style={styles.profile_left}>
                            <Text style={styles.title}>
                                {customer.civility === '0' ? 'M. ' : 'Mme '}
                                {customer.lastname + ' '}
                                {customer.firstname}
                            </Text>
                            <Text>
                                {customer.marital_status + ', '}
                                {'né(e) le' + moment(new Date(customer.birthdate)).format('DD/MM/YYYY')}
                            </Text>
                            <View style={styles.profile_row}>
                                <View style={styles.profileIcon}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} size={30}/>
                                </View>
                                <View style={styles.profileData}>
                                    <Text>
                                        {customer.street}
                                        {customer.complement && '\n'+customer.complement}
                                    </Text>
                                    <Text>{customer.zip_code + ' ' + customer.city}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.profile_right}>
                            <TouchableOpacity
                                onPress={() => Linking.openURL('mailto:' + customer.mail)}>
                                <FontAwesomeIcon icon={faEnvelope} size={30}/>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => Linking.openURL('tel:' + customer.phone)}>
                                <FontAwesomeIcon icon={faPhone} size={30}/>
                            </TouchableOpacity>
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
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 2
    },
    profile: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    profile_left: {
        flex: 2,
    },
    profile_right: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    label: {
        width: 100,
        fontWeight: 'bold'
    },
    profile_row: {
        flexDirection: 'row',
        marginTop: 10
    },
    profileIcon: {
        width: 40,
        alignItems: 'center'
    },
    profileData: {
        flex: 1
    }
})