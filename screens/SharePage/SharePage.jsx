import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

const SharePage = () => {
    return (
        <SafeAreaView style={styles.body_container}>
            <ScrollView
                style={styles.scrollViewContainers}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                    <View>
                        <Text>SharePage</Text>
                    </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SharePage