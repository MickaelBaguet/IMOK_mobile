import React from 'react'
import {Text, View} from "react-native";

class EstateDetails extends React.Component {

    render() {
        const estate = this.props.route.params.infoEstate
        // console.log(estate)

        // console.log(this.props.route.params.infoEstate.street)

        return (
            <View>
                <Text>Adresse : { estate.street }</Text>
                <Text>Nom du proprio : { estate.owner_lastname }</Text>
                <Text>Prénom du proprio : { estate.owner_firsname }</Text>
            </View>
        )
    }
}

export default EstateDetails