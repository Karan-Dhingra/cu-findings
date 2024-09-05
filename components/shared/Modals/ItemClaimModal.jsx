import React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, Image, View, TouchableOpacity } from 'react-native';
import { claimItem } from '../../../redux/actions/AddAction';
import { useDispatch, useSelector } from 'react-redux';

const ItemClaimModal = ({modalVisible, id, setModalVisible, setClaimedVisible, text='You can collect your item within 12 hours of claiming it!', navigation}) => {
    const dispatch = useDispatch()
    const {loading} = useSelector((state) => state.claimAddReducer)

    const complete = () => {
        setModalVisible(false)
        setClaimedVisible(true)
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
                        <Image source={require('../../../assets/item_claimed_modal.png')} />
                        <Text style={styles.modalTextHeading}>Claim your item</Text>
                        <Text style={styles.modalText}>{text}</Text>
                        <Pressable
                            style={styles.button}
                            onPress={() => {
                                dispatch(claimItem(id, complete, error))
                            }}
                            disabled={loading}
                        >
                            <Text style={styles.button_text}>
                                {loading ? 'Confirming...' : 'Confirm'}
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
        marginTop: 60
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

export default ItemClaimModal;
