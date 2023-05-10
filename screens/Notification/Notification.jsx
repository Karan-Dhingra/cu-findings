import React, { useCallback, useEffect } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, StyleSheet, ScrollView, SafeAreaView, Pressable, ActivityIndicator, RefreshControl } from 'react-native';
import { Text } from 'react-native';
import NotificationCard from '../../components/Notification/NotificationCard/NotificationCard';
import { useDispatch, useSelector } from 'react-redux';
import { getUserNotifications } from '../../redux/actions/UserAction';

const Notification = ({navigation}) => {
    const dispatch = useDispatch()
    const {notifications, loading} = useSelector((state) => state.fetchUserNotificationReducer)

    useEffect(() => {
        dispatch(getUserNotifications())
    }, [])

    const onRefresh = useCallback(() => {
        dispatch(getUserNotifications())
    }, [])

    return (
        <SafeAreaView style={styles.body_container}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 5, padding: 10, paddingBottom: 0}}>
                <Pressable style={{height: 30, width: 30}} onPress={() => {navigation.navigate('Home')}}>
                    <MaterialIcons name='arrow-back-ios' style={{color: '#000', fontSize: 24}}/>
                </Pressable>

                <Text style={{color: '#001B29CC', fontSize: 18, lineHeight:22, fontWeight: 600}}>Notifications</Text>
            </View>

            <ScrollView
                style={styles.scrollViewContainers}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={onRefresh} />
                }
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                    <View style={styles.main_body_container}>
                        {notifications?.map((notification, key) => (
                            <NotificationCard navigation={navigation} key={key} notification={notification}/>
                            ))}
                    </View>
            </ScrollView>
        </SafeAreaView>
    );
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
        gap: 4,
    },
    main_body_container:{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: 0,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 45
    },
})
export default Notification;
