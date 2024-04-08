import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
// import type {PropsWithChildren} from 'react';
import {Button} from 'react-native';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import auth from '@react-native-firebase/auth';

import Dashboard from './src/screens/Dashboard';

// import {Colors} from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

export type RootStackParamList = {
  Dashboard: undefined;
  Login: undefined;
  SignUp: undefined;
};

// Stack navigator for the app
const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  const [isInitializing, setIsInitializing] = useState(false);
  const [user, setUser] = useState();

  console.log(user);

  // Handle authentication state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (isInitializing) {
      setIsInitializing(false);
    }
  }

  // Listen for authentication state to initialize
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (isInitializing) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerShown: false,
        }}>
        {user ? (
          <Stack.Group>
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              // options={{
              //   headerRight: () => (
              //     <Button
              //       title="Sign out"
              //       color="#fff"
              //       onPress={handleSignOut}
              //     />
              //   ),
              // }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: '#0ea5e9',
                flex: 1,
                justifyContent: 'center',
              },
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
