import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Login from "../components/Login";
import Home from '../components/Home';
import Estate from '../components/Estate'

const SearchStackNavigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false
        }
    },
    Estate: {
        screen: Estate,
        navigationOptions: {
            title: 'Biens immobilier'
        }
    }
})

export default createAppContainer(SearchStackNavigator)