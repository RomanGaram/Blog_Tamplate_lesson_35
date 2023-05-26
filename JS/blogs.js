// Функція для отримання та відображення списку постів
async function displayUserPosts() {
    function getId() {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('id');
        return userId;
    }

    const API_POSTS = 'https://gorest.co.in/public/v2/posts';

    async function getPosts(userId) {
        const response = await fetch(`${API_POSTS}?user_id=${userId}`);
        const posts = await response.json();
        if (posts.length === 0) {
            displayNoPostsMessage(); // Відображення повідомлення про відсутність постів
        } else {
            posts.forEach(postItem => {
                createPostElement(postItem);
            });
        }
    }

    function displayNoPostsMessage() {
        const messageWraper = document.createElement('div');
        messageWraper.classList.add('messageWraper');

        const rightSide = document.getElementById('right_side');
        const noPostsMessage = document.createElement('p');
        noPostsMessage.innerText = 'У даного користувача відсутні пости';
        noPostsMessage.style.cssText = "height: fit-content;font-size:55px;border:2px solid wheat;color:white;padding:15px;font-weight: bold; text-align:center;";
        rightSide.appendChild(noPostsMessage);

        const backButton = document.createElement('button');
        backButton.type = 'button';
        backButton.classList.add('backButton');
        backButton.innerText = 'Назад';
        backButton.onclick = function() {
        window.location.href = 'index.html';
        };
        messageWraper.appendChild(noPostsMessage);
        messageWraper.appendChild(backButton);
        rightSide.appendChild(messageWraper);
    }

    const userId = getId();
    await getPosts(userId);
}

// Функція для створення елемента поста
function createPostElement(postItem) {
    const rightSide = document.getElementById('right_side');
    const postLink = document.createElement('a');
    postLink.href = `post.html?id=${postItem.id}`; // Посилання на сторінку поста з використанням id поста

    const postElement = document.createElement('div');
    postElement.classList.add('post');

    const postTitle = document.createElement('h2');
    postTitle.innerText = postItem.title;

    const postDescription = document.createElement('p');
    postDescription.classList.add('truncated-text');
    postDescription.innerText = postItem.body;

    const cardImg = document.createElement('img');
    cardImg.classList.add('post_img');
    cardImg.src = './Styles/Images/BI.jpeg'; // В майбутньому можна замінити на картинку користувача через 'postItem.image_url'

    postLink.appendChild(postTitle);

    postElement.appendChild(cardImg);
    postElement.appendChild(postLink);
    postElement.appendChild(postDescription);

    rightSide.appendChild(postElement);
}

// Виклик функції для отримання та відображення списку постів
displayUserPosts();
