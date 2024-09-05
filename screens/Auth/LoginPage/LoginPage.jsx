import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { View, StyleSheet, Pressable, TextInput, SafeAreaView, Text, ToastAndroid } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../../redux/actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';


const LoginPage = ({navigation, setLogin}) => {
    const dispatch = useDispatch()
    const {loading, error} = useSelector((state) => state.userLoginReducer)
    // const _retrieveData = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('TASKS');
    //         if (value !== null) {
    //         // We have data!!
    //         console.log(value);
    //         }
    //     } catch (error) {
    //         // Error retrieving data
    //     }
    // };

    // const _storeData = async () => {
    //     try {
    //         await AsyncStorage.setItem(
    //             'TASKS',
    //             'I like to save it.',
    //         );
    //         } catch (error) {
    //         // Error saving data
    //         }
    // };
    // _retrieveData()
    // console.log(_retrieveData())

    const [user, setUser] = useState({
        // username: '',
        officialEmail: '',
        password: '',
    })

    useEffect(() => {
        if(error){
            ToastAndroid.show(error, ToastAndroid.SHORT);
        }
    }, [error])

    const signIn = () => {
        if(!user.officialEmail){
            ToastAndroid.show('Email is Required!', ToastAndroid.SHORT);
            return
        }else if(!user.password){
            ToastAndroid.show('Password is Required!', ToastAndroid.SHORT);
            return
        }
        // setLogin(true)
        dispatch(login(user, ToastAndroid))
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
                <Text style={styles.heading}>Sign in</Text>
                <View style={styles.text_wrapper}>
                    {/* <TextInput style={styles.text_input} placeholder={'Username'} value={user.username} onChangeText={(value) => {setUser((state) => ({...state, username: value}))}} /> */}
                    <TextInput placeholderTextColor={'#1111113f'} style={styles.text_input} placeholder={'Your email'} keyboardType={'email-address'} value={user.officialEmail} onChangeText={(value) => {setUser((state) => ({...state, officialEmail: value}))}} />
                    <TextInput placeholderTextColor={'#1111113f'} style={styles.text_input} secureTextEntry={true} placeholder={'Password'} value={user.password} onChangeText={(value) => {setUser((state) => ({...state, password: value}))}}/>

                    <Pressable style={styles.signIn_btn} onPress={() => {signIn()}} disabled={loading}>
                        <Text style={styles.btn_text}>{loading ? 'Signing...' : 'Sign in'}</Text>
                    </Pressable>
                </View>

                {/* {!!error && (
                <Text style={{ color: "red" }}>{this.state.nameError}</Text>
                )} */}
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
        padding: 6,
        fontSize: 15,
        fontWeight: '400',
        width: '100%',
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

export default LoginPage;
