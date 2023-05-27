let titleElement;
let textElement;
let backButton;

function displayPost() {
    // HTML-розмітка для відображення посту
    const postWraper = document.getElementById('post_wraper');
    const postContainer = document.createElement('div');
    postContainer.classList.add('post_container');
    const leftPost = document.createElement('div');
    leftPost.classList.add('left_post');
    const rightPost = document.createElement('div');
    rightPost.classList.add('right_post');
    titleElement = document.createElement('h1');
    titleElement.classList.add('post_title');
    textElement = document.createElement('p');
    textElement.classList.add('post_body');
  
    // Додаємо пост до контейнера
    postContainer.appendChild(leftPost);
    postContainer.appendChild(rightPost);
    leftPost.appendChild(titleElement);
    leftPost.appendChild(textElement);

  
    // Додаємо контейнер з постом до DOM
    postWraper.appendChild(postContainer);
  }

function getIdFromUrl(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
    };

  const apiPostsUrl = 'https://gorest.co.in/public/v2/posts';

  // Виконуємо запит до API
async function getPost() {
    const postId = getIdFromUrl();
    const response = await fetch(`${apiPostsUrl}/${postId}`);
    const post = await response.json();

    // Встановлюємо заголовок і текст посту
    titleElement.textContent = post.title;
    textElement.textContent = post.body;
    userId = post.user_id;
}

getPost();
displayPost();
fetchComments();

// Функція для завантаження коментарів з API для конкретного посту
function fetchComments() {
    const forApiPostId = getIdFromUrl();
    const apiUrl = `https://gorest.co.in/public/v2/comments?post_id=${forApiPostId}`; // Замініть це на вашу URL-адресу API з правильним параметром post_id
  
    // Виконуємо запит до API за допомогою fetch або іншої бібліотеки
    fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Передаємо коментарі для відображення в функцію displayComments
        displayComments(data);
      })
      .catch(function(error) {
        console.log('Виникла помилка при завантаженні коментарів:', error);
      });
  }

// Функція для відображення коментарів
function displayComments(comments) {
    // HTML-розмітка для відображення коментарів
    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('all_comments_box');
    const commentsTitle = document.createElement('h2');

  // Встановлюємо заголовок "Коментарі"
  commentsTitle.textContent = 'Коментарі';

  // Додаємо заголовок до контейнера коментарів
  commentsContainer.appendChild(commentsTitle);

  // Перевіряємо, чи є коментарі
  if (comments.length > 0) {
    // Проходимося по всіх коментарях і створюємо HTML-елементи для відображення кожного коментаря
    comments.forEach(function(comment) {
      const commentElement = document.createElement('div');
      commentElement.classList.add('coment_container');
      const authorElement = document.createElement('h3');
      authorElement.classList.add('coment_title');
      const textElement = document.createElement('p');
      textElement.classList.add('coment_text');

      // Встановлюємо ім'я користувача та текст коментаря
      authorElement.textContent = comment.name;
      textElement.textContent = comment.body;

      // Додаємо ім'я користувача та текст коментаря до HTML-елемента коментаря
      commentElement.appendChild(authorElement);
      commentElement.appendChild(textElement);

      // Додаємо HTML-елемент коментаря до контейнера коментарів
      commentsContainer.appendChild(commentElement);
    });
  } else {
    // Якщо коментарі відсутні, відображаємо відповідне повідомлення
    const noCommentsElement = document.createElement('p');
    noCommentsElement.textContent = 'Коментарі відсутні';
    commentsContainer.appendChild(noCommentsElement);
  }
  function creaateButton() {
    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.classList.add('backButton');
    backButton.innerText = 'Назад';
    backButton.onclick = function() {
      window.location.href = `blogs.html?id=${userId}`;
    };
    const comentsWraper = document.getElementById('coments_wraper');
    comentsWraper.appendChild(backButton);
} 

  // Додаємо контейнер з коментарями до DOM
  const comentsWraper = document.getElementById('coments_wraper');
  comentsWraper.appendChild(commentsContainer);
  creaateButton();
}
