import { SafeAreaView, ScrollView, StyleSheet, Text, Pressable, View, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import Slider from '../../components/ItemPage/Slider/Slider'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ItemClaimModal from '../../components/shared/Modals/ItemClaimModal'
import ItemClaimedModal from '../../components/shared/Modals/ItemClaimedModal'
import { useDispatch, useSelector } from 'react-redux'
import { unclaimItem } from '../../redux/actions/AddAction'
import ItemCollectedByModal from '../../components/shared/Modals/ItemCollectedBy'
import ItemCollectedSuccesfullyModal from '../../components/shared/Modals/ItemCollectedSuccesfullyModal'
import { getDateString } from '../../constants'
import ShareReplyModal from '../../components/shared/Modals/ShareReplyModal'
import ReplyBox from '../../components/ItemPage/Replies/ReplyBox'

export default function ItemPage({navigation, route}) {
    const dispatch = useDispatch()
    const {params: add} = route
    const [modalVisible, setModalVisible] = useState(false)
    const [claimedVisible, setClaimedVisible] = useState(false)
    const [isClaimed, setIsClaimed] = useState(false)
    const [collectItemModal, setCollectItemModal] = useState(false)
    const [collectedSuccessModal, setCollectedSuccessModal] = useState(false)
    const [replyModal, setReplyModal] = useState(false)
    const {userInfo} = useSelector((state) => state.userLoginReducer)
    const {loading: unclaimLoading} = useSelector((state) => state.unclaimAddReducer)
    const {error: errorClaiming} = useSelector((state) => state.claimAddReducer)

    useEffect(() => {
        if(errorClaiming){
            ToastAndroid.show(errorClaiming, ToastAndroid.SHORT);
        }
    }, [errorClaiming])

    useEffect(() => {
        if(add?.claimedBy?.find((e) => e.toString() === userInfo?._id.toString())){
            setIsClaimed(true)
        }
    },[add])

    return (
        <SafeAreaView style={styles.body_container}>
            <ScrollView
                style={styles.scrollViewContainers}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {/* Slider */}
                <Slider navigation={navigation} imageArray={[add?.itemImage]}/>

                {/* Body */}
                <View style={styles.main_body_container}>
                    {/* Top Body */}
                    <View style={styles.wrap_coloumn_time}>
                        <Text style={styles.created_at}>{getDateString(new Date(add?.createdAt).getTime())}</Text>
                        <Text style={styles.heading}>{add?.title}</Text>
                    </View>

                    {isClaimed && <Pressable style={styles.unclaim_btn} onPress={() => {dispatch(unclaimItem(add?._id, navigation, ToastAndroid))}}>
                        <Text style={styles.unclaim_btn_text}>{unclaimLoading ? 'Unclaiming' : 'Unclaim'}</Text>
                    </Pressable>}

                    {/* Description */}
                    {!isClaimed && <View style={styles.wrap_coloumn}>
                        <Text style={styles.para_heading}>Description</Text>
                        <Text style={styles.para_content}>{add?.description}</Text>
                    </View>}

                    {add?.collected && <View style={styles.wrap_coloumn}>
                        <View style={styles.wrap_heading}>
                            {/* <FontAwesome name='user' style={{color: '#6200EE', fontSize: 16}}/> */}
                            <Text style={styles.collected_by_heading}>Collected by</Text>
                        </View>

                        {/*  */}
                        <View style={styles.wrap_text}>
                            <Text style={styles.para_content_bold}>{`${add?.collectedBy?.firstName} ${add?.collectedBy?.lastName}`}</Text>
                            <Text style={styles.para_content_bold}>{`${add?.collectedBy?.uid}`}</Text>
                            <Text style={styles.para_content_bold}>{getDateString(add?.collectedBy?.timestamp || new Date(add?.updatedAt).getTime())}</Text>
                        </View>
                    </View>}

                    {/* Where To Find */}
                    {!isClaimed && <View style={styles.wrap_coloumn}>
                        <View style={styles.wrap_heading}>
                            <MaterialIcons name='location-pin' style={{color: '#6200EE', fontSize: 16}}/>
                            <Text style={styles.para_heading}>Where to find</Text>
                        </View>

                        {/*  */}
                        <View style={styles.wrap_text}>
                            <Text style={styles.para_content}>{add?.location}</Text>
                        </View>
                    </View>}

                    {/* Posted By */}
                    {!isClaimed && <View style={styles.wrap_coloumn}>
                        <View style={styles.wrap_heading}>
                            <FontAwesome name='user' style={{color: '#6200EE', fontSize: 16}}/>
                            <Text style={styles.para_heading}>Posted By</Text>
                        </View>

                        {/*  */}
                        <View style={styles.wrap_text}>
                            <Text style={styles.para_content_bold}>{add?.postedByUserName}</Text>
                            {/* <Text style={styles.para_content}>BT19CSE131</Text> */}
                        </View>
                    </View>}

                    {isClaimed && <View style={styles.wrap_coloumn}>
                        <View style={styles.wrap_heading}>
                            {/* <FontAwesome name='user' style={{color: '#6200EE', fontSize: 16}}/> */}
                            <Text style={styles.para_heading}>Claimed by</Text>
                        </View>

                        {/*  */}
                        <View style={styles.wrap_text}>
                            <Text style={styles.para_content_bold}>{`${userInfo?.firstName} ${userInfo?.lastName}`}</Text>
                            <Text style={styles.para_content_bold}>{`${userInfo?.uid}`}</Text>
                            <Text style={styles.para_content_bold}>{new Date().toLocaleString()}</Text>
                        </View>
                    </View>}

                    {isClaimed && <View style={styles.wrap_coloumn}>
                        <View style={styles.wrap_heading}>
                            <MaterialIcons name='location-pin' style={{color: '#6200EE', fontSize: 22}}/>
                            <Text style={styles.collect_para_heading}>{`Collect Your Item at`}</Text>
                        </View>

                        {/*  */}
                        <View style={styles.wrap_text}>
                            <Text style={styles.para_content}>{add?.location}</Text>
                        </View>
                    </View>}

                    {isClaimed && <View style={{alignItems: 'center', justifyContent: 'center', width: '100%', paddingTop: 10}}>
                        <Pressable style={styles.collect_btn} onPress={() => {
                            setCollectItemModal(true)
                        }}>
                            <Text style={styles.claim_btn_text}>Collect item</Text>
                        </Pressable>
                    </View>}

                    {userInfo?._id.toString() === add?.userId && add?.type === 'LOST' &&
                        <View style={styles.replies_wrapper}>
                            <Text style={styles.totl_reply_txt}>{add?.replies?.length} replies</Text>

                            {add?.replies?.map((reply, i) => (
                                <ReplyBox key={i} reply={reply} />
                            ))}
                        </View>
                    }

                </View>

            </ScrollView>

            {/* Claim Button */}
            {!isClaimed && !add?.collected && userInfo?._id.toString() !== add?.userId &&
                <Pressable style={styles.claim_btn} onPress={() => {
                    if(add?.type === 'LOST')
                        setReplyModal(true)
                    else
                        setModalVisible(true)
                }}>
                    <Text style={styles.claim_btn_text}>{add?.type === 'LOST' ? 'Have you seen?' :'Claim your item'}</Text>
                </Pressable>
            }

            {/* {!add?.collected && userInfo?._id.toString() === add?.userId && add?.type === 'LOST' &&
                <Pressable style={styles.claim_btn} onPress={() => {
                    // setModalVisible(true)
                }}>
                    <Text style={styles.claim_btn_text}>{'Check Replies'}</Text>
                </Pressable>
            } */}

            {modalVisible && <ItemClaimModal id={add?._id} setClaimedVisible={setClaimedVisible} modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} />}
            {claimedVisible && <ItemClaimedModal modalVisible={claimedVisible} setModalVisible={setClaimedVisible} navigation={navigation} />}
            {collectItemModal && <ItemCollectedByModal id={add?._id} setCollectedSuccessModal={setCollectedSuccessModal} modalVisible={collectItemModal} setModalVisible={setCollectItemModal} navigation={navigation} />}
            {collectedSuccessModal && <ItemCollectedSuccesfullyModal modalVisible={collectedSuccessModal} setModalVisible={setCollectedSuccessModal} navigation={navigation} />}
            {replyModal && <ShareReplyModal id={add?._id} modalVisible={replyModal} setModalVisible={setReplyModal} navigation={navigation} />}
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
        position: 'relative',
    },
    claim_btn:{
        position: 'absolute',
        right: 20,
        bottom: 100,
        backgroundColor: '#6200EE',
        padding: 12,
        paddingHorizontal: 16,
        borderRadius: 64
    },
    collect_btn:{
        backgroundColor: '#6200EE',
        padding: 12,
        paddingHorizontal: 16,
        borderRadius: 64,
        alignItems: 'center',
        justifyContent: 'center',
        width: 140
    },
    claim_btn_text:{
        color: '#FFFFFF',
        fontSize: 14
    },
    unclaim_btn:{
        position: 'absolute',
        right: 10,
        top: 10,
    },
    unclaim_btn_text:{
        color: '#FF4545',
        fontSize: 14,
        fontWeight: '600'
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
        position: 'relative',
    },
    replies_wrapper:{
        width: '100%',
        gap: 25
    },
    totl_reply_txt:{
        color: '#6200EE7A',
        fontSize: 12,
        lineHeight: 18
    },
    collect_para_heading:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 27,
        color: '#6200EE'
    },
    collected_by_heading:{
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 12,
        lineHeight: 18,
        color: '#6200EE'
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
        gap: 4
    },
})