import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import React from 'react';
import CentersScreen from '../screens/CentersScreen';
import ChatScreen from '../screens/ChatScreen';
import HomeScreen from '../screens/HomeScreen';
import MeditationScreen from '../screens/MeditationScreen';
import MeditationTipsScreen from '../screens/MeditationTipsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const MainContainer = ({ navigation, route }) => {
    //Screen names
    const homeName = "HOME";
    const centersName = "CENTERS";
    const chatName = "CHAT";
    const meditationName = "MEDITATION";
    const meditationTipsName = "ARTICLES";

    const Tab = createBottomTabNavigator();

    const initialRoutName = route.params?.screen || homeName;

  return (
      <Tab.Navigator
        initialRouteName={initialRoutName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === centersName) {
              iconName = focused ? 'location' : 'location-outline';

            } else if (rn === chatName) {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            } 
            else if (rn === meditationName) {
                iconName = focused ? 'body' : 'body-outline';
              }
            else if (rn === meditationTipsName) {
                iconName = focused ? 'reader' : 'reader-outline';
              }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={26} color="#fff" />;
          },
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 60 },
          headerShown: false,
          tabBarStyle: {
            paddingTop: 10,
            backgroundColor: "#3e3739",
          },
        })}
        >

        <Tab.Screen name={homeName} component={HomeScreen} options={{tabBarLabelStyle: {color: "#fff"}}} />
        <Tab.Screen name={centersName} component={CentersScreen} options={{tabBarLabelStyle: {color: "#fff"}}} />
        <Tab.Screen name={chatName} component={ChatScreen} options={{tabBarLabelStyle: {color: "#fff"}}} />
        <Tab.Screen name={meditationName} component={MeditationScreen} options={{tabBarLabelStyle: {color: "#fff"}}} />
        <Tab.Screen name={meditationTipsName} component={MeditationTipsScreen} options={{tabBarLabelStyle: {color: "#fff"}}} />



      </Tab.Navigator>
  );
}

export default MainContainer;