import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { useLastArticle, LastArticleProvider } from '../components/useLastArticle';

const MeditationTipsScreen = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const navigation = useNavigation();
  const { setLastArticle } = useLastArticle(); 
  
  useEffect(() => {
    fetchMentalHealthArticles();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  }, [searchQuery, articles]);

  const fetchMentalHealthArticles = async () => {
    try {
      const apiKey = 'INSERT API KEY';
      const apiUrl = `https://newsapi.org/v2/everything?q=mental%20health&apiKey=${apiKey}`;
      const response = await axios.get(apiUrl);
      if (response.data?.articles) {
        setArticles(response.data.articles);
        setFilteredArticles(response.data.articles);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const handleArticlePress = (articleUrl, articleTitle) => {
    navigation.navigate('Article', { url: articleUrl, title: articleTitle });
  };

  const handleSearch = () => {
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Mental Health Articles</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search articles..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {filteredArticles.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredArticles.map((article) => (
            article.urlToImage && article.title && article.author ? (
              <TouchableOpacity
                key={article.title}
                style={styles.articleContainer}
                onPress={() => handleArticlePress(article.url, article.title)}
              >
                <Image
                  style={styles.thumbnail}
                  source={{ uri: article.urlToImage }}
                />
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleAuthor}>By {article.author}</Text>
              </TouchableOpacity>
            ) : null
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noResultsText}>No results found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  titleText: {
    fontSize: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        marginTop: 50,
      },
      android: {
        marginTop: 30,
      },
    }),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    flex: 1,
    borderRadius: 20,
  },
  searchButton: {
    backgroundColor: '#f8dde2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginLeft: 5,
  },
  searchButtonText: {
    color: '#3e3739',
    fontWeight: 'bold',
  },
  articleContainer: {
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
    borderRadius: 10,
  },
  thumbnail: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 10,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  articleAuthor: {
    fontSize: 14,
    color: '#666',
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default MeditationTipsScreen;
