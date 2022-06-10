import React, { useState } from 'react'
import LoginForm from './LoginForm'
import Message from './Message'
import Spinner from './Spinner'
import ArticleForm from './ArticleForm'
import Articles from './Articles'
import * as goFetch from './fetch';
import './LoginApp.css';

export default function App() {  
  const [message, setMessage] = useState('')
  const [users, setUsers] = useState([])
  const [articles, setArticles] = useState([])
  const [spinnerOn, setSpinnerOn] = useState(false)
  const [currentArticleId, setCurrentArticleId] = useState()
  const [isAdmin, setIsAdmin] = useState(false);

  const token = localStorage.getItem('token');

  const logout = () => {
    if (token) { 
    localStorage.removeItem('token');
    setMessage('Goodbye!')
    }    
  }

  const login = ({ username, password }) => {    
    setMessage('');
    setSpinnerOn(true);
    goFetch.login({username, password})
    .then(response => {
      setMessage(response.message);
      setSpinnerOn(false);
    })
  }

  const getArticles = () => {
    setMessage('');
    setSpinnerOn(true);
    goFetch.getArticles(token)
    .then(response => {
      if (!response.message) {
      setArticles(response);
      setMessage('Have some articles!');
      } else if (response === 401) {
        setMessage("Resubmit for a token!");
      }
      setSpinnerOn(false);
    })
    .catch(err => console.error(err));    
  }

  const postArticle = article => {
    setSpinnerOn(true);
    goFetch.addArticle(token, article)
    .then(response => {
      setArticles([...articles, response]);
      setMessage("Article Added!");
      setSpinnerOn(false);
      setCurrentArticleId(null);
    })    
  }
  const updateArticle = ( article_id, article ) => {
    setSpinnerOn(true);
    goFetch.editArticle(token, article, article_id)
    .then(response => {
      setArticles([
        ...articles.filter(item => item.article_id !== article_id), response
      ]);
      setCurrentArticleId(null);
      setMessage("Article Updated!");
      setSpinnerOn(false);
    });
  }

  const deleteArticle = article_id => {
    setSpinnerOn(true);
    goFetch.deleteArticle(token, article_id)
    .then(() => {
      setArticles([
        ...articles.filter(item => item.article_id !== article_id)
      ]);
      setMessage("Article Deleted!");
      setSpinnerOn(false);
    });
  }

  return (    
    <React.StrictMode>
      <Spinner spinnerOn={spinnerOn} />
      <Message message={message}/>
      {localStorage.getItem('token') ? <button id="logout" onClick={logout}>Logout from app</button> : null }
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> 
        {localStorage.getItem('token') ? null : <LoginForm login={login}/>}
        {localStorage.getItem('token') ? 
        <>
        <ArticleForm 
        currentArticleId={currentArticleId}
        updateArticle={updateArticle}
        postArticle={postArticle}
        setCurrentArticleId={setCurrentArticleId}
        setMessage={setMessage}

        articles={articles}/>
        <Articles getArticles={getArticles} 
        articles={articles} 
        token={token}
        setCurrentArticleId={setCurrentArticleId}
        deleteArticle={deleteArticle}
        />
      </> : null}
      </div>
    </React.StrictMode>
  )
}