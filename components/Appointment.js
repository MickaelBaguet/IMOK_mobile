import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { ListItem, Button } from 'react-native-elements'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

class Appointment extends React.Component {

    render() {
        console.log(this.props);
        const list = [
            {
              name: 'Sébastien Hinard',
              subtitle: '14/06/2020 - 14h00'
            },
            {
              name: 'Felix Romain',
              subtitle: '26/01/2021 - 10h00'
            },
          ]
        return (              
              <View>
                  <ScrollView style={style.scrollView}>
                <Calendar style={style.calendar}
                // Collection of dates that have to be marked. Default = {}
                markedDates={{
                    '2012-05-16': {selected: true, marked: true, selectedColor: 'blue'},
                    '2012-05-17': {marked: true},
                    '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
                    '2012-05-19': {disabled: true, disableTouchEvent: true}
                }}
                />

                <Text style={style.title}>Les RDV à venir</Text>
                  
                {
                  list.map((l, i) => (
                    <ListItem
                      key={i}
                      title={l.name}
                      subtitle={l.subtitle}

                      bottomDivider
                    />
                  ))
                }

                <Button style={style.button}
                    title="Ajouter un rdv"
                    onPress={()=> {this.props.navigation.navigate('Ajouter un RDV')}}
                />
                </ScrollView>
              </View>
        )
    }
}

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
})

export default Appointment