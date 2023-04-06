import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { View, StyleSheet, Pressable, TextInput, SafeAreaView, Text } from 'react-native';

const RegisterPage = ({navigation}) => {
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
                        <TextInput style={styles.text_input_row} placeholder={'First Name'}/>
                        <TextInput style={styles.text_input_row} placeholder={'Last Name'}/>
                    </View>
                    <TextInput style={styles.text_input} placeholder={'Username'}/>
                    <TextInput style={styles.text_input} placeholder={'Personal email'}/>
                    <TextInput style={styles.text_input} placeholder={'Institute email'}/>
                    <TextInput style={styles.text_input} placeholder={'Password'}/>
                    <TextInput style={styles.text_input} placeholder={'Confirm Password'}/>

                    <Pressable style={styles.signIn_btn}>
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
