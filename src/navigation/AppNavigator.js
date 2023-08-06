import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import MeditationScreen from '../screens/MeditationScreen';
import CentersScreen from '../screens/CentersScreen';
import MeditationTipsScreen from '../screens/MeditationTipsScreen';
import FullArticleScreen from '../screens/FullArticleScreen';
import MainContainer from './MainContainer';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="MainContainer" component={MainContainer}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Chat" component={ChatScreen}/>
        <Stack.Screen name="Meditation" component={MeditationScreen}/>
        <Stack.Screen name="Centers" component={CentersScreen}  />
        <Stack.Screen name="Articles" component={MeditationTipsScreen}  />
        <Stack.Screen 
        options={
          {
            headerBackTitleVisible: false, 
            headerTitle:"", 
            headerStyle: {borderBottomWidth: 0, elevation: 0, shadowOpacity: 0}
          }} 
        name="Article" 
        component={FullArticleScreen}  />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
