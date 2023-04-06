import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Pressable, Text } from 'react-native';
import LandingSlider from '../../../components/Auth/LandingSlider/LandingSlider';

const DefaultPage = ({navigation}) => {
    return (
        <SafeAreaView style={styles.body_container}>
            <LandingSlider />

            <View style={styles.button_align}>
                <Pressable style={[styles.button, styles.filled_button]} onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.filled_btn_txt}>Sign In</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.outlined_button]} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.outlined_btn_txt}>Create Account</Text>
                </Pressable>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_align:{
        display: 'flex',
        alignItems: 'center',
        gap: 10
    },
    button:{
        height: 40,
        width: 250,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 64
    },
    filled_button:{
        backgroundColor: '#6200EE',
    },
    outlined_button:{
        borderColor: '#6200EE',
        borderWidth: 1,
    },
    filled_btn_txt:{
        color: '#FFF',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 21,
    },
    outlined_btn_txt:{
        color: '#6200EE',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 21,
    }
})

export default DefaultPage;
