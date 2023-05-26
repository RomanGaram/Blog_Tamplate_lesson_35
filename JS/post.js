

// Функція для завантаження та відображення посту
function displayPost(post) {
  // HTML-розмітка для відображення посту
    const postContainer = document.createElement('div');
    const titleElement = document.createElement('h1');
    const textElement = document.createElement('p');
    const backButton = document.createElement('a');
  // Встановлюємо заголовок і текст посту
  titleElement.textContent = post.title;
  textElement.textContent = post.body;

  // Додаємо пост до контейнера
  postContainer.appendChild(titleElement);
  postContainer.appendChild(textElement);

  // Створюємо посилання "Назад" і встановлюємо йому відповідне посилання
  backButton.textContent = 'Назад';
  backButton.setAttribute('href', '/list-of-posts'); // Замініть '/list-of-posts' на посилання до списку всіх постів обраного користувача
  postContainer.appendChild(backButton);

  // Додаємо контейнер з постом до DOM
  document.body.appendChild(postContainer);
};




// Функція для завантаження коментарів з API для конкретного посту
function fetchComments(postId) {
    const apiUrl = 'https://gorest.co.in/public/v2/comments?post_id=' + postId; // Замініть це на вашу URL-адресу API з правильним параметром post_id
  
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
      const authorElement = document.createElement('h3');
      const textElement = document.createElement('p');

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

  // Додаємо контейнер з коментарями до DOM
  document.body.appendChild(commentsContainer);
}

// Функція для отримання посту з API за його ідентифікатором
function fetchPostById(post_Id) {
  const apiPostsUrl = 'https://gorest.co.in/public/v2/posts'; // Замініть це на вашу URL-адресу API

  // Виконуємо запит до API за допомогою fetch або іншої бібліотеки
  fetch(apiPostsUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Знаходимо пост з відповідним ідентифікатором
      const post = data.find(function(item) {
        return post_Id;
      });

      if (post) {
        // Передаємо отриманий пост для відображення в функцію displayPost
        displayPost(post_Id);

        // Викликаємо функцію fetchComments для отримання коментарів з API
        fetchComments(post_Id);
      } else {
        console.log('Пост з ідентифікатором ' + post_Id + ' не знайдено');
      }
    })
    .catch(function(error) {
      console.log('Виникла помилка при завантаженні посту:', error);
    });
}

// Отримуємо ідентифікатор посту з параметрів URL
const urlParams = new URLSearchParams(window.location.search);
const post_Id = urlParams.get('id');

// Виклик функції fetchPostById для отримання посту з API за його ідентифікатором
fetchPostById(post_Id);
