import React from 'react'
import {StyleSheet, FlatList} from 'react-native'

import EstateItem from "./EstateItem";

class CustomerSearch extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            estates: []
        }
    }

    render() {
        // console.log(this.props.route.params.estatesList)
        return (
            <FlatList
                data={ this.props.route.params.estatesList }
                keyExtractor={(item) => item.id.toString()}
                // On fait passer au component FilmItem les films ainsi qu'une fonction
                renderItem={({item}) => <EstateItem estate={item} navigation={this.props.navigation} />}
            />
        )
    }
}

export default CustomerSearch

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})