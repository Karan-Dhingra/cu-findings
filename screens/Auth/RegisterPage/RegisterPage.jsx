import React, { useState, useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { View, StyleSheet, Pressable, TextInput, SafeAreaView, Text, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../../../redux/actions/UserAction';

const RegisterPage = ({navigation}) => {
    const dispatch = useDispatch()
    const {error, loading, data} = useSelector((state) => state.userRegisterReducer)
    const [user, setUser] = useState({
        username: '',
        firstName: '',
        lastName: '',
        personalEmail: '',
        officialEmail: '',
        password: '',
        confirmPassword: '',
    })

    const handleValidation= (passwordInputValue)=>{
        const uppercaseRegExp   = /(?=.*?[A-Z])/;
        const lowercaseRegExp   = /(?=.*?[a-z])/;
        const digitsRegExp      = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp   = /.{8,}/;
        const passwordLength =      passwordInputValue.length;
        const uppercasePassword =   uppercaseRegExp.test(passwordInputValue);
        const lowercasePassword =   lowercaseRegExp.test(passwordInputValue);
        const digitsPassword =      digitsRegExp.test(passwordInputValue);
        const specialCharPassword = specialCharRegExp.test(passwordInputValue);
        const minLengthPassword =   minLengthRegExp.test(passwordInputValue);

        if(passwordLength===0){
                return "Password is empty";
        }else if(!uppercasePassword){
                return "At least one Uppercase";
        }else if(!lowercasePassword){
                return "At least one Lowercase";
        }else if(!digitsPassword){
                return "At least one digit";
        }else if(!specialCharPassword){
                return "At least one Special Characters";
        }else if(!minLengthPassword){
                return "At least minumum 8 characters";
        }else{
            return "";
        }
    }

    useEffect(() => {
        if(error){
            ToastAndroid.show(error, ToastAndroid.SHORT);
        }
    }, [error])

    const register = () => {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!user.username){
            ToastAndroid.show('Username is required!', ToastAndroid.SHORT);
            return
        }else if(!user.firstName || !user.lastName) {
            ToastAndroid.show('First and Last Name is required!', ToastAndroid.SHORT);
            return
        }else if(!user.personalEmail) {
            ToastAndroid.show('Personal Email is required!', ToastAndroid.SHORT);
            return
        }else if(!user.officialEmail) {
            ToastAndroid.show('College/University Email is required!', ToastAndroid.SHORT);
            return
        }else if(!user.personalEmail.match(validRegex)) {
            ToastAndroid.show('Personal Email is not Valid!', ToastAndroid.SHORT);
            return
        }else if(!user.officialEmail.match(validRegex)) {
            ToastAndroid.show('College/University Email is not Valid!', ToastAndroid.SHORT);
            return
        }else if(user.personalEmail === user.officialEmail) {
            ToastAndroid.show('Personal and Your College Email Id shouldnot be same!', ToastAndroid.SHORT);
            return
        }else if(!user.password) {
            ToastAndroid.show('Password is required!', ToastAndroid.SHORT);
            return
        }else if(handleValidation(user.password)) {
            ToastAndroid.show(handleValidation(user.password), ToastAndroid.SHORT);
            return
        }else if(user.password !== user.confirmPassword) {
            ToastAndroid.show('Password doesnt matched!', ToastAndroid.SHORT);
            return
        }
        dispatch(registerAction(user, navigation, ToastAndroid))
    }

    return (
        <SafeAreaView style={styles.body_container}>
            {/* <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            > */}

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
                            <TextInput placeholderTextColor={'#1111113f'} style={styles.text_input_row} placeholder={'First Name'} value={user.firstName} onChangeText={(value) => {setUser((state) => ({...state, firstName: value}))}}/>
                            <TextInput placeholderTextColor={'#1111113f'} style={styles.text_input_row} placeholder={'Last Name'} value={user.lastName}  onChangeText={(value) => {setUser((state) => ({...state, lastName: value}))}}/>
                        </View>
                        <TextInput placeholderTextColor={'#1111113f'} style={styles.text_input} placeholder={'Username'} value={user.username} onChangeText={(value) => {setUser((state) => ({...state, username: value}))}}/>
                        <TextInput placeholderTextColor={'#1111113f'} style={styles.text_input} placeholder={'Personal email'} keyboardType={'email-address'} value={user.personalEmail}  onChangeText={(value) => {setUser((state) => ({...state, personalEmail: value}))}}/>
                        <TextInput placeholderTextColor={'#1111113f'} style={styles.text_input} placeholder={'Institute email'} keyboardType={'email-address'} value={user.officialEmail}  onChangeText={(value) => {setUser((state) => ({...state, officialEmail: value}))}}/>
                        <TextInput placeholderTextColor={'#1111113f'} style={styles.text_input} placeholder={'Password'} secureTextEntry={true} value={user.password}  onChangeText={(value) => {setUser((state) => ({...state, password: value}))}}/>
                        <TextInput placeholderTextColor={'#1111113f'} style={styles.text_input} placeholder={'Confirm Password'} secureTextEntry={true} value={user.confirmPassword}  onChangeText={(value) => {setUser((state) => ({...state, confirmPassword: value}))}}/>

                        <Pressable style={styles.signIn_btn} onPress={() => register()}>
                            <Text style={styles.btn_text}>{loading ? 'Registering...' : 'Register'}</Text>
                        </Pressable>
                    </View>
                </View>
            {/* </KeyboardAvoidingView> */}
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
        fontWeight: '400',
        width: '100%',
        color: '#000'
    },
    text_input_row:{
        borderBottomColor: '#2C006733',
        borderBottomWidth: 1,
        padding: 8,
        fontSize: 15,
        fontWeight: '400',
        width: '45%',
        color: '#000'
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
