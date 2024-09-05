import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { View, Image, TouchableOpacity, Keyboard, ActivityIndicator } from 'react-native';
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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dispatchLoginRequestOnLoad, logout } from './redux/actions/UserAction.js';
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const LoginScreen = () =>{
  const {isLogin} = useSelector((state) => state.userLoginReducer)

  return(
    <Stack.Navigator
      initialRouteName='LandingPage'
    >
      <Stack.Screen name="LandingPage" options={{headerShown: false}}>
        {props => <DefaultPage {...props}/>}
      </Stack.Screen>
      <Stack.Screen name="SignIn" options={{headerShown: false}}>
        {props => <LoginPage {...props}/>}
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

const BottomNavigationScreen = () => {
  const {isLogin} = useSelector((state) => state.userLoginReducer)
  const [isKeyboardOpen, setKeyboardOpen] = useState(false)

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardOpen(true)
    })
    Keyboard.addListener('keyboardDidHide', (e) => {
      setKeyboardOpen(false)
    })
  }, [])

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
            display: isKeyboardOpen ? 'none' : 'flex'
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
                  {
                    focused ? <Octicons
                      name='person-fill'
                      style={{
                        fontSize: 25,
                        color: '#6200EE'
                      }}
                    />
                    : <Octicons
                      name='person'
                      style={{
                        fontSize: 25,
                        color: '#6200EE'
                      }}
                    />
                  }
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
                  <MaterialCommunityIcons
                    name='camera'
                    style={{
                      fontSize: 25,
                      color: '#FFF'
                    }}
                  />
                )
              }else{
                return (
                  <Octicons
                    name='home'
                    style={{
                      fontSize: 25,
                      color: '#6200EE'
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
                  {focused ?
                    <Octicons
                      name='bell-fill'
                      style={{
                        fontSize: 25,
                        color: '#6200EE'
                      }}
                    />
                    : <Octicons
                      name='bell'
                      style={{
                        fontSize: 25,
                        color: '#6200EE'
                      }}
                    />
                }
                </View>
            )
          }}
        />
    </Tab.Navigator>
  )
}

function App() {
  const {isLogin, expiresAt} = useSelector((state) => state.userLoginReducer)
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true)

  // Auto Logout
  useEffect(() => {
      const currentTime = new Date().getTime()

      const autoLogout = () => {
        AsyncStorage.clear();
        dispatch(logout())
      }

      if (expiresAt && currentTime > expiresAt) {
          autoLogout()
      }

      if (expiresAt) {
          const timeout = expiresAt - currentTime
          setTimeout(() => {
              autoLogout()
          }, timeout)
      }

      // if (isLogin) dispatch(updateLocalUserInfo())
  }, [isLogin])

  useEffect(() => {
    AsyncStorage.getItem('user').then((res) => {
        dispatch(dispatchLoginRequestOnLoad(res))
        setLoading(false)
    }).catch((err) => {
      setLoading(false)
    })
  },[])

  if(isLoading){
    return <ActivityIndicator />
  }else{
    return (
      <NavigationContainer>
        {!isLogin ?
          <LoginScreen isLogin={isLogin}/>
          :
          <BottomNavigationScreen  isLogin={isLogin}/>
        }
      </NavigationContainer>
    );
  }
}

const NormalTabBatOption = ({children}) => {
  const navigation = useNavigation();

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

          const options = {
            allowsEditing: true,
            mediaType: 'photo',
            quality: 0.5,
            title: 'Capture an Image',
            cancelButtonTitle: 'Cancel',
            takePhotoButtonTitle: 'Take Photo',
            chooseFromLibraryButtonTitle: 'Choose from Library',
            // Configures the aspect ratio of the captured image
            aspectRatio: { width: 1, height: 1 },
            maxWidth: 300,
            maxHeight: 300,
            cropButtonText: 'Crop',
            showLaunchImages: 500,

            // Sets the media type options for the camera roll (when using choose from library)
            mediaTypeOptions: {
              images: 'Images',
            },
            storageOptions: { skipBackup: true }
          };
        const result = await launchCamera(options)

        if (!result?.didCancel) {
          const uri = result?.assets[0]?.uri
            navigation.navigate('FoundItemPage', {uri})
        } else {
          // navigation.navigate('Item', {uri: uri})
          console.log('canceledd...')
        }

        // launchCamera(options, (res) => {
        //   console.log(res.assets[0].uri);
          // if(!res.didCancel && res.assets){
          //   navigation.navigate('FoundItemPage', {uri: res.assets[0]?.uri})
          // }else if(res.didCancel){
          //   navigation.navigate('Item', {uri: res.assets[0]?.uri})
          // }
        // });

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
