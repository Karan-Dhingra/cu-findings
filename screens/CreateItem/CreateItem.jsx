import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput, Button, Pressable, Icon, Alert, ImageBackground, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import { useDispatch, useSelector } from 'react-redux';
import { createAddAction } from '../../redux/actions/UserAction';
import ItemCreatedModal from '../../components/shared/Modals/ItemCreatedModal';
import { launchImageLibrary } from 'react-native-image-picker';

const CreateItem = ({navigation}) => {
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false);
    const [item, setItem] = useState({
        title: '',
        itemImage: null,
        description: '',
        location: '',
        timeLastSeen: '',
    })
    const {loading} = useSelector((state) => state.createAddReducer)

    const selectImage = async() => {
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            maxWidth: 200,
            maxHeight: 200,
            quality: 0.5,
        };

        const result = await launchImageLibrary(options)

        if (!result?.didCancel) {
            setItem((state) => ({...state, itemImage: result?.assets[0]}))
        } else {
            Alert.alert('You did not select any image.')
        }
    }

    // console.log('40 ' ,item?.itemImage)

    const createAdd = () =>{
        // item
        dispatch(createAddAction(item, 'LOST', setModalVisible))
    }

    return (
        <SafeAreaView style={styles.body_container}>
            <ScrollView
                style={styles.scrollViewContainers}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                    {/* Back Button */}
                    <View>
                        <Pressable style={{height: 30, width: 30}} onPress={() => {navigation.navigate('Home')}}>
                            <MaterialIcons name='arrow-back-ios' style={{color: 'black', fontSize: 24}}/>
                        </Pressable>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <View style={styles.input_wrapper}>
                            <Input placeholder={'Name of the item*'} value={item?.title} setItem={(value) => {setItem((state) => ({...state, title: value}))}}/>
                            <Input placeholder={'Describe your lost item*'} value={item?.description} setItem={(value) => {setItem((state) => ({...state, description: value}))}}/>
                        </View>

                        <View style={styles.input_wrapper}>
                            <View style={styles.text_wrapper}>
                                <Text style={styles.heading}>Add Additional Info</Text>
                            </View>

                            <Input placeholder={'Place last spotted'} value={item?.location} setItem={(value) => {setItem((state) => ({...state, location: value}))}}/>
                            <Input placeholder={'Time last seen'} value={item?.timeLastSeen} setItem={(value) => {setItem((state) => ({...state, timeLastSeen: value}))}}/>
                        </View>

                        <View style={styles.upload_image_wrapper}>
                            {
                                item?.itemImage ? <Pressable onPress={() => {selectImage()}} style={styles.item_image}>
                                    <Image source={{uri: item?.itemImage}} style={{width: '100%', height: '100%'}} />
                                </Pressable>
                                : <Pressable onPress={() => {selectImage()}} style={styles.upload_image}>
                                    <Octicons name='upload' style={{fontSize: 15, color: '#6200EE'}}/>
                                    <Text style={styles.upload_text}>Add photo from library</Text>
                                </Pressable>
                            }
                        </View>
                        {/* <View style={styles.upload_image_wrapper}>
                            <Pressable onPress={() => {selectImage()}} style={styles.upload_image}></Pressable>
                        </View> */}
                        {/* <Button>Generate Lost item Ad</Button> */}

                        <Pressable
                            style={styles.button}
                            disabled={loading}
                            onPress={() => {
                                createAdd()
                            }}
                        >
                            <Text style={styles.button_text}>
                                {loading ? 'Generating...' : 'Generate Lost item Ad'}
                            </Text>
                        </Pressable>
                    </View>
                {modalVisible && <ItemCreatedModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    text={'Stay Tuned! You will be informed if someone founds.'}
                    navigation={navigation}
                />}
            </ScrollView>
        </SafeAreaView>
    );
}

const Input = ({placeholder, value, setItem}) => {
    return <TextInput placeholderTextColor={'#1111113f'} placeholder={placeholder} style={styles.input} value={value} onChangeText={(value) => setItem(value)}/>
}

const styles = StyleSheet.create({
    body_container:{
        flex: 1,
        backgroundColor: '#fff',
        color: '#000',
        padding: 25,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        display: 'flex',
        flexDirection: 'column',
    },
    scrollViewContainers:{
    },
    form:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 30
    },
    input_wrapper:{
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    heading:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 18,
        color: '#9B53FF'
    },
    input:{
        borderBottomWidth: 1,
        borderColor: 'rgba(44, 0, 103, 0.2)',
        // height: 40
        color: '#000'
    },
    upload_image_wrapper:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    upload_image:{
        height: 100,
        width: 300,
        borderRadius: 5,
        // backgroundColor: '#cccccc6a',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8
    },
    upload_text:{
        color: '#8484849C',
        fontSize: 14
    },
    item_image:{
        height: 200,
        width: 300,
        borderRadius: 5,
        backgroundColor: '#cccccc6a',
        resizeMode: 'contain',
    },
    button:{
        borderRadius: 64,
        width: 'auto',
        backgroundColor: '#6200EE',
        paddingHorizontal: 10,
        paddingVertical: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_text:{
        color: '#FFF',
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 21
    }
})

export default CreateItem;
