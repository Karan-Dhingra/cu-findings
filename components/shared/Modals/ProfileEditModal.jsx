import React, {useState} from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable,Image, View, TouchableOpacity, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { TextInput } from '@react-native-material/core';
import { launchImageLibrary } from 'react-native-image-picker';
import { updateProfileAction } from '../../../redux/actions/UserAction';

const ProfileEditModal = ({modalVisible, setModalVisible}) => {
    const dispatch = useDispatch()
    const {userInfo} = useSelector((state) => state.userLoginReducer)
    const {loading} = useSelector((state) => state.updateProfileReducer)

    const [userData, setUserData] = useState({
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        uid: userInfo?.uid,
        phoneNumber: userInfo?.phoneNumber,
        image: userInfo?.image,
        username: userInfo?.username,
    })

    const isChanged = () => {
        if(
            userData.firstName !== userInfo?.firstName ||
            userData.lastName !== userInfo?.lastName ||
            userData.phoneNumber !== userInfo?.phoneNumber ||
            userData.image !== userInfo?.image ||
            userData.username !== userInfo?.username
        )
            return true

        return false
    }

    const complete = () => {
        setModalVisible(false)
    }
    const error = () => {
        setModalVisible(false)
    }

    const selectImage = async() => {
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        const result = await launchImageLibrary(options)

        if (!result?.didCancel) {
            setUserData((state) => ({...state, image: result?.assets[0]?.uri}))
        } else {
            Alert.alert('You did not select any image.')
        }
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

                        <Text style={styles.item_collected_by}>Update Profile</Text>

                        <Pressable style={styles.imageContainerHolder} onPress={() => selectImage()}>
                            <Image source={{uri: userData?.image}} style={styles.imageContainer} />
                            <View style={styles.overlay_edit}>
                                <MaterialIcons name='edit' style={{color: '#7B61FF', fontSize: 25}}/>
                            </View>
                        </Pressable>

                        <Input placeholder={`First Name`} value={userData?.firstName} setUserData={(value) => {setUserData((state) => ({...state, firstName: value}))}}/>
                        <Input placeholder={`Last Name`} value={userData?.lastName} setUserData={(value) => {setUserData((state) => ({...state, lastName: value}))}}/>
                        <Input placeholder={`Username`} value={userData?.username} setUserData={(value) => {setUserData((state) => ({...state, username: value}))}}/>
                        <Input placeholder={`Phone Number`} value={userData?.phoneNumber} setUserData={(value) => {setUserData((state) => ({...state, phoneNumber: value}))}}/>
                        <Input placeholder={`UID`} value={userData?.uid} notEditable/>

                        <Pressable
                            style={!isChanged() ? [styles.button, {opacity: 0.7}] : styles.button}
                            onPress={() => {
                                dispatch(updateProfileAction(userData, ToastAndroid, setModalVisible))
                            }}
                            disabled={!isChanged() || loading}
                        >
                            <Text style={styles.button_text}>
                                {loading ? 'Updating...' : 'Update'}
                            </Text>
                        </Pressable>
                </View>
                </TouchableOpacity>
        </Modal>
    );
};

const Input = ({placeholder, value, setUserData, notEditable}) => {
    return <TextInput editable={!notEditable} placeholderTextColor={'#1111113f'} placeholder={placeholder} style={styles.input} value={value} onChangeText={(value) => setUserData(value)}/>
}

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
    input:{
        borderWidth: 0,
        borderBottomWidth: 1,
        width: '100%',
        borderColor: 'rgba(44, 0, 103, 0.2)',
        background: 'none',
        backgroundColor: 'white',
        // height: 40
        color: '#000'
    },
    imageContainerHolder:{
        width: 70,
        height: 70,
        minWidth: 70,
        minHeight: 70,
        borderRadius: 999,
        borderWidth: 2.5,
        borderColor: '#7B61FF',
        marginBottom: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    overlay_edit:{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
        backgroundColor: '#00000093',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer:{
        width: '100%',
        height: '100%',
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

export default ProfileEditModal;
