import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Slider from '../../components/ItemPage/Slider/Slider'

export default function ItemPage({navigation}) {
    return (
        <SafeAreaView style={styles.body_container}>
            <ScrollView
                style={styles.scrollViewContainers}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {/* Slider */}
                <Slider navigation={navigation}/>

                {/* Body */}
                <View style={styles.main_body_container}>
                    {/* Top Body */}
                    <View style={styles.wrap_coloumn_time}>
                        <Text style={styles.created_at}>25 mins ago</Text>
                        <Text style={styles.heading}>Lenovo Laptop</Text>
                    </View>

                    {/* Description */}
                    <View style={styles.wrap_coloumn}>
                        <Text style={styles.para_heading}>Description</Text>
                        <Text style={styles.para_content}>Black Lenovo Legion laptop is found at seminar Hall. It has a Github stcker on it</Text>
                    </View>

                    {/* Where To Find */}
                    <View style={styles.wrap_coloumn}>
                        <View style={styles.wrap_heading}>
                            <Text style={styles.para_heading}>Where to find</Text>
                        </View>

                        {/*  */}
                        <View style={styles.wrap_text}>
                            <Text style={styles.para_content}>Boys Hostel Gate 3 security check area</Text>
                        </View>
                    </View>

                    {/* Posted <By></By> */}
                    <View style={styles.wrap_coloumn}>
                        <View style={styles.wrap_heading}>
                            <Text style={styles.para_heading}>Posted By</Text>
                        </View>

                        {/*  */}
                        <View style={styles.wrap_text}>
                            <Text style={styles.para_content_bold}>Rishabh Jain</Text>
                            <Text style={styles.para_content}>BT19CSE131</Text>
                        </View>
                    </View>
                </View>

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
        gap: 2
    },
})