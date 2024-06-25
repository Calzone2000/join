const BASE_URL = 'https://join-6878f-default-rtdb.europe-west1.firebasedatabase.app/'

async function createNewUser() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const acceptPrivacyPolicyCheckbox = document.getElementById('acceptPrivacyPolicyCheckbox').checked;

    if (!name || !email) {
        alert("Please fill out all fields!")
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match!")
        return;
    }

    // if (!acceptPrivacyPolicyCheckbox) {
    //     alert("Please accept the Privacy Policy!")
    //     return;
    // }

        let data = {
            name: name,
            email: email,
            password: password
        };

        try {
            const response = await postNewUser("/user", data);
            alert('User created successfully!');
        } catch (error) {
            console.error("Error creating user:", error);
            alert('There was an error creating the user.');
        }
}

async function postNewUser(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: 'POST',
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return responseToJSON = await response.json();
}