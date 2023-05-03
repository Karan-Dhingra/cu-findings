import React, {useState} from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable,Image, View, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { collectItem } from '../../../redux/actions/AddAction';
import { getAllAds } from '../../../redux/actions/UserAction';

const ItemCollectedByModal = ({modalVisible, id, setModalVisible, navigation, setCollectedSuccessModal}) => {
    const dispatch = useDispatch()
    const [check, setCheck] = useState(false)
    const {userInfo} = useSelector((state) => state.userLoginReducer)
    const {loading} = useSelector((state) => state.collectAddReducer)

    const complete = () => {
        setModalVisible(false)
        setCollectedSuccessModal(true)
    }
    const error = () => {
        setModalVisible(false)
    }

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(false);
            }}>
                <TouchableOpacity
                    touchSoundDisabled
                    disabled
                    style={{ backgroundColor: '#33363873', flex: 1,justifyContent:'center' }}
                >
                    <View style={styles.modalView}>
                        <View style={{alignItems: 'flex-end', width: '100%', paddingBottom: 2}}>
                            <Pressable onPress={() => {setModalVisible(false)}}>
                                <MaterialIcons name='close' style={{color: '#323232', fontSize: 25}}/>
                            </Pressable>
                        </View>

                        <Text style={styles.item_collected_by}>Item Collected By</Text>
                        <Image source={{uri: userInfo?.image}} style={styles.imageContainer} />
                        <Text style={styles.modalText}>{`${userInfo?.firstName} ${userInfo?.lastName}`}</Text>
                        <Text style={styles.modalText}>{userInfo?.uid}</Text>
                        {userInfo?.phoneNumber && <Text style={styles.modalText}>{userInfo?.phoneNumber}</Text>}

                        <View style={{alignItems: 'flex-start', flexDirection: 'row', marginTop: 30, gap: 5}}>
                            {/* <View> */}
                                <CheckBox
                                    style={{borderRadius: 3, padding: 1, borderColor: '#6200EE', color: '#6200EE',}}
                                    tintColors={{ true: '#6200EE', false: '#6200EE' }}
                                    tintColor={'#6200EE'}
                                    onFillColor={'#6200EE'}
                                    onValueChange={(newValue) => setCheck(newValue)}
                                    value={check}
                                />
                            {/* </View> */}
                            <Text style={styles.consent_text}>I understand my contact info shall be recorded by the finder when I collect my property</Text>
                        </View>

                        <Pressable
                            style={!check ? [styles.button, {opacity: 0.7}] : styles.button}
                            onPress={() => {
                                dispatch(collectItem(id, complete, error, ToastAndroid))
                            }}
                            disabled={!check}
                        >
                            <Text style={styles.button_text}>
                                I have collected item successfully
                            </Text>
                        </Pressable>

                        {/* <Pressable
                            style={styles.button}
                            onPress={() => {
                                setModalVisible(false)
                                navigation.replace('Home')
                            }}
                        >
                            <Text style={styles.button_text}>
                                No! I need help
                            </Text>
                        </Pressable> */}
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
    imageContainer:{
        width: 70,
        height: 70,
        minWidth: 70,
        minHeight: 70,
        borderRadius: 999,
        borderWidth: 2.5,
        borderColor: '#7B61FF',
        marginBottom: 10
    },
    item_collected_by:{
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 27,
        color: '#6200EA',
        marginBottom: 15
    },
    consent_text:{
        color: '#00283FC9',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '500',
    },
    button:{
        borderRadius: 64,
        backgroundColor: '#6200EE',
        paddingHorizontal: 17,
        paddingVertical: 10,
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
        color: '#33363896',
        fontWeight: '500',
        fontSize: 12,
        lineHeight: 18,
        textAlign: 'center',
    }
});

export default ItemCollectedByModal;
