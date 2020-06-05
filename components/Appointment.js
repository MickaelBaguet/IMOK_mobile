import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,FlatList } from 'react-native';
import { ListItem, Button } from 'react-native-elements'
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import {API, colors} from "../config/constants";
import {connect} from "react-redux";

class Appointment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        appointments: [],
        isLoading: false
    }
}

  _loadAppointment = () => {
    this.setState({isLoading: true})
    fetch(API.appointments, {
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
                appointments: data.appointments
               })
              // console.log(data);
           })
        }
        this.setState({
            isLoading: false
        })
    })
}

    render() {

      // console.log(this.state.appointments);

          LocaleConfig.locales['fr'] = {
            monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
            monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
            dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
            dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
            today: 'Aujourd\'hui'
          };
          LocaleConfig.defaultLocale = 'fr';
        return (              
              <View>
                  <ScrollView style={style.scrollView}>

                  <TouchableOpacity onPress={()=> this._loadAppointment()}>
                        <View style={style.button}>
                            <Text>Rechercher</Text>
                        </View>
                    </TouchableOpacity>

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
                    // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
                    markingType='multi-period'
                  />

                <Text style={style.title}>Les RDV à venir</Text>
                  
                <FlatList
                    data={this.state.appointments}
                    // keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                            <View style={style.customerCard}>
                                <View style={style.customerInfo}>
                                    <View style={style.row}>
                                        <Text style={style.customerName}>{item.date_start}</Text>
                                        <Text style={style.customerName}>{item.id_customers}</Text>
                                    </View>
                                    <View style={style.row}>
                                        <Text style={style.customerAddress}>80000</Text>
                                        <Text style={style.customerAddress}>Amiens</Text>
                                    </View>
                                </View>
                                <View style={style.contact}>
                                    <TouchableOpacity onPress={()=> {Linking.openURL(`mailto:${item.note}`)}}>
                                        <View>
                                            <FontAwesomeIcon icon={faEnvelope} size={20} color={colors.primary} style={style.icon}/>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=> {Linking.openURL(`tel:${item.note}`)}}>
                                        <View>
                                            <FontAwesomeIcon icon={faPhone} size={16} color={colors.primary} style={style.icon}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    )}
                />

                <Button style={style.button}
                    title="Ajouter un rdv"
                    onPress={()=> {this.props.navigation.navigate('Ajouter un RDV')}}
                />
                </ScrollView>
              </View>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      auth_token: state.auth_token
  }
}
export default connect(mapStateToProps)(Appointment)

const style = StyleSheet.create({
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
      marginRight: 10
  }
})