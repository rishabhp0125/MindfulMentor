import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { AppRegistry } from 'react-native';
import { LastArticleProvider } from './src/components/useLastArticle';


AppRegistry.registerComponent('main', () => App);

const App = () => {
  return (
    <LastArticleProvider>
        <AppNavigator />
    </LastArticleProvider>
  );
};

export default App;