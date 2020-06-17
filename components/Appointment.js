import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,FlatList } from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {API} from "../config/constants";
import {connect} from "react-redux";
import moment from "moment";


class Appointment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        appointments: [],
        isLoading: false
    }
}

componentDidMount(){
    fetch(API.appointmentsEmployee + this.props.user.id, {
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
                        <View style={style.appointmentCard}>
                            <View style={style.appointmentDate}>
                                <Text style={style.label}>Date du RDV</Text>
                                <Text>{'le ' + moment(item.date_start).format('DD/MM/YYYY à HH:mm')}</Text>
                            </View>
                            <View style={style.appointmentEmployee}>
                                <Text style={style.label}>Avec:</Text>
                                <Text>{item.employee_firstname + ' ' + item.employee_lastname}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        )
    } else {
        return (
            <Text style={[{margin: 10}]}>Vous n'avez aucun RDV</Text>
        )
    }
}

    render() {
          LocaleConfig.locales['fr'] = {
            monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
            monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
            dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
            dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
            today: 'Aujourd\'hui'
          };
          LocaleConfig.defaultLocale = 'fr';
        return (              
            <View style={style.container}>
                  <ScrollView style={style.scrollView}>
                  <Calendar
                    markedDates={{
                      '2017-12-14': {
                        periods: [
                          {startingDay: false, endingDay: true, color: '#5f9ea0'},
                          {startingDay: false, endingDay: true, color: '#ffa500'},
                          {startingDay: true, endingDay: false, color: '#f0e68c'}
                        ]
                      },
                      '2017-12-15': {
                        periods: [
                          {startingDay: true, endingDay: false, color: '#ffa500'},
                          {color: 'transparent'},
                          {startingDay: false, endingDay: false, color: '#f0e68c'}
                        ]
                      }
                    }}
                    markingType='multi-period'
                  />

                <View style={style.appointments}>
                    <Text style={[style.title, {margin: 10}]}>RDV à venir</Text>
                    {this._displayAppointments()}
                </View>

                </ScrollView>
                <TouchableOpacity onPress={()=> {this.props.navigation.navigate('Ajouter un RDV')}} style={style.fab}>
                    <Text style={style.fabIcon}>+</Text>
                </TouchableOpacity>
              </View>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      auth_token: state.auth_token,
      user: state.user
  }
}
export default connect(mapStateToProps)(Appointment)

const style = StyleSheet.create({
    container: {
        flex: 1
      },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        margin: 20,
        textAlign: 'center',
    },
    scrollView: {
        backgroundColor: 'white'
    },
    button: {
        margin: 20, 
    },
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
      marginRight: 10,
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
    fab: { 
        position: 'absolute', 
        width: 56, 
        height: 56, 
        alignItems: 'center', 
        justifyContent: 'center', 
        right: 20, 
        bottom: 20, 
        backgroundColor: '#03A9F4', 
        borderRadius: 30, 
        elevation: 8 
        }, 
        fabIcon: { 
          fontSize: 40, 
          color: 'white' 
        }
})