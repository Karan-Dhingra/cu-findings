import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { getDateString } from '../../../constants';

const ItemAdd = ({navigation, add}) => {
    const [loading, setLoading] = useState(true)

    return (
        <TouchableOpacity style={styles.card_wrapper} onPress={() => navigation.navigate('Item', add)}>
            <View style={styles.left_wrapper}>
                <View style={{flexDirection: 'row', gap: 5}}>
                    <Text style={styles.posted_time}>{getDateString(new Date(add?.createdAt).getTime())}</Text>
                    {add?.collected && <Text style={styles.recovered}>Recovererd</Text>}
                </View>
                <Text style={styles.post_title}>{add?.title}</Text>
                <Text style={styles.post_description}>{add?.description?.length > 70 ? add?.description?.substring(0, 70) + '...' : add?.description}</Text>
                <Text style={add?.claimedBy?.length > 0 ? styles.post_claims_true : styles.post_claims}>{add?.collected ? 'Collected' : add?.claimedBy?.length > 0 ? `${add?.claimedBy?.length} Claims` : 'No claims'}</Text>
            </View>
            <View style={{position: 'relative', width: 100, height: 100}}>
                <Image source={{uri: `${add?.itemImage}`}} style={[styles.right_wrapper]} resizeMode='contain' onLoadStart={() => {setLoading(true)}} onLoadEnd={() => {setLoading(false)}} onError={(error) => {console.log(error)}}/>
                {loading && <View style={styles.container_loading}>
                    <ActivityIndicator size="small" color="#111"/>
                </View>}
            </View>
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
    container_loading:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
    recovered:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 11,
        lineHeight: 12,
        color: '#63CF3E',
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
    post_claims_true:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 11,
        lineHeight: 16,
        color: '#001B29CC',
    },
    right_wrapper:{
        width: 100,
        minWidth: 100,
        borderRadius: 4,
        height: 80,
    }
})

export default ItemAdd;
