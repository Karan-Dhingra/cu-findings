import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'

const NotificationCard = ({navigation, notification}) => {
    // onPress={() => navigation.navigate('Item', add = {...notification})}
    return (
    <View style={styles.card_wrapper}>
        <View style={styles.left_wrapper}>
            <Text style={styles.small_breif}>{notification?.type}</Text>
            <Text style={styles.post_title}>{notification?.title}</Text>
            {/* <Text style={styles.post_claims}>No claims</Text> */}
        </View>
        <ImageBackground source={{uri: notification?.itemImage}} style={styles.right_wrapper} resizeMode='contain'/>
    </View>
    )
}

export default NotificationCard

const styles = StyleSheet.create({
    card_wrapper:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
        paddingVertical : 10,
        width: '100%',
        flex: 1,
        borderBottomColor : '#2C006733',
        borderBottomWidth: 1
    },
    left_wrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        width: 200
    },
    small_breif:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 10,
        lineHeight: 15,
        color: 'rgba(120, 123, 124, 0.8)',
    },
    post_title:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 24,
        color: 'rgba(0, 27, 41, 0.8)',
    },
    post_description:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 18,
        color: 'rgba(51, 54, 56, 0.56)',
    },
    post_claims:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 11,
        lineHeight: 16,
        color: '#C5C5C5',
    },
    right_wrapper:{
        width: 100,
        minWidth: 100,
        borderRadius: 4,
        height: 80,
    }
})