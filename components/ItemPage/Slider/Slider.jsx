import { Animated, ImageBackground, ScrollView, StyleSheet, Text, View, useWindowDimensions, TouchableOpacity, Image, Button } from 'react-native';
import { IconButton } from "@react-native-material/core";
import React, { useRef } from 'react';
// import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const images = new Array(6).fill(
    'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
);

const Slider = ({navigation, imageArray}) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const {width: windowWidth} = useWindowDimensions();

    return (
        <View style={styles.scrollContainer}>
            <TouchableOpacity style={styles.navigate_back_btn} onPress={() => {navigation.goBack()}}>
                <MaterialIcons name='arrow-back-ios' style={{color: 'black', fontSize: 24}}/>
            </TouchableOpacity>

            <ScrollView
                horizontal={true}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: scrollX,
                                },
                            },
                        },
                    ],
                    {useNativeDriver: false}
                )}
                scrollEventThrottle={1}
                style={{width: windowWidth-40, height: 250}}
            >
                {imageArray?.length > 0 ?
                    imageArray.map((image, imageIndex) => {
                        return (
                            <View style={{width: windowWidth-40, height: 250}} key={imageIndex}>
                                <Image source={{uri: image}} style={styles.card} />
                            </View>
                        )
                    })
                :
                    images.map((image, imageIndex) => {
                        return (
                            <View style={{width: windowWidth-40, height: 250}} key={imageIndex}>
                                <ImageBackground source={{uri: image}} style={styles.card}>
                                </ImageBackground>
                            </View>
                        )
                    })
                }
            </ScrollView>

            <View style={styles.indicatorContainer}>
                {imageArray?.length > 0 ?
                    imageArray.map((image, imageIndex) => {
                        const width = scrollX.interpolate({
                                inputRange: [
                                    windowWidth * (imageIndex - 1),
                                    windowWidth * imageIndex,
                                    windowWidth * (imageIndex + 1),
                                ],
                                outputRange: [8, 16, 8],
                                extrapolate: 'clamp',
                            });

                        return (
                            <Animated.View
                                key={imageIndex}
                                style={[styles.normalDot, {width}]}
                            />
                        );
                    })
                :
                images.map((image, imageIndex) => {
                    const width = scrollX.interpolate({
                            inputRange: [
                                windowWidth * (imageIndex - 1),
                                windowWidth * imageIndex,
                                windowWidth * (imageIndex + 1),
                            ],
                            outputRange: [8, 16, 8],
                            extrapolate: 'clamp',
                        });

                    return (
                        <Animated.View
                            key={imageIndex}
                            style={[styles.normalDot, {width}]}
                        />
                    );
                })}
            </View>
        </View>
    );
};

export default Slider;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        height: 270,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
        position: 'relative',
    },
    navigate_back_btn:{
        position: 'absolute',
        top: 0,
        zIndex: 2,
        left: 0,
        height: 30,
        width: 30,
        // backgroundColor: '#eeeeee',
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        marginVertical: 4,
        marginHorizontal: 16,
        borderRadius: 5,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    textContainer: {
        backgroundColor: 'rgba(0,0,0, 0.7)',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 5,
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: 'silver',
        marginHorizontal: 4,
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
