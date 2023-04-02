import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { View, Image, TouchableOpacity } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Home from './screens/Home/Home.jsx';
import ItemPage from './screens/ItemPage/ItemPage.jsx';
import Notification from './screens/Notification/Notification.jsx';
import Profile from './screens/Profile/Profile.jsx';
import CreateItem from './screens/CreateItem/CreateItem.jsx';
import FoundItemPage from './screens/FoundItemPage/FoundItemPage.jsx';
import PreviewPage from './screens/PreviewPage/PreviewPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const HomeScreen = () =>{
  return(
    <Stack.Navigator >
      <Stack.Screen name="Home" options={{headerShown: false}} component={Home} />
      <Stack.Screen name="CreateItem" options={{headerShown: false}} component={CreateItem} />
      <Stack.Screen name="FoundItemPage" options={{headerShown: false}} component={FoundItemPage} />
      <Stack.Screen name="PreviewItemPage" options={{headerShown: false}} component={PreviewPage} />
      <Stack.Screen name="Item" options={{headerShown: false}} component={ItemPage} />
    </Stack.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='HomeScreen'
        screenOptions={{
          showLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 70,
          },
        }}

      >
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            showLabel: false,
            tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    source={require('./assets/Profile.png')}
                    resizeMode='contain'
                    style={{
                      width: 25,
                      height: 25,
                      // tintColor: focused ? '#e32f45' : '#748c94'
                    }}
                  />
                </View>
            )
          }}
        />

        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
                <Image
                  source={require('./assets/camera_alt.png')}
                  resizeMode='contain'
                  style={{
                    width: 25,
                    height: 25,
                    // tintColor: focused ? '#e32f45' : '#748c94'
                  }}
                />
            ),
            tabBarButton: (props) => (
              <CustomTabBarOption {...props}/>
            )
          }}
        />

        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Image
                    source={require('./assets/Notification.png')}
                    resizeMode='contain'
                    style={{
                      width: 25,
                      height: 25,
                      // tintColor: focused ? '#e32f45' : '#748c94'
                    }}
                  />
                </View>
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const CustomTabBarOption = ({children}) => {
  const navigation = useNavigation();
  return(
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={async() => {
        //   const permissionResult = await ImagePicker.requestCameraPermissionsAsync({
        //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //       allowsEditing: true,
        //       aspect: [1, 1],
        //       quality: 1,
        //   });
        // if (permissionResult.granted === false) {
        //     alert("You've refused to allow this appp to access your camera!");
        //     return;
        // }
        let options = {}
        launchCamera(options, (res) => {
          console.log(res);
          if(!res.didCancel && res.assets){
            navigation.navigate('FoundItemPage', {uri: res.assets[0]})
          }else if(res.didCancel){
            navigation.navigate('Item', {uri: res.assets[0]})
          }
        });
      }}
    >
      <View style={{
        width: 60,
        height: 60,
        borderRadius: 35,
        backgroundColor: '#6200EA'
      }}>
        {children}
      </View>
    </TouchableOpacity>
  )
}

export default App;
