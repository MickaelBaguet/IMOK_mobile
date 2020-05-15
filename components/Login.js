import React from 'react'
import {StyleSheet, View, Text, Image, TextInput, Button, TouchableOpacity, ImageBackground, Linking, Keyboard, TouchableWithoutFeedback, ActivityIndicator} from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import {colors, url} from '../config/constants'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLock, faEye, faEyeSlash, faUser, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'

/**
 * LOGIN VIEW
 */
export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rememberMe: false,
            showPassword: false,
            loginInput: '',
            passwordInput: '',
            loginError: false,
            isLoading: false
        }
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
                <FontAwesomeIcon icon={faExclamationTriangle} size={30} color={colors.imok_danger} />
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
    _loginSubmit() {
        Keyboard.dismiss()
        this.setState({isLoading: true})
        /** FAKE LOADING, TO BE REPLACED BY API LOGIN QUERY*/
        setTimeout(() => {
            this.setState({
                isLoading: false,
                loginError: true
            })
        }, 1000)
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
                               onFocus={()=>{this.setState({loginError: false})}}
                               onSubmitEditing = {() => {this._loginSubmit()}}
                           />
                           {this._displayShowPasswordIcon()}
                       </View>
                       <View style={styles.loginBottomContainer}>
                           <View style={styles.checkboxContainer}>
                               <CheckBox
                                   value = {this.state.rememberMe}
                                   onValueChange={() => { this.setState({rememberMe: !this.state.rememberMe}) }}
                                   tintColors={{true: '#000', false: '#000'}}
                                   tintColor= '#000'
                                   onFillColor = '#000'
                                   onCheckColor = 'transparent'
                               />
                               <Text style={styles.checkboxLabel}>Se souvenir de moi</Text>
                           </View>
                           <View style={styles.submitContainer}>
                               <Button
                                   title="Connexion"
                                   color={colors.imok_primary}
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
        color: colors.imok_primary,
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
        borderColor: colors.imok_danger
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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkboxLabel: {
        fontWeight: 'bold',
    },
    submitContainer: {
        flex: 1
    },
    lostPassword: {
        marginTop: 20,
        color: colors.imok_link,
    },
    loginErrorContainer: {
        position: 'absolute',
        bottom: 40,
        alignItems: 'center',
    },
    loginError: {
        color: colors.imok_danger,
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