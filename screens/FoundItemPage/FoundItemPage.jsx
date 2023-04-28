import React, {useState} from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput, Button, Pressable, Icon, ImageBackground, KeyboardAvoidingView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const FoundItemPage = ({navigation, route}) => {
    const {params} = route
    const [item, setItem] = useState({
        title: '',
        itemImage: params?.uri,
        description: '',
        location: '',
        timeLastSeen: '',
    })

    return (
        <SafeAreaView style={styles.body_container}>
            <ScrollView
                style={styles.scrollViewContainers}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                    <KeyboardAvoidingView
                        style={styles.container}
                        behavior="padding"
                    >
                        {/* Close Button */}
                        <View>
                            <Pressable style={{height: 30, width: 30}} onPress={() => {navigation.navigate('Home')}}>
                                <MaterialIcons name='close' style={{color: 'black', fontSize: 24}}/>
                            </Pressable>
                        </View>

                        {/* Image */}
                        <ImageBackground style={styles.image_background} source={{uri: item?.itemImage}}></ImageBackground>

                        {/* Next Button */}
                        <Pressable style={styles.next_button} onPress={() => {navigation.navigate(`PreviewItemPage`, {uri: params?.uri, add:item})}}>
                            <Text style={styles.next_text}>Next</Text>
                            <MaterialIcons name='arrow-forward-ios' style={{color: '#6200EA', fontSize: 14}}/>
                        </Pressable>

                        {/* Form */}
                        <View style={styles.form}>
                            <View style={styles.input_wrapper}>
                                <Input placeholder={'Name of the item*'} value={item?.title} setItem={(value) => {setItem((state) => ({...state, title: value}))}}/>
                                <Input placeholder={'Location for collecting item*'} value={item?.location} setItem={(value) => {setItem((state) => ({...state, location: value}))}}/>
                                <Input placeholder={'Describe about found item*'} value={item?.description} setItem={(value) => {setItem((state) => ({...state, description: value}))}}/>
                                <Input placeholder={'Seen at*'} value={item?.timeLastSeen} setItem={(value) => {setItem((state) => ({...state, timeLastSeen: value}))}}/>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
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
    image_background:{
        height: 400,
        width: '100%'
    },
    next_button:{
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    next_text:{
        color: '#6200EA',
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 21,
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
        backgroundColor: '#cccccc6a'
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

export default FoundItemPage;
