import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, Linking, FlatList} from 'react-native';
import {API} from "../config/constants";
import {connect} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faEnvelope, faMapMarkerAlt, faPhone} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

class CustomerDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            customer: undefined,
            appointments: []
        }
        this.customer = JSON.parse(this.props.route.params.customer)
    }

    componentDidMount() {
        fetch(API.appointmentsCustomer + this.customer.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.auth_token,
            }
        })
        .then((response)=> {
            if(response.status === 200) {
                response.json().then((data) => {
                    this.setState({
                        appointments: data.appointments,
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

    _displayAppointments() {
        const appointments = this.state.appointments
        if(appointments.length > 0) {
            return (
                <FlatList
                    data={appointments}
                    keyExtractor={(item) => (item.date_start + item.id_customers + item.id_employees)}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Details du RDV', {appointment: JSON.stringify(item)})
                            }}>
                            <View style={styles.appointmentCard}>
                                <View style={styles.appointmentDate}>
                                    <Text style={styles.label}>Date du RDV</Text>
                                    <Text>{'le ' + moment(item.date_start).format('DD/MM/YYYY à HH:mm')}</Text>
                                </View>
                                <View style={styles.appointmentEmployee}>
                                    <Text style={styles.label}>Avec:</Text>
                                    <Text>{item.employee_firstname + ' ' + item.employee_lastname}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )
        } else {
            return (
                <Text style={[{margin: 10}]}>Ce client n'a aucun RDV</Text>
            )
        }
    }

    render() {
        const customer = this.customer

        return (
            <View style={styles.container}>
                {this.state.isLoading && this._displayLoading()}
                <View style={styles.profile}>
                    <View style={styles.profile_left}>
                        <Text style={styles.title}>
                            {customer.civility === '0' ? 'M. ' : 'Mme '}
                            {customer.lastname + ' '}
                            {customer.firstname}
                        </Text>
                        <Text style={{fontStyle: 'italic'}}>
                            {customer.marital_status + ', '}
                            {'né(e) le ' + moment(new Date(customer.birthdate)).format('DD/MM/YYYY')}
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
                <View style={styles.appointments}>
                    <Text style={[styles.title, {margin: 10}]}>RDV du client</Text>
                    {this._displayAppointments()}
                </View>
            </View>
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
    },
    appointments: {
        flex: 4
    },
    appointmentCard: {
        backgroundColor: '#fff',
        marginVertical: 4,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    appointmentDate: {
        flex: 5
    },
    appointmentEmployee: {
        flex: 2
    },
    label: {
        fontWeight: 'bold'
    }
})