import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useLastArticle } from '../components/useLastArticle';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';

const LastArticleWidget = ({ navigation }) => {
  const { lastArticle } = useLastArticle();
  const [articleDetails, setArticleDetails] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);

  useEffect(() => {
    if (lastArticle) {
      fetchArticleDetails();
    }
  }, [lastArticle]);

  const fetchArticleDetails = async () => {
    try {
      const apiKey = '97d7c90fdae646f1a5409942c6df3dbf';
      const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        lastArticle.title
      )}&apiKey=${apiKey}`;
      const response = await axios.get(apiUrl);
      if (response.data?.articles) {
        const matchingArticle = response.data.articles.find(
          (article) => article.url === lastArticle.url
        );

        if (matchingArticle) {
          setArticleDetails(matchingArticle);
        }
      }
    } catch (error) {
      console.error('Error fetching article details:', error);
    }
  };

  if (!articleDetails) {
    return null;
  }

  const handleArticlePress = () => {
    navigation.navigate('Article', {
      url: articleDetails.url,
      title: articleDetails.title,
      urlToImage: articleDetails.urlToImage,
      author: articleDetails.author,
    });
  };

  const handleImageLoadError = () => {
    setLoadingImage(false);
  };

  return (
    <View>
      <Text style={styles.widgetText}>Continue Reading</Text>
      <TouchableOpacity style={styles.widgetContainer} onPress={handleArticlePress}>
        {loadingImage ? (
          <Image
            style={styles.thumbnail}
            source={{ uri: articleDetails.urlToImage }}
            onError={handleImageLoadError}
          />
        ) : (
          <Image
            style={styles.placeholderThumbnail}
            source={require('../../assets/fallback-img.jpg')}
          />
        )}
        <Text style={styles.widgetTitle}>{articleDetails.title}</Text>
        <Text style={styles.widgetAuthor}>By {articleDetails.author}</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const navigateToChat = () => {
    navigation.navigate('MainContainer', { screen: 'CHAT' })
  };

  const navigateToMeditation = () => {
    navigation.navigate('MainContainer', { screen: 'MEDITATION' })
  };

  const navigateToCenters = () => {
    navigation.navigate('MainContainer', { screen: 'CENTERS' })
  };

  const navigateToArticles = () => {
    navigation.navigate('MainContainer', { screen: 'ARTICLES' })
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Image source={require('../../assets/home.jpg')} style={styles.img}/>
        <Text style={styles.welcomeText}>Welcome to Mindful Mentor!</Text>
        <LastArticleWidget navigation={navigation} />
        <TouchableOpacity style={styles.button} onPress={navigateToArticles}>
          <Text style={styles.buttonText}>Mental Health Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToChat}>
          <Text style={styles.buttonText}>Need help?{'\n'}Chat with MindfulMate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToMeditation}>
          <Text style={styles.buttonText}>Guided Meditation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToCenters}>
          <Text style={styles.buttonText}>Find Centers Near You</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        paddingTop: 80,
      }
    }),
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: "PingFangSC-Semibold",
    color: '#3e3739'
  },
  button: {
    backgroundColor: '#f8dde2',
    padding: 16,
    borderRadius: 20,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 30,
    fontFamily: "PingFangSC-Semibold"
  },
  widgetContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20
  },
  thumbnail: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 20,
  },
  widgetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  widgetAuthor: {
    fontSize: 14,
    color: '#666',
  },
  widgetText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2b2d71',
    marginBottom: 18,
    fontFamily: 'PingFangSC-Semibold'
  },
  img: {
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

export default HomeScreen;
