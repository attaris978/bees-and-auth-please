import React, { useEffect, useState } from 'react'

const initialFormValues = { title: '', text: '', topic: 'React' }

export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues)
  const {articles, setCurrentArticleId, currentArticleId, updateArticle, postArticle, setMessage} = props;
  useEffect(() => {
    currentArticleId ? 
    setValues(articles.find(val => val.article_id === currentArticleId)) :
    setValues(initialFormValues);
  }, [currentArticleId])

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault();
    currentArticleId ? 
    updateArticle(currentArticleId, values) :
    postArticle(values);
    setValues(initialFormValues);
  }

  const isDisabled = () => {
    const {text, title, topic} = values;
    return !text || !title || !topic;
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create Article</h2>
      <input
        name="Article Title"
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder={currentArticleId ? "Enter title for edited article" : "Enter title for new article"}
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder={currentArticleId ? "Enter text for edited article" : "Enter text for new article"}
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select article topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Submit</button>
        <button type="button" onClick={() => {
          setCurrentArticleId(null);
          setMessage('Edit Canceled');
          setValues(initialFormValues)
        }}>Cancel edit</button>
      </div>
    </form>
  )
}