import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    Image,
    View,
    TouchableOpacity,
    SafeAreaView,
    TouchableWithoutFeedback
} from 'react-native';
import { logout } from '../../../redux/actions/UserAction';
import { useDispatch } from 'react-redux';

const ProfilePopoverModal = ({ modalVisible, setModalVisible, navigation, setProfileEditModal }) => {
    const dispatch = useDispatch()

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
                style={{ flex: 1 }}
                onPress={() => setModalVisible(false)}>
                    <View
                        style={{
                            backgroundColor: '#FFF',
                            borderRadius: 8,
                            position: 'absolute',
                            top: 45,
                            right: 35,
                            justifyContent: 'center',
                        }}
                    >
                        <Pressable style={{ padding: 8, paddingHorizontal: 20, width: '100%'}} onPress={() => {
                            setProfileEditModal(true)
                            setModalVisible(false)
                        }}>
                            <Text style={styles.modalText}>Edit</Text>
                        </Pressable>
                        <Pressable style={{ padding: 8, paddingHorizontal: 20, width: '100%'}} onPress={() => {
                            AsyncStorage.clear();
                            dispatch(logout())
                        }}>
                            <Text style={styles.modalText}>Logout</Text>
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
    button: {
        borderRadius: 64,
        width: 120,
        backgroundColor: '#6200EE',
        paddingHorizontal: 10,
        paddingVertical: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60,
    },
    button_text: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 21,
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
        lineHeight: 27,
    },
    modalText: {
        color: '#230055',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        // textAlign: 'center',
        width: '100%'
    },
});

export default ProfilePopoverModal;
