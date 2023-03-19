import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Button,
    SafeAreaView,
    Platform,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import ItemAdd from '../../components/Home/ItemAdd/ItemAdd.jsx';

const Home = () => {
    return (
        <SafeAreaView style={styles.body_container}>
            <ScrollView
                style={styles.scrollViewContainers}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {/* Lost an Item? */}
                <View style={styles.lost_box_container}>
                    <View style={styles.top_heading_wrapper}>
                        <Text style={styles.top_heading}>Lost an Item?</Text>
                        <Text style={styles.top_para}>
                            Create an add and let your friends know.
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.add_button}>
                        {/* <Icon name='Add' /> */}
                    </TouchableOpacity>
                </View>

                {/* Lost Items List */}
                <View style={styles.search_field}>
                    <Text style={styles.search_heading}>Search lost Items</Text>
                </View>

                <View style={styles.all_posts}>
                    <ItemAdd />
                    <ItemAdd />
                    <ItemAdd />
                    <ItemAdd />
                    <ItemAdd />
                    <ItemAdd />
                    <ItemAdd />
                    <ItemAdd />
                    <ItemAdd />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;

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
    lost_box_container: {
        backgroundColor: '#6200EA',
        borderRadius: 8,
        width: '100%',
        padding: 15,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        overflow: 'hidden',
        minHeight: 90,
        flex: 1,
    },
    top_heading_wrapper: {
        display: 'flex',
        flexDirection: 'column',
        width: 200,
        rowGap: 8,
    },
    top_heading: {
        color: 'white',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 27,
        color: '#FFFFFF',
    },
    top_para: {
        color: 'white',
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 18,
        color: '#E1DEF9',
    },
    add_button: {
        backgroundColor: '#FFF',
        width: 33,
        height: 33,
        minWidth: 33,
        minHeight: 33,
        borderRadius: 100,
    },
    search_field: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    all_posts: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    search_heading: {
        color: 'rgba(0, 20, 31, 0.8)',
        // fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 24,
        marginTop: 15,
        marginBottom: 15,
    },
});
