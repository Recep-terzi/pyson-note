import CustomStatusBar from '@/components/CustomStatusBar';
import Loading from '@/components/Loading';
import { NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from '../redux/store';
import ForgotPassword from './screens/auth/ForgotPassword';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import MainScreen from './screens/MainScreen';
import AboutScreen from './screens/me/AboutScreen';
import NotesScreen from './screens/tabs/NotesScreen';
import WelcomePage from './screens/WelcomePage';


const Stack = createStackNavigator();

function Navigation() {


  const isUser = useSelector((state: any) => state.note.user);
  const darkMode = useSelector((state:any) => state.note.darkMode)
  return (
    <CustomStatusBar backgroundColor={`${darkMode ? '#0F172A' : ''}`} barStyle={`${darkMode ? 'light-content' : 'default'}`}>
      <Stack.Navigator initialRouteName="WelcomePage" >
        <Stack.Screen
          name="WelcomePage"
          component={WelcomePage}
          options={{ headerShown: false }}
        />

        {!isUser && (
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
          </>
        )}
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NotesScreen" component={NotesScreen} options={{ headerShown: false, headerTintColor:"black" }} />

      </Stack.Navigator>

    </CustomStatusBar>

  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Provider store={store}>
      <NavigationIndependentTree>
        <Navigation />
      </NavigationIndependentTree>
    </Provider>
  );
}
