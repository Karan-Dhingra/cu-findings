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
import GlobalSearch from './screens/GlobalSearch/GlobalSearch.jsx';
import LoginPage from './screens/Auth/LoginPage/LoginPage.jsx';
import RegisterPage from './screens/Auth/RegisterPage/RegisterPage.jsx';
import DefaultPage from './screens/Auth/DefaultPage/DefaultPage.jsx';
import { useState } from 'react';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const LoginScreen = ({isLogin, setLogin}) =>{
  console.log('login', isLogin)
  return(
    <Stack.Navigator
      initialRouteName='LandingPage'
    >
      <Stack.Screen name="LandingPage" options={{headerShown: false}}>
        {props => <DefaultPage {...props} setLogin={setLogin} />}
      </Stack.Screen>
      <Stack.Screen name="SignIn" options={{headerShown: false}}>
        {props => <LoginPage {...props} setLogin={setLogin} />}
      </Stack.Screen>
      <Stack.Screen name="Register" options={{headerShown: false}} component={RegisterPage} />
    </Stack.Navigator>
  )
}

const HomeScreen = () =>{
  return(
    <Stack.Navigator
      initialRouteName='Home'
    >
      <Stack.Screen name="Home" options={{headerShown: false}} component={Home} />
      <Stack.Screen name="CreateItem" options={{headerShown: false}} component={CreateItem} />
      <Stack.Screen name="FoundItemPage" options={{headerShown: false}} component={FoundItemPage} />
      <Stack.Screen name="PreviewItemPage" options={{headerShown: false}} component={PreviewPage} />
      <Stack.Screen name="GlobalSearch" options={{headerShown: false}} component={GlobalSearch} />
      <Stack.Screen name="Item" options={{headerShown: false}} component={ItemPage} />
    </Stack.Navigator>
  )
}

const BottomNavigationScreen = ({isLogin, setLogin}) => {
  return(
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
            tabBarIcon: ({focused}) => {
              if(focused) {
                return (
                  <Image
                    source={require('./assets/camera_alt.png')}
                    resizeMode='contain'
                    style={{
                      width: 25,
                      height: 25,
                      // tintColor: focused ? '#e32f45' : '#748c94'
                    }}
                  />
                )
              }else{
                return (
                  <Image
                    source={require('./assets/Home.png')}
                    resizeMode='contain'
                    style={{
                      width: 25,
                      height: 25,
                      // tintColor: focused ? '#e32f45' : '#748c94'
                    }}
                  />
                )
              }
            },
            tabBarButton: (props) => {
              if(props.accessibilityState.selected)
                return (
                <CustomTabBarOption {...props}/>
              )
              else return <NormalTabBatOption {...props}/>
            }
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
  )
}

function App() {
  const [isLogin, setLogin] = useState(false)
  return (
    <NavigationContainer>
      {!isLogin ?
        <LoginScreen isLogin={isLogin} setLogin={setLogin} />
        :
        <BottomNavigationScreen  isLogin={isLogin} setLogin={setLogin} />
      }
    </NavigationContainer>
  );
}

const NormalTabBatOption = ({children}) => {
  const navigation = useNavigation();
  console.log(navigation.navigate)
  return(
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
      }}
      onPress={() => navigation.navigate('HomeScreen')}
    >
      {children}
    </TouchableOpacity>
  )
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
