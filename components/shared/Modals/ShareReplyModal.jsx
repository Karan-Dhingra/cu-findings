import React, {useState} from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, Image, View, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import { replyAdd } from '../../../redux/actions/AddAction';
import { useDispatch, useSelector } from 'react-redux';

const ShareReplyModal = ({modalVisible, id, setModalVisible, navigation}) => {
    const dispatch = useDispatch()
    const {loading} = useSelector((state) => state.sendReplyReducer)
    const [msg, setMsg] = useState('')

    const success = () => {
        setModalVisible(false)
        navigation.replace('Home')
    }

    const error = () => {
        setModalVisible(false)
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(false);
            }}>
                <TouchableOpacity
                    style={{ backgroundColor: '#33363873', flex: 1,justifyContent:'center' }}
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalView}>
                        {/* <Image source={require('../../../assets/collected_item_modal.png')} /> */}
                        <Text style={styles.modalTextHeading}>Where you have seen it???</Text>
                        {/* <Text style={styles.modalText}>{text}</Text> */}
                        <TextInput value={msg} onChangeText={(e) => setMsg(e)} style={{borderWidth: 1, borderRadius: 4, width: '100%', padding: 4, paddingHorizontal: 10, color: '#222'}} multiline placeholder='I have seen at...'/>
                        <Pressable
                            style={styles.button}
                            disabled={msg === ''}
                            onPress={() => {
                                dispatch(replyAdd(id, success, error, msg, ToastAndroid))
                            }}
                        >
                            <Text style={styles.button_text}>
                                {loading ? 'Sharing...' : 'Share'}
                            </Text>
                        </Pressable>
                </View>
                </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#00000020',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.26,
        shadowRadius: 4,
        elevation: 5,
    },
    button:{
        borderRadius: 64,
        width: 120,
        backgroundColor: '#6200EE',
        paddingHorizontal: 10,
        paddingVertical: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    button_text:{
        color: '#FFF',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 21
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalTextHeading: {
        marginBottom: 15,
        textAlign: 'center',
        color: '#9013FE',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 27
    },
    modalText:{
        color: '#230055',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        width: 210,
        textAlign: 'center',
    }
});

export default ShareReplyModal;
