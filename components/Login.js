import React from 'react'
import {StyleSheet, View, Text, Image, TextInput, Button, TouchableOpacity, ImageBackground, Linking, Keyboard, TouchableWithoutFeedback, ActivityIndicator, Switch} from 'react-native'
import {colors, url, API} from '../config/constants'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLock, faEye, faEyeSlash, faUser, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux'
import AsyncStorage from "@react-native-community/async-storage";

/**
 * LOGIN VIEW
 */
class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            rememberMe: false,
            showPassword: false,
            loginInput: '',
            passwordInput: '',
            loginError: false,
            isLoading: true
        }
    }

    componentDidMount() {
        this._getLocalCredentials()
            .then((credentials) => {
                if(credentials) {
                    credentials = JSON.parse(credentials)
                    this.setState({
                        loginInput: credentials.login,
                        passwordInput: credentials.password,
                    }, () => {
                        this._loginSubmit(true)
                    })
                }
                this.setState({isLoading: false})
            })
    }

    _setLocalCredentials = async (credentials) => {
        return AsyncStorage.setItem('credentials', credentials)
    }

    _getLocalCredentials = async () => {
        return await AsyncStorage.getItem('credentials')
    }

    _removeLocalCredentials = async () => {
        return AsyncStorage.removeItem('credentials')
    }

    /** DYNAMIC PASSWORD ICON (SHOW OR HIDE) */
    _displayShowPasswordIcon() {
        let icon = this.state.showPassword ? faEye : faEyeSlash
        return (
            <TouchableOpacity
                onPress = {()=>{this.setState({showPassword: !this.state.showPassword})}}>
                <FontAwesomeIcon icon={icon} style={styles.icon} size={20} />
            </TouchableOpacity>
        )
    }

    /** HANDLE LOGIN ERROR DISPLAY */
    _displayLoginError() {
        return (
            <View style={styles.loginErrorContainer}>
                <FontAwesomeIcon icon={faExclamationTriangle} size={30} color={colors.danger} />
                <Text style={styles.loginError}>Identifiant et/ou mot de passe incorrect(s)</Text>
            </View>
        )
    }

    /** CUSTOM LOADING */
    _displayLoading() {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    /**
     * CALLED WHEN THE FORM IS SUBMITTED
     */
    _loginSubmit(autoLogin = false) {
        Keyboard.dismiss()
        this.setState({isLoading: true})

        /** CONNECT TO THE API TO RETRIEVE TOKEN */
        fetch(API.login, {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({mail : this.state.loginInput, password : this.state.passwordInput})
        })
        .then((response) => {
            /** CONNEXION SUCCESS */
            if (response.status === 200) {
                response.json().then((response) => {
                    /** SEND TOKEN TO REDUX STORE */
                    this.props.dispatch({
                        type: 'login',
                        value: response.access_token
                    })
                    /** END LOADING STATE */
                    this.setState({isLoading: false, loginError: false})
                    /** USER WANTS TO STORE CREDENTIALS */
                    if (this.state.rememberMe || autoLogin) {
                        this._setLocalCredentials(JSON.stringify({
                            login: this.state.loginInput,
                            password: this.state.passwordInput
                        }))
                    } else {
                        this._removeLocalCredentials()
                    }
                })
            /** CONNECTION FAILURE */
            } else (
                this.setState({isLoading: false, loginError: true})
            )
        })
    }

    /**
     * RENDER METHOD
     */
    render () {
        return (
           <TouchableWithoutFeedback style={styles.mainContainer}
                 onPress={()=>Keyboard.dismiss()}>
               <ImageBackground
                   style={styles.background}
                   source={require('../assets/imok_background_light.jpg')}>
                   <View style={styles.logoContainer}>
                       <Image source={require('../assets/imok_logo.png')} style={styles.logo} />
                       <Text style={styles.subtitle}>You're OK !</Text>
                   </View>
                   <View style={styles.loginContainer}>
                        <View
                            style={[
                                styles.inputContainer,
                                this.state.loginError && styles.errorBorders
                            ]}>
                            <FontAwesomeIcon icon={faUser} size={18} style={styles.icon}/>
                            <TextInput
                                style={styles.input}
                                placeholder="Identifiant"
                                multiLine = {false}
                                onChangeText={(loginInput) => {this.setState({loginInput})}}
                                onFocus={()=>{this.setState({loginError: false})}}
                                onSubmitEditing = {() =>this.PasswordInput.focus()}
                            />
                        </View>
                       <View
                           style={[
                               styles.inputContainer,
                               this.state.loginError && styles.errorBorders
                           ]}>
                           <FontAwesomeIcon icon={faLock} size={18} style={styles.icon}/>
                           <TextInput
                               ref={input => {this.PasswordInput = input}}
                               style={styles.input}
                               placeholder="Mot de passe"
                               multiLine = {false}
                               secureTextEntry = {!this.state.showPassword}
                               onChangeText={(passwordInput) => {this.setState({passwordInput})}}
                               onFocus={()=>{this.setState({loginError: false})}}
                               onSubmitEditing = {() => {this._loginSubmit()}}
                           />
                           {this._displayShowPasswordIcon()}
                       </View>
                       <View style={styles.loginBottomContainer}>
                           <View style={styles.checkboxContainer}>
                               <Switch
                                   value={this.state.rememberMe}
                                   onValueChange={() => { this.setState({rememberMe: !this.state.rememberMe}) }}
                                   trackColor={{false: '#000', true: colors.link}}
                                   thumbColor={this.state.rememberMe ? '#fff' : '#fff'}
                               />
                               <Text
                                   style={[
                                       styles.checkboxLabel,
                                       {color: this.state.rememberMe ? colors.link : '#000'}
                                   ]}>
                                   Se souvenir de moi
                               </Text>
                           </View>
                           {/** TODO: CHANGE TO TOUCHABLE_OPACITY COMPONENT FOR IOS STYLED BUTTON */}
                           <View style={styles.submitContainer}>
                               <Button
                                   title="Connexion"
                                   color={colors.primary}
                                   onPress = {() => {this._loginSubmit()}}
                               />
                           </View>
                       </View>
                       <Text
                           style={styles.lostPassword}
                           onPress={() => {Linking.openURL(url.passwordRecovery)}}>
                           J'ai oublié mon mot de passe
                       </Text>
                   </View>
                   {this.state.loginError && this._displayLoginError()}
                   {this.state.isLoading && this._displayLoading()}
               </ImageBackground>
           </TouchableWithoutFeedback>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth_token: state.auth_token
    }
}
export default connect(mapStateToProps)(Login)

/**
 * STYLING
 */
const styles=StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    logoContainer: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20
    },
    logo: {
        width: '50%',
        height: '50%',
    },
    subtitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.primary,
        fontStyle: 'italic',
        textTransform: 'uppercase'
    },
    loginContainer: {
        flex: 3,
        paddingHorizontal: '10%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 40,
        borderColor: '#000',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 10,
    },
    errorBorders: {
        borderColor: colors.danger,
        borderWidth: 2
    },
    icon:{
        margin: 10
    },
    input: {
        flex: 1,
    },
    loginBottomContainer: {
        flexDirection: 'row',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    checkboxContainer: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkboxLabel: {
        fontWeight: 'bold',
    },
    submitContainer: {
        flex: 2
    },
    lostPassword: {
        marginTop: 20,
        color: colors.link,
    },
    loginErrorContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 40,
        alignItems: 'center',
    },
    loginError: {
        color: colors.danger,
        fontSize: 20,
        paddingHorizontal: 40,
        textAlign: 'center',
    },
    loadingContainer: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        width: '100%',
        height: '100%'
    }
})