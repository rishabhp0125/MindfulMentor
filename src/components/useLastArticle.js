import React, { createContext, useContext, useState } from 'react';

const LastArticleContext = createContext();

export const LastArticleProvider = ({ children }) => {
  const [lastArticle, setLastArticle] = useState(null);

  return (
    <LastArticleContext.Provider value={{ lastArticle, setLastArticle }}>
      {children}
    </LastArticleContext.Provider>
  );
};

export const useLastArticle = () => useContext(LastArticleContext);
