function userInfo(params) {
    
}







function getUsers() {
    return fetch(API_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error('У даного користувача відсутні пости')
        }

        return response.json()
    })
    .then((data)  => {
        data.forEach((person) => {
            const card = createUserCard(person);
        });
    })
    .catch(error => {
        error.message = 'У даного користувача відсутні пости';
        const errorBox = noUsers(error.message)
        carusel.appendChild(errorBox);
    });
}


const API_URL = 'https://gorest.co.in/public/v2/posts';
getUsers();