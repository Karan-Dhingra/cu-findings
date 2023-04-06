import React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable,Image, View, TouchableOpacity } from 'react-native';

const ItemReclaimModal = ({modalVisible, setModalVisible, text='You just helped someone find their lost item.', navigation}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}>
                <TouchableOpacity
                    style={{ backgroundColor: '#33363873', flex: 1,justifyContent:'center' }}
                >
                    <View style={styles.modalView}>
                        <Image source={require('../../../assets/good_job.png')} />
                        <Text style={styles.modalTextHeading}>Good Job</Text>
                        <Text style={styles.modalText}>{text}</Text>
                        <Pressable
                            style={styles.button}
                            onPress={() => {
                                setModalVisible(false)
                                navigation.replace('Home')
                            }}
                        >
                            <Text style={styles.button_text}>
                                OK
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

export default ItemReclaimModal;
