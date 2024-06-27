const BASE_URL = 'https://join-6878f-default-rtdb.europe-west1.firebasedatabase.app/'

async function createNewUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const acceptPrivacyPolicyCheckbox = document.getElementById('acceptPrivacyPolicyCheckbox');

    if (password !== confirmPassword) {
        document.getElementById('password').style.border = 'solid 2px rgb(252, 3, 3)';
        document.getElementById('confirm-password').style.border = 'solid 2px rgb(252, 3, 3)';
        return;
    } else {
        document.getElementById('password').style.border = '';
        document.getElementById('confirm-password').style.border = '';
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
    return responseToJSON = await response.json();
}