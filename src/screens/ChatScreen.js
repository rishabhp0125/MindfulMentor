import axios from 'axios';
import React, { useState, useRef } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';

const ChatScreen = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const apikey = 'INSERT API KEY';
  const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
  const scrollViewRef = useRef();

  const handleLogin = () => {
    if (username.trim() !== '') {
      setLoggedIn(true);
    }
  };

  const handleSend = async () => {
    if (inputMessage.trim() === '') return;
  
    setMessages([...messages, { type: 'user', text: inputMessage }]);
    setInputMessage('');
  
    const prompt = inputMessage;
    const response = await axios.post(apiUrl, {
      prompt: prompt,
      max_tokens: 1024,
      temperature: 0.1,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apikey}`,
      },
    });
  
    const text = response.data.choices[0].text;
    setMessages(prevMessages => [...prevMessages, { type: 'bot', text: text }]);
  };

  const sendMessage = () => {
    handleSend();
  };

  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })} 
          >
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>MindfulMate: {'\n\n'}Hello, my name is MindfulMate. I am here to listen and help you with your problems. What do you need help with?</Text>
          </View>  
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
              renderItem={({ item }) => (
                <View style={styles.messageContainer}>
                  <Text style={styles.messageText}>{`${item.type === 'user' ? 'You' : 'MindfulMate'}: ${item.text}`}</Text>
                </View>
              )}
            />
            </ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={inputMessage}
                onChangeText={setInputMessage}
                placeholder="Type your message here..."
              />
              <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddedf8',
    padding: 10,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameInput: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  loginButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f8dde2',
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    marginRight: 10,
    borderColor: '#3e3739',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#3e3739',
    borderRadius: 5,
  },
  sendButtonText: {

    color: '#fff',
    fontSize: 16,
  },
});

export default ChatScreen;
