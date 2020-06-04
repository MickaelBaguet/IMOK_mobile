import React from 'react'
import {Text, TextInput, View, StyleSheet, FlatList, TouchableOpacity, Linking, ActivityIndicator} from 'react-native'
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
import {API, colors, fakeCustomers} from "../config/constants";
import {connect} from "react-redux";

class CustomerSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            isLoading: false
        }
    }

    _displayLoading() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    _loadCustomers = () => {
        this.setState({isLoading: true})
        fetch(API.customers, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.auth_token,
            }
        })
        .then((response) => {
            if (response.status === 200) {
               response.json().then((data)=> {
                   this.setState({
                       customers: data.customers
                   })
               })
            }
            this.setState({
                isLoading: false
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <TextInput/>
                    <TouchableOpacity onPress={()=> this._loadCustomers()}>
                        <View style={styles.button}>
                            <Text>Rechercher</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.customers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={()=>{
                                this.props.navigation.navigate('Détails du client', {customerID: item.id.toString()} )
                            }}>
                            <View style={styles.customerCard}>
                                <View style={styles.customerInfo}>
                                    <View style={styles.row}>
                                        <Text style={styles.customerName}>{item.civility === 0 ? 'M.' : 'Mme'}</Text>
                                        <Text style={styles.customerName}>{item.lastname}</Text>
                                        <Text style={styles.customerName}>{item.firstname}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.customerAddress}>80000</Text>
                                        <Text style={styles.customerAddress}>Amiens</Text>
                                    </View>
                                </View>
                                <View style={styles.contact}>
                                    <TouchableOpacity onPress={()=> {Linking.openURL(`mailto:${item.mail}`)}}>
                                        <View>
                                            <FontAwesomeIcon icon={faEnvelope} size={20} color={colors.primary} style={styles.icon}/>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=> {Linking.openURL(`tel:${item.phone}`)}}>
                                        <View>
                                            <FontAwesomeIcon icon={faPhone} size={16} color={colors.primary} style={styles.icon}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
                {this.state.isLoading && this._displayLoading()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth_token: state.auth_token
    }
}
export default connect(mapStateToProps)(CustomerSearch)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    customerCard: {
        marginVertical: 2,
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row'
    },
    row: {
        flexDirection: 'row'
    },
    customerName: {
        marginRight: 2,
        textTransform: 'capitalize',
        fontWeight: 'bold'
    },
    customerAddress: {
        marginRight: 2,
    },
    customerInfo: {
        flex: 1
    },
    contact: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    icon: {
        marginRight: 10
    }
})