import React from 'react'
import {ScrollView} from 'react-native'

class AppointmentDetails extends React.Component {
    constructor(props) {
        super(props);
        this.appointment = JSON.parse(this.props.route.params.appointment)
    }

    render() {
        return (
            <ScrollView>

            </ScrollView>
        )
    }
}

export default AppointmentDetails