import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginPage = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      // Replace this with your authentication logic
      // For simplicity, let's assume the credentials are 'admin' and 'password'
      if (username === 'admin' && password === 'password') {
        try {
          // Store the user data in AsyncStorage for session management
          await AsyncStorage.setItem('isLoggedIn', 'true');
          navigation.navigate('Nav'); // Navigate to the home screen after successful login
        } catch (error) {
          console.log('Error storing data:', error);
        }
      } else {
        Alert.alert('Invalid credentials', 'Please try again.');
      }
    };
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  export default LoginPage;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    input: {
      width: '80%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    loginButton: {
      backgroundColor: 'blue',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    loginButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  