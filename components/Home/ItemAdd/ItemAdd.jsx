import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';

const ItemAdd = ({navigation, add}) => {
    return (
        <TouchableOpacity style={styles.card_wrapper} onPress={() => navigation.navigate('Item', add)}>
            <View style={styles.left_wrapper}>
                <Text style={styles.posted_time}>{add?.timeLastSeen}</Text>
                <Text style={styles.post_title}>{add?.title}</Text>
                <Text style={styles.post_description}>{add?.description?.length > 70 ? add?.description?.substring(0, 70) + '...' : add?.description}</Text>
                <Text style={styles.post_claims}>No claims</Text>
            </View>
            <ImageBackground source={{uri: add?.itemImage}} style={styles.right_wrapper} resizeMode='contain'/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card_wrapper:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#FFFFFF',
        boxShadow: '0px -1px 19px #00000026',
        borderRadius: 12,
        padding: 20,
        shadowColor: "#00000026",
        borderWidth: 1,
        borderColor: '#00000026',
        marginTop: 10,
        marginBottom: 10,
        // shadowOffset: {
        //     width: 0,
        //     height: 5,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.5,
        // elevation: 2,
        width: '100%',
        flex: 1
    },
    left_wrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        width: 200
    },
    posted_time:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 9,
        lineHeight: 12,
        color: 'rgba(51, 54, 56, 0.8)',
    },
    post_title:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 22,
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

export default ItemAdd;
