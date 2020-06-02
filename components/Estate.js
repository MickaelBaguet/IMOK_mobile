import React, { Component, Fragment } from 'react';
import { StyleSheet, TextInput, Text, Button, Alert, View } from 'react-native';

import * as yup from 'yup'
import { Formik } from 'formik'

class Estate extends React.Component {

    state = {
        text: ''
    };

    render() {
        return (
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => Alert.alert(JSON.stringify(values))}
                validationSchema={yup.object().shape({
                    email: yup
                        .string()
                        .email()
                        .required(),
                    password: yup
                        .string()
                        .min(6)
                        .required(),
                })}
            >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                    <View style={style.container}>
                        <TextInput
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={() => setFieldTouched('email')}
                            placeholder="E-mail"
                        />
                        {touched.email && errors.email &&
                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                        }
                        <TextInput
                            value={values.password}
                            onChangeText={handleChange('password')}
                            placeholder="Password"
                            onBlur={() => setFieldTouched('password')}
                            secureTextEntry={true}
                        />
                        {touched.password && errors.password &&
                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                        }
                        <Button
                            title='Sign In'
                            disabled={!isValid}
                            onPress={handleSubmit}
                        />
                    </View>
                )}
            </Formik>
        )
    }
}
const style = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        marginTop: 50,
        marginLeft: 20,
        marginRight: 20
    }
})

export default Estate