//const BASE_URL = 'https://join-6878f-default-rtdb.europe-west1.firebasedatabase.app/'

let userIDs = [];
let userData = [];

async function logIn() {    
    const email = document.getElementById('logInEmail').value;
    const password = document.getElementById('logInPassword').value;      
    await loadDataFromFB();
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].email == email && userData[i].password == password) {
            localStorage.setItem('user', userIDs[i]);
            window.location.href = 'summary.html';
            break;
        }
    }
}

async function updateCurrentUser(newUser) {
    currentUserName = newUser;
}

async function createNewUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        document.getElementById('password').style.border = 'solid 2px rgb(252, 3, 3)';
        document.getElementById('confirm-password').style.border = 'solid 2px rgb(252, 3, 3)';
        document.getElementById('passwordsDontMatchNotification').style.display = 'block';
        return;
    } else {
        document.getElementById('password').style.border = '';
        document.getElementById('confirm-password').style.border = '';
        document.getElementById('passwordsDontMatchNotification').style.display = '';
    }

    await loadDataFromFB();

    if (userData.some(user => user.email === email)) {
        document.getElementById('emailAlreadyExistsNotification').style.display = 'block';
        document.getElementById('email').style.border = 'solid 2px rgb(252, 3, 3)';
        return;
    } else {
        document.getElementById('emailAlreadyExistsNotification').style.display = '';
        document.getElementById('email').style.border = '';
    }


    let data = {
        name: name,
        email: email,
        password: password
    };

    try {
        const response = await postNewUser("/user", data);
        confirmRegistration();
    } catch (error) {
        console.error("Error creating user:", error);
        alert('There was an error creating the user.');
    }
}

function confirmRegistration() {
    document.getElementById('logInBtns').innerHTML = '<button class="btn-dark btn confirm-registration" style="font-size: 21px;" disabled><p>You Signed Up successfully</p></button>';
}

async function postNewUser(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

async function loadDataFromFB() {
    let userResponse = await loadUserData('/user');

    if (userResponse) {
        let userKeysArray = Object.keys(userResponse);

        userKeysArray.forEach(key => {
            userIDs.push(key);
            userData.push({
                email: userResponse[key].email,
                password: userResponse[key].password,
                name: userResponse[key].name                
            });
        });
    } else {
        console.error('Keine Benutzerdaten gefunden');
    }
}

async function loadUserData(path = "") {
    let response = await fetch(BASE_URL + path + '.json');
    let responseToJSON = await response.json();
    return responseToJSON;
}
