import React, { Fragment } from 'react';
import {StyleSheet, Text, Alert, View, ScrollView} from 'react-native';
import { Input, Button } from 'react-native-elements';

import * as yup from 'yup'
import { Formik } from 'formik'

import {API} from "../config/constants";
import {connect} from "react-redux";

class EstateSearch extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            estate: [],
            isLoading: false,
            city: '',
            minPrice: '',
            maxPrice: '',
            minSize: '',
            maxSize: '',
        }
    }

    _searchEstates(values) {
        fetch(API.estateSearch, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.auth_token,
            },
            body: JSON.stringify({
                city:       values.city,
                minPrice:   values.minPrice,
                maxPrice:   values.maxPrice,
                minSize:    values.minSize,
                maxSize:    values.maxPrice
            })
        })
            .then((response) => {
            if (response.status === 200) {
                response.json().then((data)=> {
                    // this.setState({
                    //     estate: data.estate
                    // })
                    this.props.navigation.navigate('Résultat recherche', { estatesList: data.estate })
                    // console.log(data)
                })
            }
            this.setState({
                isLoading: false
            })
        })
    }

    render() {
        return (
            <Formik
                initialValues={{ city: '', minPrice: '', maxPrice: '', minSize: '', maxSize: '' }}
                // onSubmit={values => Alert.alert(JSON.stringify(values))}
                onSubmit={ values => this._searchEstates(values) }
                validationSchema={yup.object().shape({
                    city:       yup.string().required(),
                    minPrice:   yup.number().positive().integer(),
                    maxPrice:   yup.number().positive().integer(),
                    minSize:    yup.number().positive().integer(),
                    maxSize:    yup.number().positive().integer(),
                })}
            >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                    <ScrollView style={style.container} keyboardShouldPersistTaps='handled'>
                        <Fragment>
                            <Text style={style.title}>Ville</Text>
                            <Input
                                placeholder='Ex: Paris'
                                name='city'
                                onChangeText={handleChange('city')}
                                onBlur={() => setFieldTouched('city')}
                                value={values.city}
                            />
                            {touched.city && errors.city &&
                            <Text style={{ fontSize: 15, color: 'red' }}>La ville est requise !</Text>
                            }
                            <Text style={style.title}>Budget</Text>
                            <View style={style.doubleInput}>
                                <Input
                                    placeholder='Min.'
                                    containerStyle={{ width: '50%' }}
                                    name='minPrice'
                                    onChangeText={handleChange('minPrice')}
                                    onBlur={() => setFieldTouched('minPrice')}
                                    value={values.minPrice}
                                    keyboardType='numeric'
                                    rightIcon={{ type: 'font-awesome', name: 'euro', size: 22 }}
                                />
                                <Input
                                    placeholder='Max.'
                                    containerStyle={{ width: '50%' }}
                                    name='maxPrice'
                                    onChangeText={handleChange('maxPrice')}
                                    onBlur={() => setFieldTouched('maxPrice')}
                                    value={values.maxPrice}
                                    keyboardType='numeric'
                                    rightIcon={{ type: 'font-awesome', name: 'euro', size: 22 }}
                                />
                            </View>
                            {touched.minPrice && touched.maxPrice && (errors.minPrice || errors.maxPrice) &&
                            <Text style={{ fontSize: 15, color: 'red' }}>Veuillez entrer des valeurs entières.</Text>
                            }
                            <Text style={style.title}>Surface</Text>
                            <View style={style.doubleInput}>
                                <Input
                                    containerStyle={{ width: '50%' }}
                                    placeholder='Min.'
                                    name='minSize'
                                    onChangeText={handleChange('minSize')}
                                    onBlur={() => setFieldTouched('minSize')}
                                    value={values.minSize}
                                    keyboardType='numeric'
                                />
                                <Input
                                    containerStyle={{ width: '50%' }}
                                    placeholder='Max.'
                                    name='maxSize'
                                    onChangeText={handleChange('maxSize')}
                                    onBlur={() => setFieldTouched('maxSize')}
                                    value={values.maxSize}
                                    keyboardType='numeric'
                                />
                            </View>
                            {touched.minSize && touched.maxSize && (errors.minSize || errors.maxSize) &&
                            <Text style={{ fontSize: 15, color: 'red' }}>Veuillez entrer des nombres.</Text>
                            }
                            <Button
                                type='clear'
                                title='Recherche'
                                buttonStyle={{ borderColor: '#F57C00', borderRadius: 20, borderWidth: 1.5, marginBottom: 10 }}
                                titleStyle={{ color: '#F57C00' }}
                                onPress={handleSubmit}
                            />
                            <Button
                                type='clear'
                                title='Ajouter un nouveau bien'
                                buttonStyle={{ borderColor: '#F57C00', borderRadius: 20, borderWidth: 1.5, marginBottom: 10 }}
                                titleStyle={{ color: '#F57C00' }}
                                onPress={ () => this.props.navigation.navigate('Création bien') }
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
})

const mapStateToProps = (state) => {
    return {
        auth_token: state.auth_token
    }
}
export default connect(mapStateToProps)(EstateSearch)