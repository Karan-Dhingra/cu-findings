import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import { getDateString } from '../../../constants';

const ReplyBox = ({reply}) => {
    return (
        <View style={styles.reply_box}>
            <Image style={styles.image} source={{uri: reply.image}} />
            <View style={styles.chat_box}>
                <Text style={styles.timestamp}>{getDateString(reply.timestamp)}</Text>
                <Text style={styles.reply}>{reply.reply}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    reply_box:{
        flexDirection: 'row',
        gap: 10,
        width: '100%',
    },
    image:{
        width: 24,
        height: 24,
        minHeight: 24,
        minWidth: 24,
        borderRadius: 999,
        borderColor: '#7B61FF',
        borderWidth: 0.7
    },
    chat_box:{
        backgroundColor: '#F3F3F3',
        borderRadius: 8,
        padding: 10,
        flex: 1,
        gap: 10
    },
    timestamp:{
        color: '#333638CC',
        fontSize: 9,
        lineHeight: 14
    },
    reply:{
        color: '#8A8A8ACC',
        fontSize: 11,
        lineHeight: 16
    }
})

export default ReplyBox;
