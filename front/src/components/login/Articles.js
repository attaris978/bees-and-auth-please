import React, { useEffect } from 'react'

export default function Articles(props) {
  const {articles, getArticles, setCurrentArticleId, deleteArticle} = props;

  useEffect(() => {
    getArticles();
  }, [])

  return (
    <div className="articles">
      <h2>Articles</h2>
      {
        !articles.length
          ? 'No articles yet'
          : articles.map(art => {
            return (
              <div className="article" key={art.article_id}>
                <div>
                  <h3>{art.title}</h3>
                  <p>{art.text}</p>
                  <p>Topic: {art.topic}</p>
                </div>
                <div>
                  <button disabled={false} onClick={() => setCurrentArticleId(art.article_id)}>Edit</button>
                  <button disabled={false} onClick={() => deleteArticle(art.article_id)}>Delete</button>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}