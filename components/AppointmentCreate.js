import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Input, ButtonGroup, Button } from 'react-native-elements';

class Appointment extends React.Component {

    constructor () {
        super()
        this.state = {
            selectedIndex: 2
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }

    render() {

        const { selectedIndex } = this.state

        return (
            <View style={style.container}>
                <ScrollView>
                <Text style={style.title}>Informations du RDV</Text>
                <View style={style.doubleInput}>
                <Input
                    placeholder='Date.'
                    containerStyle={{ width: '50%' }}
                />
                <Input
                    placeholder='Heure.'
                    containerStyle={{ width: '50%' }}
                />
                </View>
                <Text style={style.title}>Nom</Text>
                <Input
                    placeholder='Ex: Stéphane'
                />
                <Text style={style.title}>Mail</Text>
                <Input
                    placeholder='Ex: stephane@gmail.com'
                />
                <Text style={style.title}>Téléphone</Text>
                <Input
                    placeholder='Ex: 0646267154'
                />
                <Text style={style.title}>Localisation</Text>
                <Input
                    placeholder='Ex: Paris'
                />
                <Text style={style.title}>Note</Text>
                <Input
                    placeholder='Ex: Premier RDV'
                />
                <Button style={style.button}
                    title="Enregistrer"
                    onPress={()=> {this.props.navigation.navigate('Mes RDV')}}
                />
                </ScrollView>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    doubleInput: {
        flexDirection: 'row'
    },
})

export default Appointment