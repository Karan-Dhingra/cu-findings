import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { View, StyleSheet, Pressable, TextInput, SafeAreaView, Text } from 'react-native';

const RegisterPage = ({navigation}) => {
    const [user, setUser] = useState({
        username: '',
        firstName: '',
        lastName: '',
        personalEmail: '',
        officialEmail: '',
        password: '',
        confirmPassword: '',
    })

    const register = () => {
        if(user.password !== user.confirmPassword) return
        console.log(user)
    }

    return (
        <SafeAreaView style={styles.body_container}>
            <View>
                <Pressable style={{height: 30, width: 30}} onPress={() => {navigation.navigate('LandingPage')}}>
                    <MaterialIcons name='arrow-back-ios' style={{color: 'black', fontSize: 24}}/>
                </Pressable>
            </View>

            {/*  */}
            <View style={styles.main_container}>
                <Text style={styles.heading}>Register</Text>
                <View style={styles.text_wrapper}>
                    <View style={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                        <TextInput style={styles.text_input_row} placeholder={'First Name'} value={user.firstName} onChangeText={(value) => {setUser((state) => ({...state, firstName: value}))}}/>
                        <TextInput style={styles.text_input_row} placeholder={'Last Name'} value={user.lastName}  onChangeText={(value) => {setUser((state) => ({...state, lastName: value}))}}/>
                    </View>
                    <TextInput style={styles.text_input} placeholder={'Username'} value={user.username} onChangeText={(value) => {setUser((state) => ({...state, username: value}))}}/>
                    <TextInput style={styles.text_input} placeholder={'Personal email'} keyboardType={'email-address'} value={user.personalEmail}  onChangeText={(value) => {setUser((state) => ({...state, personalEmail: value}))}}/>
                    <TextInput style={styles.text_input} placeholder={'Institute email'} keyboardType={'email-address'} value={user.officialEmail}  onChangeText={(value) => {setUser((state) => ({...state, officialEmail: value}))}}/>
                    <TextInput style={styles.text_input} placeholder={'Password'} keyboardType={'visible-password'} value={user.password}  onChangeText={(value) => {setUser((state) => ({...state, password: value}))}}/>
                    <TextInput style={styles.text_input} placeholder={'Confirm Password'} keyboardType={'visible-password'} value={user.confirmPassword}  onChangeText={(value) => {setUser((state) => ({...state, confirmPassword: value}))}}/>

                    <Pressable style={styles.signIn_btn} onPress={() => register()}>
                        <Text style={styles.btn_text}>Register</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body_container:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#FFF',
        padding: 20,
    },
    main_container:{
        flex: 1,
        display: 'flex',
        gap: 5,
        justifyContent: 'center',
        padding: 20
    },
    text_wrapper:{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%'
    },
    heading:{
        fontWeight: '500',
        fontSize: 24,
        lineHeight: 36,
        color: '#000'
    },
    text_input:{
        borderBottomColor: '#2C006733',
        borderBottomWidth: 1,
        padding: 8,
        fontSize: 15,
        fontWeight: '500',
        width: '100%'
    },
    text_input_row:{
        borderBottomColor: '#2C006733',
        borderBottomWidth: 1,
        padding: 8,
        fontSize: 15,
        fontWeight: '500',
        width: '45%'
    },
    signIn_btn:{
        backgroundColor: '#6200EE',
        borderRadius: 64,
        padding: 10,
        width: 250,
        height: 40,
        marginTop: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn_text:{
        color: '#FFF',
        fontSize: 14,
        lineHeight: 21,
        fontWeight: '500'
    }
})

export default RegisterPage;
