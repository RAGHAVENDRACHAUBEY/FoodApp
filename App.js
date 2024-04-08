import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import COLORS from './src/consts/colors';
import DetailsScreen from './src/views/screens/DetailsScreen';
import BottomNavigator from './src/views/navigation/BottomNavigator';
import OnBoardScreen from './src/views/screens/OnBoardScreen';
import SigninScreen from './src/views/screens/SigninScreen';
import SignUp from './src/views/screens/SignUp';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
// import '@react-native-firebase/firestore';

const RNfirebaseConfig = {
  apiKey: "AIzaSyAMMy0LIFBQydyn8v2e6sVqscfMpM69HcI",
  authDomain: "",
  projectId: "food-215d5",
  storageBucket: "food-215d5.appspot.com",
  messagingSenderId: ".....",
  appId: "......"
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(RNfirebaseConfig )
} else {
    app = firebase.app()
}


const auth = firebase.auth();

const Stack = createStackNavigator();

const App = () => {
  
  return (
    <Provider store={store}>
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="SigninScreen" component={SigninScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={BottomNavigator} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
