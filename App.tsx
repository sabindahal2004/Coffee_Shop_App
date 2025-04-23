import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import TabNavigator from './src/navigators/TabNavigator';

const NativStack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NativStack.Navigator screenOptions={{headerShown: false}}>
          <NativStack.Screen name="Tab" component={TabNavigator} />
          <NativStack.Screen
            name="Details"
            component={DetailsScreen}
            options={{animation: 'slide_from_bottom'}}
          />

          <NativStack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{animation: 'slide_from_bottom'}}
          />
        </NativStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
