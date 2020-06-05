import React, {Fragment} from 'react'
import {Picker, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import * as yup from "yup";
import {Button, Input} from "react-native-elements";
import {Formik} from "formik";
import {API} from "../config/constants";
import {connect} from "react-redux";

class EstateCreate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            customers: [],
            isLoading: false,
            owner: '',
            city: '',
            adresse: '',
            price: '',
            note: '',
            arg: ''
        }
    }

    componentDidMount() {
        this._searchCustomers()
    }

    _searchCustomers() {
        console.log('_searchCustomers')
        fetch(API.customers, {
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
                            customers: data.customers
                        })
                    })
                }
                this.setState({
                    isLoading: false
                })
            })
    }

    _searchCities() {
        console.log('_searchCities')

        let arg = this.state.arg
        let url =  API.citiesSearch + arg

        console.log(arg)
        console.log(url)
    }

    render() {
        return (
            <Formik
                initialValues={{ city: '', minPrice: '', maxPrice: '', minSize: '', maxSize: '' }}
                onSubmit={values => Alert.alert(JSON.stringify(values))}
                // onSubmit={ values => this._searchEstates(values) }
                // validationSchema={yup.object().shape({
                //     owner:      yup.string().required(),
                //     city:       yup.string().required(),
                //     adresse:    yup.string().required(),
                //     price:      yup.number().required(),
                //     note:       yup.string().positive()(),
                // })}
            >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                    <ScrollView style={style.container} keyboardShouldPersistTaps='handled'>
                        <Fragment>
                            <Text style={style.title}>Propriétaire</Text>
                            <Picker
                            >
                                <Picker.Item label={'Nom ville / Code Postal'} value={''}/>
                            </Picker>
                            {/*<Input*/}
                            {/*    placeholder='Ex: Marin Dupont'*/}
                            {/*    name='owner'*/}
                            {/*    onChangeText={handleChange('owner')}*/}
                            {/*    onBlur={() => setFieldTouched('owner')}*/}
                            {/*    value={values.owner}*/}
                            {/*/>*/}
                            <Text style={style.title}>Ville</Text>
                            <Input
                                placeholder='Ex: Paris'
                                name='city'
                                onChangeText={handleChange('city')}
                                onBlur={() => setFieldTouched('city')}
                                value={values.city}
                            />
                            <Text style={style.title}>Adresse</Text>
                            <Input
                                placeholder="Ex: 12 nom d'une rue"
                                name='adresse'
                                onChangeText={handleChange('adresse')}
                                onBlur={() => setFieldTouched('adresse')}
                                value={values.adresse}
                            />
                            <Text style={style.title}>Type de bien</Text>
                            <Text style={style.title}>Prix</Text>
                            <Input
                                name='price'
                                onChangeText={handleChange('price')}
                                onBlur={() => setFieldTouched('price')}
                                value={values.price}
                                keyboardType='numeric'
                                rightIcon={{ type: 'font-awesome', name: 'euro', size: 20 }}
                            />
                            <Text style={style.title}>Note</Text>
                            <TextInput
                                style={style.textarea}
                                multiline={true}
                                numberOfLines={3}
                                onChangeText={(text) => this.setState({text})}
                                value={values.note}/>
                            <Button
                                type='clear'
                                title='Ajouter un bien'
                                buttonStyle={{ borderColor: '#F57C00', borderRadius: 20, borderWidth: 1.5, marginBottom: 10 }}
                                titleStyle={{ color: '#F57C00' }}
                                onPress={handleSubmit}
                            />
                        </Fragment>
                    </ScrollView>
                )}
            </Formik>
        )
    }
}

const style = StyleSheet.create({
    container: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    doubleInput: {
        flexDirection: 'row'
    },
    textarea: {
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 20,
        marginTop: 10,
        marginHorizontal: 5,
        fontSize: 15,
        padding: 10,
        textAlignVertical: 'top'
    }
})

const mapStateToProps = (state) => {
    return {
        auth_token: state.auth_token
    }
}
export default connect(mapStateToProps)(EstateCreate)