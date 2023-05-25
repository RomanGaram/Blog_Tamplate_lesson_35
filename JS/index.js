function createUserCard(person) {
    const link = document.createElement('a');
    link.href = `blogs.html?id=${person.id}`;
    link.style.textDecoration = 'none';

    const carusel = document.getElementById('carusel');
    const card = document.createElement('div');
    card.classList.add('c_person_card');

    const imgWraper = document.createElement('div');
    imgWraper.classList.add('pc_card_img');

    const cardImg = document.createElement('img');
    cardImg.style.backgroundImage = "url('./Styles/Images/blog.jpg')";

    const nameTitle = document.createElement('h4');
    nameTitle.classList.add('pc_name');
    nameTitle.innerText = person.name;


    imgWraper.appendChild(cardImg);
    card.appendChild(imgWraper);
    card.appendChild(nameTitle);
    link.appendChild(card)
    carusel.appendChild(link);
}

function noUsers(message) {
    const errorBox = document.createElement('div');
    errorBox.style.cssText = "background-color:rgb(199, 147, 115);font-size:55px;border:2px solid wheat;color:white;padding:15px;font-weight: bold;";
    document.getElementById('wraper').style.background = 'none';
    errorBox.innerText = message;
    return errorBox;
}


function getUsers() {
    return fetch(API_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Користувачі незнайдені')
        }

        return response.json()
    })
    .then((data)  => {
        data.forEach((person) => {
            const card = createUserCard(person);
        });
    })
    .catch(error => {
        error.message = 'Користувачі незнайдені';
        const errorBox = noUsers(error.message)
        carusel.appendChild(errorBox);
    });
}

// function getBlogs() {
//         return fetch(API_URL)
//         .then(response => response.json())
//         .then((data)  => console.log(data));
// }

const API_URL = 'https://gorest.co.in/public/v2/users';
getUsers();

