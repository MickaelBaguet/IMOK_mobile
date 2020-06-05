import React, {Fragment} from 'react'
import {ScrollView, StyleSheet, Text, View} from "react-native";
import * as yup from "yup";
import {Button, Input} from "react-native-elements";
import {Formik} from "formik";

class EstateCreate extends React.Component {
    render() {
        return (
            <Formik
                initialValues={{ city: '', minPrice: '', maxPrice: '', minSize: '', maxSize: '' }}
                onSubmit={values => Alert.alert(JSON.stringify(values))}
                // onSubmit={ values => this._searchEstates(values) }
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
                            <Text style={style.title}>Propriétaire</Text>
                            <Input
                                placeholder='Ex: Marin Dupont'
                                name='owner'
                                onChangeText={handleChange('owner')}
                                onBlur={() => setFieldTouched('owner')}
                                value={values.owner}
                            />
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
})

export default EstateCreate