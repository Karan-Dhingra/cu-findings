import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput, Button, Pressable, Icon } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const CreateItem = ({navigation}) => {
    return (
        <SafeAreaView style={styles.body_container}>
            <ScrollView
                style={styles.scrollViewContainers}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                    {/* Back Button */}
                    <View>
                        <Pressable style={{height: 30, width: 30}} onPress={() => {navigation.goBack()}}>
                            <MaterialIcons name='arrow-back-ios' style={{color: 'black', fontSize: 24}}/>
                        </Pressable>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <View style={styles.input_wrapper}>
                            <Input placeholder={'Name of the item*'}/>
                            <Input placeholder={'Describe your lost item*'} />
                        </View>

                        <View style={styles.input_wrapper}>
                            <View style={styles.text_wrapper}>
                                <Text style={styles.heading}>Add Additional Info</Text>
                            </View>

                            <Input placeholder={'Place last spotted'} />
                            <Input placeholder={'Time last seen'} />
                        </View>

                        <View style={styles.upload_image_wrapper}>
                            <View style={styles.upload_image}></View>
                        </View>
                        {/* <Button>Generate Lost item Ad</Button> */}

                        <Pressable
                            style={styles.button}
                        >
                            <Text style={styles.button_text}>
                                Generate Lost item Ad
                            </Text>
                        </Pressable>
                    </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const Input = () => {
    return <TextInput placeholder='Place last spotted' style={styles.input}/>
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

export default CreateItem;
