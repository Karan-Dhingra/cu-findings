import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable, TextInput, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ItemAdd from '../../components/Home/ItemAdd/ItemAdd';
import { useDispatch, useSelector } from 'react-redux';
import { globalSearch } from '../../redux/actions/PublicAction';

const GlobalSearch = ({navigation}) => {
    const dispatch = useDispatch()
    const {loading, data} = useSelector((state) => state.globalSearchReducer)
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        dispatch(globalSearch(searchText))
    }, [searchText])

    return (
        <SafeAreaView style={styles.body_container}>
            <ScrollView
                style={styles.scrollViewContainers}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                {/* Body */}
                <View style={styles.main_body_container}>
                    {/* Back  Button */}
                    <View style={{height: 50, display: 'flex'}}>
                        <Pressable style={{height: 30, width: 30}} onPress={() => {navigation.navigate('Home')}}>
                            <MaterialIcons name='arrow-back-ios' style={{color: 'black', fontSize: 24}}/>
                        </Pressable>
                    </View>

                    {/* Search */}
                    <View style={styles.search_wrapper}>
                        <TextInput placeholderTextColor={'#1111113f'} onChangeText={(e) => setSearchText(e)} value={searchText} placeholder='Search' style={{color: '#000', width: '100%', padding: 0}} />
                    </View>

                    {/* Heading */}
                    <View>
                        <Text style={styles.text_items}>Items</Text>
                    </View>

                    {/* List */}
                    <View style={styles.all_posts}>
                        {
                            loading ? <ActivityIndicator />
                            :
                            data?.map((add, key) => (
                                <ItemAdd navigation={navigation} add={add} key={key}/>
                            ))
                        }
                    </View>
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
    },
    all_posts: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingBottom: 80,
    },
    text_items:{
        fontWeight: '500',
        fontSize: 20,
        lineHeight: 27,
        color: 'rgba(0, 20, 31, 0.8)'
    },
    search_wrapper:{
        borderBottomWidth: 1,
        borderBottomColor: '#0000004D',
        marginBottom: 20
    }
})

export default GlobalSearch;
