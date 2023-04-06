import { Animated, ImageBackground, ScrollView, StyleSheet, Text, View, useWindowDimensions, TouchableOpacity, Image, Button, Pressable, Dimensions, FlatList, SafeAreaView } from 'react-native';
import { IconButton } from "@react-native-material/core";
import React, { useRef, useState } from 'react';
// import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const images = new Array(6).fill(
    'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
);

const data = [
    {
        id: 0,
        title: 'Lost Something?',
        para: 'Create an ad of your lost item and let your friends know',
        img: require('../../../assets/peep_1.png')
    },
    {
        id: 1,
        title: 'Lost Something?',
        para: 'Create an ad of your lost item and let your friends know',
        img: require('../../../assets/peep_2.png')
    },
    {
        id: 2,
        title: 'See if anyone found your lost property ',
        para: 'Check the list of all lost items that are found to claim them as yours',
        img: require('../../../assets/peep_3.png')
    },
]

const LandingSlider = ({}) => {
    const { width, height } = Dimensions.get("window");
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const ref = useRef()

    const updateCurrentSlideIndex = (e) => {
        const currentOffsetX = e.nativeEvent.contentOffset.x
        const currentIndex = Math.round(currentOffsetX / width)

        setCurrentSlideIndex(currentIndex)
    }

    const goToNextSlide = (e) => {
        const nextSlideIndex = currentSlideIndex + 1
        if(nextSlideIndex >= 3){
            return
        }
        const offset = nextSlideIndex*width;
        ref?.current?.scrollToOffset({offset})
        setCurrentSlideIndex(nextSlideIndex)
    }

    const goToPrevSlide = (e) => {
        const nextSlideIndex = currentSlideIndex - 1
        if(nextSlideIndex < 0){
            return
        }
        const offset = nextSlideIndex*width;
        ref?.current?.scrollToOffset({offset})
        setCurrentSlideIndex(nextSlideIndex)
    }

    return (
        <SafeAreaView style={styles.scrollContainer}>
            <FlatList
                ref={ref}
                data={data}
                pagingEnabled
                onMomentumScrollEnd={updateCurrentSlideIndex}
                // contentContainerStyle={{height: height*0.75,}}
                // style={{height: 0}}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <Slide item={item} key={item.id} width={width} height={height}/>}
            />
            <View style={styles.bottomWrapper}>
                <Pressable onPress={goToPrevSlide} disabled={currentSlideIndex === 0}>
                    <Text style={[styles.navigate_btn, currentSlideIndex === 0 && styles.disable_nav_btn]}>Prev</Text>
                </Pressable>


                <View style={styles.indicatorContainer}>
                    {data.map((image, imageIndex) => {
                        return (
                            <View
                                key={imageIndex}
                                style={[styles.normalDot, imageIndex === currentSlideIndex && {width: 20}]}
                            />
                        );
                    })}
                </View>

                <Pressable onPress={goToNextSlide} disabled={currentSlideIndex === 2}>
                    <Text style={[styles.navigate_btn, currentSlideIndex === 2 && {opacity: 0}]}>Next</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const Slide = ({item, width}) => {
    return(
        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Image source={item.img} style={[styles.card, {width}]} />
            <Text style={styles.title_text}>{item.title}</Text>
            <Text style={styles.para_text}>{item.para}</Text>
        </View>
    )
}

export default LandingSlider;

const styles = StyleSheet.create({
    scrollContainer: {
        // flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 400
    },
    card: {
        resizeMode: 'contain',
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
    bottomWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        width: '100%',
        gap: 100,
        height: 100
        // flex: 2
    },
    navigate_btn:{
        color: '#6200EA',
        fontWeight: '500',
        fontSize: 14
    },
    disable_nav_btn:{
        color: '#7B61FF45'
    },
    title_text:{
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 24,
        display: 'flex',
        alignItems: 'flex-end',
        color: 'rgba(0, 27, 41, 0.8)',
        paddingVertical: 5,
        marginTop: 10
    },
    para_text:{
        width: 300,
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 21,
        display: 'flex',
        alignItems: 'flex-end',
        color: '#001B299C',
        textAlign: 'center',
        paddingVertical: 5
    }
});
