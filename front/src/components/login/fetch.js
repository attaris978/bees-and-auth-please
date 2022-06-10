const login = async (creds) => {
  const { username, password } = creds;
  const loginResponse = await fetch("http://localhost:9000/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())    
    .catch((err) => console.error(err));
  if (loginResponse.token) localStorage.setItem("token", loginResponse.token);
  return loginResponse;
};

const getArticles = async (token) => {
  const articles = await fetch("http://localhost:9000/api/articles", {
    method: "GET",
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {

        return response.ok ? response.json() : response.status
    } )
    .then((json) => json)
    .catch((err) => console.error(err));
  return articles;
};

const addArticle = async (token, article) => {
  const { title, text, topic } = article;
  const postRequest = await fetch("http://localhost:9000/api/articles", {    method: "POST",
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      text,
      topic,
    }),
  })
    .then((response) => response.json())
    .then((json) => json);
  return postRequest;
};

const editArticle = async (token, article, id) => {
  const { title, text, topic } = article;
  const putRequest = await fetch(`http://localhost:9000/api/articles/${id}`, {
    method: "PUT",
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      text,
      topic,
    }),
  })
    .then((response) => response.json())
    .then((json) => json);
  return putRequest;
};

const deleteArticle = async (token, id) => {
  const deleteRequest = await fetch(`http://localhost:9000/api/articles/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => json);
  return deleteRequest;
};

export { login, getArticles, addArticle, editArticle, deleteArticle };
