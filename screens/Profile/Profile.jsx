import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text, Pressable, Image, ActivityIndicator, RefreshControl } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux';
import ItemAdd from '../../components/Home/ItemAdd/ItemAdd';
import { getUserAds } from '../../redux/actions/UserAction';
import ProfilePopoverModal from '../../components/shared/Modals/ProfilePopover';
import ProfileEditModal from '../../components/shared/Modals/ProfileEditModal';

const Profile = ({navigation}) => {
    const dispatch = useDispatch()
    const {loading, allAds} = useSelector((state) => state.fetchUserAdsReducer)
    const {userInfo} = useSelector((state) => state.userLoginReducer)
    const [active, setActive] = useState(1)
    const [modalVisible, setModalVisible] = useState(false)
    const [profileEditModal, setProfileEditModal] = useState(false)

    const onRefresh = useCallback(() => {
        dispatch(getUserAds())
    }, [])

    useEffect(() => {
        dispatch(getUserAds())
    },[])

    // console.log(allAds)

    return (
        <SafeAreaView style={styles.body_container}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5, padding: 25, paddingBottom: 0}}>
                <Pressable style={{height: 30, width: 30}} onPress={() => {navigation.navigate('Home')}}>
                    <MaterialIcons name='arrow-back-ios' style={{color: '#FFF', fontSize: 24}}/>
                </Pressable>

                <Pressable style={{height: 30, width: 30}} onPress={async() => {
                        setModalVisible(true)
                }}>
                    <MaterialCommunityIcons name='dots-vertical' style={{color: '#FFF', fontSize: 24}}/>
                </Pressable>
            </View>

            <View style={styles.profile_info}>
                <View style={styles.profile_image}>
                    <Image source={{uri: userInfo?.image}} resizeMode='cover' style={{width: 56, height: 56}}/>
                </View>
                <Text style={styles.username}>{userInfo?.username}</Text>

                <View style={styles.info_wrap}>
                    <Text style={styles.text}>{userInfo?.uid}</Text>
                    <Text style={styles.text}>{userInfo?.uid}@cuchd.in</Text>
                </View>
            </View>

            <ScrollView
                style={styles.scrollViewContainers}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={onRefresh} />
                }
                showsVerticalScrollIndicator={false}>
                <View style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <View style={styles.wrap_profile_info}>
                        <View style={styles.top_links}>
                            <Pressable onPress={() => setActive(1)}>
                                <Text style={[styles.top_link_text, active === 1 && styles.active_link]}>Claimed Items</Text>
                            </Pressable>
                            <Pressable onPress={() => setActive(2)}>
                                <Text style={[styles.top_link_text, active === 2 && styles.active_link]}>Share ads</Text>
                            </Pressable>
                            <Pressable onPress={() => setActive(3)}>
                                <Text style={[styles.top_link_text, active === 3 && styles.active_link]}>Found Items</Text>
                            </Pressable>
                        </View>

                        <View style={styles.all_posts}>
                            {
                                active === 1 ?
                                    allAds?.claimedAds?.map((add, key) => (
                                        <ItemAdd navigation={navigation} add={add} key={key}/>
                                    ))
                                : active === 2 ?
                                    allAds?.sharedAds?.map((add, key) => (
                                        <ItemAdd navigation={navigation} add={add} key={key}/>
                                    ))
                                : active === 3 ?
                                    allAds?.foundAds?.map((add, key) => (
                                        <ItemAdd navigation={navigation} add={add} key={key}/>
                                    ))
                                :
                                    allAds?.allAds?.map((add, key) => (
                                        <ItemAdd navigation={navigation} add={add} key={key}/>
                                    ))
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>

            {profileEditModal && <ProfileEditModal modalVisible={profileEditModal} setModalVisible={setProfileEditModal} navigation={navigation} />}
            {modalVisible && <ProfilePopoverModal setProfileEditModal={setProfileEditModal} modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body_container:{
        flex: 1,
        backgroundColor: '#6200EA',
        color: '#FFFFFF',
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        display: 'flex',
        flexDirection: 'column',
    },
    scrollViewContainers:{
        flex: 1,
        backgroundColor:'#FFF'
    },
    profile_info:{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        gap: 7,
        padding: 25,
        paddingTop: 5
    },
    profile_image:{
        width: 56,
        height: 56,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#FFF',
        overflow: 'hidden',
    },
    username:{
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 24,
        color: '#FFFFFF'
    },
    info_wrap:{
        display: 'flex',
        alignItems: 'center',
        gap: 2
    },
    text:{
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 17,
        color: '#FFFFFF',
    },
    wrap_profile_info:{
        flex: 1,
        color: '#000',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: 20,
        paddingTop: 30
    },
    top_links:{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
    top_link_text:{
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 19,
        color: 'rgba(0, 40, 63, 0.45)'
    },
    active_link:{
        color: '#6200EA',
        textDecorationLine: 'underline'
    },
    all_posts: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingBottom: 80,
        marginTop: 20
    },
})

export default Profile;
