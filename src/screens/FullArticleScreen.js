import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLastArticle } from '../components/useLastArticle';

const FullArticleScreen = ({ route, navigation }) => {
  const { title, url, image, author } = route.params;
  const { setLastArticle } = useLastArticle();


  useEffect(() => {
    navigation.setOptions({
      title: title || 'Article',
    });

    setLastArticle({ title, url, image, author });
  }, [navigation, title, url, image, author, setLastArticle]);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: url }}
        mediaPlaybackRequiresUserAction={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default FullArticleScreen;
