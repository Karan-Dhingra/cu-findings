import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput, Button, Pressable, Icon, ImageBackground } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const FoundItemPage = ({navigation, route}) => {
    const {params} = route

    return (
        <SafeAreaView style={styles.body_container}>
            <ScrollView
                style={styles.scrollViewContainers}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                    {/* Close Button */}
                    <View>
                        <Pressable style={{height: 30, width: 30}} onPress={() => {navigation.goBack()}}>
                            <MaterialIcons name='close' style={{color: 'black', fontSize: 24}}/>
                        </Pressable>
                    </View>

                    {/* Image */}
                    <ImageBackground style={styles.image_background} source={{uri: params ? params?.uri?.uri : null}}></ImageBackground>

                    {/* Next Button */}
                    <Pressable style={styles.next_button} onPress={() => {navigation.navigate(`PreviewItemPage`, {uri: params?.uri})}}>
                        <Text style={styles.next_text}>Next</Text>
                        <MaterialIcons name='arrow-forward-ios' style={{color: '#6200EA', fontSize: 14}}/>
                    </Pressable>

                    {/* Form */}
                    <View style={styles.form}>
                        <View style={styles.input_wrapper}>
                            <Input placeholder={'Name of the item*'}/>
                            <Input placeholder={'Location for collecting item*'} />
                            <Input placeholder={'Describe about found item*'} />
                        </View>
                    </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const Input = ({placeholder}) => {
    return <TextInput placeholder={placeholder} style={styles.input}/>
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
