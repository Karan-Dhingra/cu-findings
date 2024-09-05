import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import Slider from '../../components/ItemPage/Slider/Slider'
import { Pressable } from '@react-native-material/core'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ItemCreatedModal from '../../components/shared/Modals/ItemCreatedModal'
import { useDispatch, useSelector } from 'react-redux';
import { createAddAction } from '../../redux/actions/UserAction'

export default function PreviewPage({navigation, route}) {
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false);
    const {params} = route
    const {loading} = useSelector((state) => state.createAddReducer)

    const createAdd = () =>{
        // item
        dispatch(createAddAction(params?.add, 'FOUND', setModalVisible))
    }

    return (
        <SafeAreaView style={styles.body_container}>
            <ScrollView
                style={styles.scrollViewContainers}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {/* Slider */}
                <Slider navigation={navigation} imageArray={params?.uri ? [params?.uri] : []}/>

                {/* Body */}
                <View style={styles.main_body_container}>
                    {/* Top Body */}
                    <View style={styles.wrap_coloumn_time}>
                        <Text style={styles.created_at}>{params?.add?.timeLastSeen}</Text>
                        <Text style={styles.heading}>{params?.add?.title}</Text>
                    </View>

                    {/* Description */}
                    <View style={styles.wrap_coloumn}>
                        <Text style={styles.para_heading}>Description</Text>
                        <Text style={styles.para_content}>{params?.add?.description}</Text>
                    </View>

                    {/* Where To Find */}
                    <View style={styles.wrap_coloumn}>
                        <View style={styles.wrap_heading}>
                            <MaterialIcons name='location-pin' style={{color: '#6200EE', fontSize: 16}}/>
                            <Text style={styles.para_heading}>Where to find</Text>
                        </View>

                        {/*  */}
                        <View style={styles.wrap_text}>
                            <Text style={styles.para_content}>{params?.add?.location}</Text>
                        </View>
                    </View>

                    {/* Button */}
                    <Pressable
                        style={styles.button}
                        disabled={loading}
                        onPress={() => createAdd()}
                    >
                        <Text style={styles.button_text}>
                            {loading? 'Posting...' : 'Post'}
                        </Text>
                    </Pressable>
                </View>

                {modalVisible && <ItemCreatedModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    text={'You just helped someone find their lost item.'}
                    navigation={navigation}
                />}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body_container: {
        flex: 1,
        backgroundColor: '#fff',
        color: '#000',
        padding: 20,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        display: 'flex',
        flexDirection: 'column',
    },
    scrollViewContainers:{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: 4
    },
    main_body_container:{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: 24,
        paddingTop: 10,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 80,
    },
    para_heading:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 12,
        lineHeight: 18,
        color: '#33363863'
    },
    para_content:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 21,
        color: '#33363896'
    },
    para_content_bold:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 21,
        color: '#33363896'
    },
    heading :{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 22,
        lineHeight: 33,
        color: '#001b29cc'
    },
    created_at :{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 9,
        lineHeight: 14,
        color: '#333638cc'
    },
    wrap_text:{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
    },
    wrap_coloumn_time:{
        display: 'flex',
        flexDirection: 'column',
        gap: 1
    },
    wrap_coloumn:{
        display: 'flex',
        flexDirection: 'column',
        gap: 4
    },
    wrap_heading:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
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